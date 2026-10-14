# Security Policy

## Reporting a Vulnerability

This project does not currently publish a dedicated private security-reporting channel. If your JLScada distribution provides a private maintainer contact, use it to report suspected vulnerabilities. Do not publish exploit details in a public issue; if no private contact is available, share only a high-level description until a secure channel can be arranged.

## Scope

JLScada is an industrial SCADA/HMI application intended to run in trusted environments managed by system administrators.

Reports should focus on unintended access, privilege escalation, authentication bypass, or data exposure. Server-side scripting, automation logic, and device integrations are intentional capabilities when used as designed.

## Out of Scope

The following are insecure by design and are not vulnerabilities by themselves:

- Deployments with `secureEnabled=false`
- Deployments where authentication or authorization has been intentionally disabled
- Behavior that is exposed because an administrator explicitly disabled security controls

When `secureEnabled=false`, JLScada runs without the corresponding authentication or authorization checks and should only be used in a trusted environment.

## Supported Versions

The project will identify maintained versions and security fixes in its release notes. Do not assume that an older release is still supported.
