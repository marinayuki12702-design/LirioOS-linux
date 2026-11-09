// LirioOS - barra de tareas estilo Windows 10 (a todo lo ancho, iconos a la izquierda)
panels().forEach(function (p) { p.remove(); });

var panel = new Panel();
panel.location = "bottom";
panel.height = 40;
panel.floating = false;

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

panel.addWidget("org.kde.plasma.systemtray");
panel.addWidget("org.kde.plasma.digitalclock");
panel.addWidget("org.kde.plasma.showdesktop");
