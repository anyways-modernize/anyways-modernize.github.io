---
title: Did you know? - Restore Devices on Entra
tag: Entra
description: How to recover deleted devices in Microsoft Entra ID using the new soft-delete feature.
---

## Introduction 

Accidentally deleted a device in Microsoft Entra ID? Microsoft Entra ID now supports soft delete for devices. When a device is deleted, it moves to a soft-deleted state for up to 30 days, during which you can still recover it along with its BitLocker keys and LAPS passwords.

## Feature now in preview

::: note
Please note, as Microsoft states (https://learn.microsoft.com/en-us/entra/identity/devices/concept-soft-delete-devices) : "Device soft delete is currently in preview. Some features and behaviors might change before general availability." 
::: note

Device soft delete is currently in public preview. According to Microsoft's official documentation, there is no UI yet and management must be done via Microsoft Graph or PowerShell,but that's not entirely true. A deleted devices blade is already accessible in the Entra portal, and we'll show you how to get there.

## What Happens When a Device is Soft Deleted?

- It can no longer authenticate or access cloud resources
- It cannot be modified.
- Its DeviceID is reserved, no new device can register with the same ID
- It still counts toward directory object quotas
- Compliance properties are reset to false or null
- It is permanently after 30 days

## How to View Soft-Deleted Devices

While trying to get more information about the graph, I stumbled into Our Cloud Network's blog. Daniel mentions that the Entra portal already has a deleted devices blade, but it can only be accessed directly via this URL:
https://entra.microsoft.com/#view/Microsoft_AAD_Devices/DeletedDevices.reactview

<img width="1058" height="216" alt="image" src="https://github.com/user-attachments/assets/6241e9db-548c-47c6-9f77-d7b900f68bae" />

You can also graph for the same purpose:

```http
GET https://graph.microsoft.com/beta/directory/deletedItems/microsoft.graph.device
```

And via powershell

```powershell
Connect-MgGraph -Scopes "Directory.Read.All"

Invoke-MgGraphRequest `
    -Method GET `
    -Uri "https://graph.microsoft.com/beta/directory/deletedItems/microsoft.graph.device"
```

## How to restore

You can restore device from entra via https://entra.microsoft.com/#view/Microsoft_AAD_Devices/DeletedDevices.reactview

```http
POST https://graph.microsoft.com/beta/directory/deletedItems/{id}/restore
```

```powershell
Connect-MgGraph -Scopes "Directory.ReadWrite.All"
$id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
Invoke-MgGraphRequest `
    -Method POST `
    -Uri "https://graph.microsoft.com/beta/directory/deletedItems/$id/restore"
```

## How to perma delete

Again, you can restore the device from entra via https://entra.microsoft.com/#view/Microsoft_AAD_Devices/DeletedDevices.reactview

```http
DELETE https://graph.microsoft.com/beta/directory/deletedItems/{id}
```

```powershell
Connect-MgGraph -Scopes "Directory.ReadWrite.All"
$id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
Invoke-MgGraphRequest `
    -Method POST `
    -Uri "https://graph.microsoft.com/beta/directory/deletedItems/$id/"
```

## Final Thoughts
Finally, something I've been really waiting for, restoring deleted devices. Having BitLocker keys and LAPS passwords preserved during a soft delete can be a real lifesaver in accidental deletion scenarios. Having worked in a large enterprise, I've seen Level 2 support accidentally delete devices with no way to recover them. This feature changes that.
