# Installing and Running JLScada

## Windows Portable Build

The project currently provides a Windows x64 portable desktop build:

`app/electron/dist/JLScada-portable.exe`

Place the executable in a writable folder and run it. JLScada starts its local web service on port `1881` and opens the desktop interface.

The first run creates a `JLScada-data` folder beside the executable. If a legacy `FUXA-data` folder is present there, JLScada copies its contents into `JLScada-data` and leaves the original folder in place.

## Access from Another Device

On the host computer, open:

`http://localhost:1881`

To connect from a phone or another computer on the same LAN, use the host computer's LAN address, for example:

`http://192.168.1.20:1881`

`0.0.0.0` is the server bind address, not a browser address. Allow port `1881` through the host firewall only on networks where access is intended.

## Security

Use JLScada only on trusted networks unless authentication and authorization are configured. Do not expose port `1881` directly to the public internet.

## Building from Source

See the [repository README](../README.md) for the current source-build steps and prerequisites.
