// LirioOS - barra de tareas estilo Windows 11 (flotante, iconos centrados)
panels().forEach(function (p) { p.remove(); });

var panel = new Panel();
panel.location = "bottom";
panel.height = 48;
panel.floating = true;

function separador() {
    var s = panel.addWidget("org.kde.plasma.panelspacer");
    s.currentConfigGroup = ["General"];
    s.writeConfig("expanding", true);
    return s;
}

separador();

var inicio = panel.addWidget("org.kde.plasma.kickoff");
inicio.currentConfigGroup = ["General"];
inicio.writeConfig("icon", "lirioos-logo");

var tareas = panel.addWidget("org.kde.plasma.icontasks");
tareas.currentConfigGroup = ["General"];
tareas.writeConfig("launchers",
    "applications:org.kde.dolphin.desktop," +
    "preferred://browser," +
    "applications:com.usebottles.bottles.desktop," +
    "applications:steam.desktop");

separador();

panel.addWidget("org.kde.plasma.systemtray");
panel.addWidget("org.kde.plasma.digitalclock");
panel.addWidget("org.kde.plasma.showdesktop");
