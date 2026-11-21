---
title: How to set up Windows Autopatch
tag: INTUNE
description: What you need and how to set up Windows Autopatch, quickly and simply
---

## How to Set Up Windows Autopatch

Windows Autopatch keeps Windows, Microsoft 365 Apps, Edge and drivers up to date for you. It rolls out updates in rings.

## Requirements
- **License:** Microsoft 365 Business Premium, E3/E5, F3 or A3/A5
- **Devices:** Windows 10/11 Pro or higher, Entra joined or hybrid joined, managed in Intune
- **Roles:** At minimum, you need the **Windows Autopatch Administrator** and **Policy and Profile Manager** roles, plus Entra rights to create groups. The **Intune Administrator** role covers all three.

## Step 1: Remove old update policies
Remove any policies that could affect Windows Update: GPOs, SCCM, third-party tools, etc.

You can also use the [IgnoreWindowsUpdateGroupPolicies](https://learn.microsoft.com/windows/client-management/mdm/policy-csp-update#ignorewindowsupdategrouppolicies) policy. It makes devices ignore Windows Update settings from Group Policy and only apply the ones from Intune.
::: note Only works on Windows 11 24H2 and later with KB5101684 installed :::

## Step 2: Create your device groups
I usually recommend using the built-in **All devices** group, but you can't use it with Autopatch. To patch all devices, create a dynamic group that targets them:

```
(device.deviceOSType -eq "Windows")
```
Or, for a cleaner group with only company-owned, Intune-managed devices:

```
(device.deviceOSType -eq "Windows") and (device.managementType -eq "MDM") and (device.deviceOwnership -eq "Company")
```

For testing, use a static group with a few devices.

## Step 3: Create an Autopatch group

- Open **Intune**
- Go to **Tenant administration → Windows Autopatch** and confirm that you have the right license.
- Go to **Tenant administration → Windows Autopatch → Autopatch groups → Create**
- Give it a name that follows your company's naming convention.
- Assign your rings. **Test** is for your test devices. **Test** and **Last** only accept assigned groups. You can add more rings in between and split devices across them dynamically by percentage.
- Choose your **Update types** based on your company's needs: Quality, Feature, Drivers, M365 Apps and Edge.
- In **Schedule**, you can start from a preset like *Information worker* for normal laptops or *Reboot-sensitive devices*, or set it up yourself. Avoid scheduling updates for the weekend: devices are usually off, so users end up with installs and restarts on Monday morning.
- Click **Review + create**

Autopatch builds the update policies for you. You'll find them under **Devices → Windows Update** and **Devices → Configuration**, with the prefix **Windows Autopatch Update Policy**.

## Step 4: Check your devices

Go to **Devices → Windows Update → Monitor → Autopatch Devices**. You'll see which ring each device is in and its update status. You can troubleshoot and fix related issues from there.
::: note For new tenants, it can take up to 48 hours for devices to show as Registered. After that, reports refresh about every 4 hours. :::

## Step 5: Optional - Install the Autopatch Client Broker
The Client Broker runs readiness checks on devices and collects logs automatically when you open a support request.

- Open **Intune**
- Go to **Tenant administration → Windows Autopatch → Tenant management → Manage client broker**
- Click **Add groups** and it will target all your autopilot devices. It's installed as a Win32 app.

## Tips and Recommendations

- Turn on diagnostic data (at least **Required**), otherwise Autopatch reports will be missing data. Here's an example from the [Open Intune Baseline](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/SETTINGSOUTPUT.md#win---oib---sc---windows-update-for-business---d---reports-and-telemetry---v30).
- Hotpatch is turned on by default. Be aware that it has had recurring issues. Rudy explains them in his blog: [https://call4cloud.nl/hotpatch-msi-msiexec-issues/](https://call4cloud.nl/hotpatch-msi-msiexec-issues/). You can turn it off under **Tenant administration → Windows Autopatch → Tenant management → Tenant settings**.
- Check the reports regularly for update status.
