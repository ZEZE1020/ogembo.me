---
title: "Workshop — Building Secure Dev Environments with Ubuntu on WSL for Cloud, Containers, and DevSecOps"
date: 2026-03-27
event: "Ubucon Kenya 2026"
slidesUrl: "https://docs.google.com/presentation/d/1H-Dzw0uGOrTExPbPBO0IDSLjY44N3rTe1rx7e9Er2hY/edit?usp=sharing"
---

An intermediate, hands-on workshop for developers who use Windows hardware but build and deploy software on Linux servers.

Many aspiring developers in Kenya learn on shared, second-hand, or administratively restricted computers where dual-booting Linux is difficult or impossible. Drawing from my own experience with a BIOS-locked ASUS laptop and community mentorship at [KidsCodelab](http://kidscodelab.com/), this workshop presents Ubuntu on WSL as a practical way to remove that barrier.

## What we build

We move beyond `wsl --install` and turn a Windows machine into a secure Linux engineering workstation that closely mirrors a production cloud environment.

- Enable `systemd` and Ubuntu Pro's personal tier for Expanded Security Maintenance.
- Run local Kubernetes clusters with Kind.
- Introduce Cilium and eBPF for modern container networking and security.
- Use Hubble to observe network traffic.
- Apply network policies that block unauthorized pod communication at the kernel level.

**Duration:** 1 hour 45 minutes  
**Technical level:** Intermediate  
**Workshop repository:** [ZEZE1020/ubucon-workshop](https://github.com/ZEZE1020/ubucon-workshop)
