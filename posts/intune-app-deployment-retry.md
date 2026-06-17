---
title: Why your intune app deployement won't retry quickly?
tag: INTUNE
description: Testing an app deployment and it won't retry? Here's why and how to force it.
publishDate: 2026-06-15
---

## Quick Answer? Retry Time! 

Did you know your app only tries to reinstall 3 times, 5 minutes apart, then waits 24 hours after that?

## How do you make your App testing efficient?

Usually, you can add your computer/user to the "available" assignment for an app in Intune. This makes it easier to install and uninstall via the Company Portal whenever you want. But it doesn't always work, especially when the app gets stuck "Installing."

When that happens, there's a more direct (if less polished) option.

## What else can you do? Play with the registry.

Let's get into a little niche detail about app deployment. As mentioned, apps will only retry 3 times before failing, with 5 minutes between each attempt, then wait 24 hours before trying again. [Source: Microsoft](https://learn.microsoft.com/en-us/intune/app-management/deployment/add-win32#dependency-failures)

::: note 
Each dependency will adhere to Intune Win32 app retry logic (try to install three times after waiting for five minutes) and the global reevaluation schedule, which follows a 24-hour cadence.
:::

So how can you force a retry? By targeting the GRS key specifically in the registry. It can help, but don't rely on it constantly.

## GRS Key? What is it?

The Global Re-evaluation Schedule (GRS) is found under: `HKLM:\SOFTWARE\Microsoft\IntuneManagementExtension\Win32Apps\{SID}\GRS\`. 

Microsoft doesn't fully document what happens under the hood, but based on official docs and community testing, it's essentially the 24-hour cycle that controls when Intune will look at a failed app again.
Rudy Ooms explains it nicely too: [ "The Global Re-evaluation Schedule (GRS) in Intune is a mechanism that determines when a failed Win32 app installation should be retried."](https://call4cloud.nl/retry-failed-win32app-installation/) .

## Now, how do you force it?

Based on my personal experience: I grab the App ID of the app I'm testing, go to `HKLM:\SOFTWARE\Microsoft\IntuneManagementExtension\Win32Apps\{SID}\GRS\`, go through every `{HashKey}` under that registry path, try to spot the one that contains my App ID, and delete the whole hash key. (Yeah, that's a mouthful, let's script it.)

```powershell

$AppId = "Your-App-ID"

$win32AppsPath = "HKLM:\SOFTWARE\Microsoft\IntuneManagementExtension\Win32Apps"

if (-not (Test-Path $win32AppsPath)) {
    Write-Warning "Path not found: $win32AppsPath"
    return
}

foreach ($sidKey in (Get-ChildItem -Path $win32AppsPath)) {

    $grsPath = Join-Path $sidKey.PSPath "GRS"

    if (-not (Test-Path $grsPath)) { continue }

    foreach ($hashKey in (Get-ChildItem -Path $grsPath)) {

        $regKey = Get-Item -Path $hashKey.PSPath

        $match = $regKey.GetValueNames() | Where-Object { $_ -like "*$AppId*" }

        if ($match) {
            Remove-Item -Path $hashKey.PSPath -Recurse -Force
            Write-Host "Deleted: $($hashKey.PSPath)" -ForegroundColor Green
        }
    }
}
```
::: note 
To find your App ID, navigate to your app page in Intune, you'll find it in the URL after **/appId/**:
https<span></span>://intune<span></span>.microsoft<span></span>.com/#view/Microsoft_Intune_Apps/SettingsMenu/~/2/appId/<ins>123456a7-8912-3b45-c678-912d3e4fg4h5</ins>

In this example, <ins>123456a7-8912-3b45-c678-912d3e4fg4h5</ins> is your App ID.
:::


Then restart the Intune Management Extension service:

```powershell
Stop-Service -Name "IntuneManagementExtension" -Force
Start-Service -Name "IntuneManagementExtension"
```

I'll be honest, on rare occasions it doesn't work, and I'm not always sure why. When that happens, I'd suggest following the more in-depth scripts of [Rudy](https://call4cloud.nl/retry-failed-win32app-installation/) or [Johan Arwidmark](https://www.deploymentresearch.com/force-application-reinstall-in-microsoft-intune-win32-apps/).

Their scripts are available on their blogs, full credit to them.

## Final Thoughts

Try this to save time while troubleshooting your app deployment. I'd recommend **not** using it at scale or in production. This is a testing/troubleshooting tool, not a fix for a broken deployment pipeline. The end goal of Intune is to let things flow naturally; don't force a change in the process unless you're actively in a test cycle. The end goal of Intune is to let things flow naturally, don't force a change in the process unless you're actively testing.
