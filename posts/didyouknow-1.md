---
title: Did You Know? - Proactive Remediations
tag: INTUNE
description: Did You Know? A series highlighting features that most admins overlook or aren't aware of in their tenant.
---

## Introduction
*Did You Know?* is a series where I highlight features that many admins overlook or simply aren't aware of in their tenant. A lot of articles will focus on Intune, but who knows, we might also cover Entra, Windows 365, Defender, and more.

## Did You Know?

Did you know you can capture text/log output from Proactive Remediations? 

Indeed! Many of us as admins don't spend enough time exploring every option available across Microsoft tenant features.

I was reading one of the blog posts by Mr. T-Bone['s blog post](https://www.tbone.se/2026/01/09/update-secure-boot-certificate-by-using-intune-remediation/) and noticed he had enabled the **Pre-remediation Detection Output** column. I gave it a try and really liked it. You can review results as they start to populate, and export the data as a CSV, or even push it to Power Automate.

<img alt="image" src="https://github.com/user-attachments/assets/9d63745e-a420-4544-8ea5-45ba6758f3b7" />
<img alt="image" src="https://github.com/user-attachments/assets/1e5e1fd2-59fe-4230-9f32-6babed1bc612" />

There is a limit on the output. Apparently, it's capped at **2,048 characters**. [Learn Microsoft](https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations)

## Did You Know? — Bonus!

Did you know you can run a Proactive Remediation with only a detection script? 

This is perfect for getting a quick overview of a specific situation. For example, you can find out how many devices have a folder on C:\ named **"Johannes likes eatingg horse steak"**.

<img alt="image" src="https://github.com/user-attachments/assets/06f76d2d-f95f-43a6-8fe1-c83f35102ab8" />

Notice how **Detection script = Yes** and **Remediation script = No**. When you open the script to inspect it, Microsoft even includes a note:

<img alt="image" src="https://github.com/user-attachments/assets/6de80e05-8eea-49a6-8764-8245edf62747" />

## Final Thoughts
I hope you enjoyed this short article and hopefully this becomes a recurring series!
