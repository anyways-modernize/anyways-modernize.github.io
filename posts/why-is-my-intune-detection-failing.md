---
title: App detection failing? Proactive remediations failing?
tag: INTUNE
description: Wondering why your detection is failing? It may be easier than you think!
---

## Introduction 

Creating your first app or first Proactive remediation, it's failing and you wonder why? The reason could be simpler than you think!

## STDOUT

What is STDOUT? 
Standard Output is the script way of "speaking out loud". In PowerShell, `Write-Output` or `Write-Host` are used to send text to the default stream STDOUT.
However, not all output is equal. PowerShell organizes output into separate streams, think of them as different channels your script can talk through. `Write-Output` sends data through Stream 1, the Success Stream, which is the only channel Intune listens to. `Write-Host` bypasses this stream by speaking directly to the screen instead, meaning Intune may never hear it.
Intune detection scripts rely on a combination of exit code and STDOUT content to determine detection state.

This is how your detection scripts in Apps and Proactive Remediation behaves:

References from: [Peter Van der Woude - https://petervanderwoude.nl/post/working-with-custom-detection-rules-for-win32-apps/](https://petervanderwoude.nl/post/working-with-custom-detection-rules-for-win32-apps/) and [Rudy Ooms - https://call4cloud.nl/win32app-exit-code-detection-rules/](https://call4cloud.nl/win32app-exit-code-detection-rules/)

| Exit code | STDOUT | Detection State Result |
| --- | --- | --- |
| 0 | Empty | Not detected |
| 0 | Not Empty (`Write-Output "Martin.exe has been detected"` ) | Detected |
| Not 0 | Empty | Not detected |
| Not 0 | Not Empty (`Write-Output "Martin.exe is not installed"`) | Not detected |

Not understanding the table? Here is what each row means:

If your scripts exit with the code 0 and it does NOT have any data in STDOUT, the app is not detected.
If your scripts exit with the code 0 and it does have data in STDOUT, example `Write-Output "Martin.exe has been detected"`, the app is detected.  
If your scripts exit with the code other than 0 and it does NOT have any data in STDOUT, the app is not detected.
If your scripts exit with the code other than 0 and it does have data in STDOUT, example `Write-Output "Martin.exe is not installed""`, the app is not detected.

::: note
The content of STDOUT doesn't matter. Intune only checks whether it is empty or not.
::: note

To troubleshoot detection, check the Intune logs. You can find them at `C:\Programdata\Microsoft\IntuneManagementExtension\Logs` in a file called `IntuneManagementExtension.log`
More details on [techuisitive - https://techuisitive.com/intune-understanding-win32-app-detection-rules/](https://techuisitive.com/intune-understanding-win32-app-detection-rules/) and [Rudy Ooms - https://call4cloud.nl/win32app-exit-code-detection-rules/](https://call4cloud.nl/win32app-exit-code-detection-rules/)

## Best Practices

- Always use `Write-Output` over `Write-Host` for your detection output. As mentioned above, `Write-Host` speaks directly to the screen and is not guaranteed to reach STDOUT, meaning Intune may never detect your app.
- Make sure your script is saved with UTF-8 BOM encoding to avoid unexpected behavior.

## Final thoughts

I wrote this because I was in this exact position few years ago, and I still see people struggling with detection issues today. Hopefully this saves you some time and frustration!
