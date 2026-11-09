# LirioOS

Escritorio con aspecto de Windows moderno sobre Linux, que ejecuta programas `.exe` mediante Proton, Wine y Bottles. Se construye como imagen de [Bazzite](https://bazzite.gg) (KDE Plasma) con [BlueBuild](https://blue-build.org) y se actualiza sola.

## Qué es y qué no es

- **Es** una distribución basada en Bazzite/Fedora Atomic: kernel de Linux, drivers, Steam, Proton y Bottles ya integrados, con tema, barra de tareas, atajos y logo propios.
- **No es** un kernel nuevo ni compatible con NT. Los `.exe` y `.dll` funcionan a través de la capa de compatibilidad Wine/Proton (muy buena para juegos y bastantes programas; con límites en antitrampas agresivos y software como Adobe u Office).

## Qué incluye

| Parte | Dónde |
|---|---|
| Receta de la imagen | `recipes/recipe.yml` |
| Compilación automática en GitHub | `.github/workflows/build.yml` |
| Nombre LirioOS en el sistema | `files/scripts/00-marca.sh` |
| Logo de lirio y fondo de pantalla (diseño propio) | `files/system/usr/share/icons/...`, `.../wallpapers/LirioOS` |
| Comando para cambiar estilo (`win11` / `win10`, claro / oscuro) | `files/system/usr/bin/lirio-estilo` |
| Barra de tareas estilo Windows 11 y 10 | `files/system/usr/share/lirioos/layouts/*.js` |
| Aplicación automática en el primer inicio de sesión | `files/system/etc/xdg/autostart/` + `primer-inicio.sh` |

Apps preinstaladas (Flatpak): Bottles, Heroic, ProtonUp-Qt, Flatseal, LibreOffice y VLC. Steam y las herramientas de juego vienen de Bazzite.

## Publicarlo (una sola vez)

1. Crea un repositorio vacío en GitHub llamado `lirioos` y sube el contenido de esta carpeta.
2. Genera las claves de firma en tu ordenador: `cosign generate-key-pair`.
   - Guarda `cosign.pub` en la raíz del repo.
   - En GitHub, *Settings → Secrets and variables → Actions*, crea el secreto `SIGNING_SECRET` con el contenido de `cosign.key`.
   - No subas `cosign.key` nunca.
3. En la pestaña *Actions* se construirá la imagen (la primera vez tarda). Cuando termine, ve a *Packages*, abre `lirioos` y ponlo como **público**.
4. Si tu GPU no es NVIDIA, cambia `base-image` en `recipes/recipe.yml` a `ghcr.io/ublue-os/bazzite`.

## Instalarlo

**Desde un Bazzite que ya tengas:**

```bash
rpm-ostree rebase ostree-unverified-registry:ghcr.io/TU_USUARIO/lirioos:latest
systemctl reboot
# tras reiniciar, pasa a la versión firmada:
rpm-ostree rebase ostree-image-signed:docker://ghcr.io/TU_USUARIO/lirioos:latest
systemctl reboot
```

**Desde cero (ISO):** con [BlueBuild CLI](https://blue-build.org/how-to/setup/) y podman instalados:

```bash
bluebuild generate-iso --iso-name lirioos.iso image ghcr.io/TU_USUARIO/lirioos
```

## Cambiar el aspecto

```bash
lirio-estilo win11 claro      # barra flotante centrada (por defecto)
lirio-estilo win10 oscuro     # barra clásica a la izquierda, tema oscuro
```

Para usar un tema de terceros estilo Windows (por ejemplo uno de KDE Store), copia sus carpetas dentro de `files/system/usr/share/` (`plasma/look-and-feel`, `aurorae/themes`, `Kvantum`, `icons`) y ajusta `lirio-estilo` para activarlo. Revisa la licencia de cada tema antes de redistribuirlo.

## Notas importantes

- **Sin probar:** esta estructura sigue el formato de BlueBuild, pero no se ha podido compilar ni arrancar desde donde se generó. Es normal que la primera ejecución en GitHub pida algún ajuste (nombre de paquete, versión de la base). Los errores aparecen en la pestaña *Actions*.
- **Marca:** el logo, el fondo y el nombre son originales. No añadas logos, iconos ni nombres de Microsoft si vas a distribuir el sistema.
- **Reemplaza** `TU_USUARIO` por tu usuario de GitHub en los comandos de arriba.
