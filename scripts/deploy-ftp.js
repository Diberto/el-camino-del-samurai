import * as ftp from "basic-ftp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: "ftp.larutadelsamurai.com",
            user: "samurai@larutadelsamurai.com",
            password: "samurai2026",
            secure: false
        });

        console.log("Connected successfully to FTP!");
        const list = await client.list();
        console.log("Remote directory listing:", list.map(i => `${i.name} (${i.isDirectory ? "DIR" : "FILE"})`));

        const rootDir = path.resolve(__dirname, "..");
        
        console.log("Subiendo index.php...");
        await client.uploadFrom(path.join(rootDir, "index.php"), "index.php");

        console.log("Subiendo blog.php...");
        await client.uploadFrom(path.join(rootDir, "blog.php"), "blog.php");

        console.log("Subiendo .htaccess...");
        await client.uploadFrom(path.join(rootDir, ".htaccess"), ".htaccess");

        console.log("Sincronizando carpeta config/...");
        await client.uploadFromDir(path.join(rootDir, "config"), "config");

        console.log("Sincronizando carpeta includes/...");
        await client.uploadFromDir(path.join(rootDir, "includes"), "includes");

        console.log("Sincronizando carpeta sections/...");
        await client.uploadFromDir(path.join(rootDir, "sections"), "sections");

        console.log("Sincronizando carpeta admin/...");
        await client.uploadFromDir(path.join(rootDir, "admin"), "admin");

        console.log("Sincronizando carpeta data/...");
        await client.uploadFromDir(path.join(rootDir, "data"), "data");

        console.log("Sincronizando carpeta css/...");
        await client.uploadFromDir(path.join(rootDir, "css"), "css");

        console.log("Sincronizando carpeta js/...");
        await client.uploadFromDir(path.join(rootDir, "js"), "js");

        console.log("Sincronizando carpeta photos/...");
        await client.uploadFromDir(path.join(rootDir, "photos"), "photos");

        console.log("Sincronizando carpeta assets/...");
        await client.uploadFromDir(path.join(rootDir, "assets"), "assets");

        console.log("🎉 ¡Despliegue FTP completado con éxito!");
    } catch (err) {
        console.error("Error en despliegue FTP:", err);
    } finally {
        client.close();
    }
}

deploy();
