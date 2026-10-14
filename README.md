# JLScada

JLScada is a SCADA/HMI application for industrial monitoring, visualization, and control. It combines an Angular web interface with a Node.js server and supports common industrial protocols including Modbus, OPC UA, MQTT, and Siemens S7.

## Windows Portable Build

The Windows x64 portable build is produced at:

```text
app/electron/dist/JLScada-portable.exe
```

Run the executable directly; no installer is required. The application stores its settings and projects in a `JLScada-data` folder beside the executable. The web interface uses port `1881`; devices on the same LAN can open `http://<computer-ip>:1881`.

## Build From Source

Node.js 18 LTS is recommended. Install dependencies and build the web client:

```powershell
cd server
npm ci
cd ..
cd client
npm ci
npm run build -- --configuration=production
```

Prepare the Electron package contents and build the portable executable:

```powershell
New-Item -ItemType Directory -Force app/electron/server, app/electron/client/dist
Copy-Item server/* app/electron/server -Recurse -Force
Copy-Item client/dist/* app/electron/client/dist -Recurse -Force
cd app/electron
npm ci
npm run dist
```

The build output is written to `app/electron/dist`.

## License

This project is distributed under the MIT License. Preserve the copyright and license notices in [LICENSE](LICENSE) when redistributing it.
