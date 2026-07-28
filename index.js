const HaxballJS = require('haxball.js').default;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

HaxballJS().then((HBInit) => {
    // =====================================
    // ESP League BR | Headless + Firebase Realtime Database
    // =====================================

    var room = HBInit({
        roomName: "🏟️ ESP League BR | Dinâmico",
        maxPlayers: 12,
        noPlayer: true,
        public: true,
        token: process.env.token
    });

    // =====================================
    // ESTÁDIO PERSONALIZADO - FUTSAL
    // =====================================
    var admins = ["Doggao", "~ 𝓚𝓪𝓱"];
        var mapa = {"name":"Futsal x3  by Bazinga from HaxMaps","width":620,"height":270,"spawnDistance":350,"bg":{"type":"hockey","width":550,"height":240,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":550,"y":240,"trait":"ballArea"},{"x":550,"y":-240,"trait":"ballArea"},{"x":0,"y":270,"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-270,"trait":"kickOffBarrier"},{"x":-550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":-550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,-80]},{"x":-550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","pos":[700,80]},{"x":550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[700,-80]},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":-550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":0,"y":-240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":-557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[-700,80]},{"x":-557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":-557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":-557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[-700,-80]},{"x":557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[700,-80]},{"x":557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[700,80]},{"x":557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":0,"y":-80,"bCoef":0.1,"trait":"line"},{"x":0,"y":80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":80,"bCoef":0.1,"trait":"line"},{"x":550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":550,"y":80,"bCoef":0.1,"trait":"line"},{"x":-240,"y":256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":256,"bCoef":0.1,"trait":"line"},{"x":-240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":240,"y":256,"bCoef":0.1,"trait":"line"},{"x":120,"y":224,"bCoef":0.1,"trait":"line"},{"x":120,"y":256,"bCoef":0.1,"trait":"line"},{"x":240,"y":-224,"bCoef":0.1,"trait":"line"},{"x":240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-381,"y":240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":256,"bCoef":0.1,"trait":"line"},{"x":-550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":-390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":226,"bCoef":0.1,"trait":"line","curve":-90},{"x":-536,"y":240,"bCoef":0.1,"trait":"line","curve":-90},{"x":-550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":-390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":-226,"bCoef":0.1,"trait":"line","curve":90},{"x":-536,"y":-240,"bCoef":0.1,"trait":"line","curve":90},{"x":-556,"y":123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":123,"bCoef":0.1,"trait":"line"},{"x":556,"y":123,"bCoef":0.1,"trait":"line"},{"x":575,"y":123,"bCoef":0.1,"trait":"line"},{"x":-556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":381,"y":240,"bCoef":0.1,"trait":"line"},{"x":381,"y":256,"bCoef":0.1,"trait":"line"},{"x":381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":550,"y":-226,"bCoef":0.1,"trait":"line","curve":-90},{"x":536,"y":-240,"bCoef":0.1,"trait":"line","curve":-90},{"x":550,"y":226,"bCoef":0.1,"trait":"line","curve":90},{"x":536,"y":240,"bCoef":0.1,"trait":"line","curve":90},{"x":550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","curve":0},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","curve":0},{"x":-375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180}],"segments":[{"v0":6,"v1":7,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":7,"v1":8,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":8,"v1":9,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":10,"v1":11,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,-80],"y":-80},{"v0":11,"v1":12,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":590},{"v0":12,"v1":13,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,80],"y":80},{"v0":2,"v1":3,"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":-180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":4,"v1":5,"trait":"kickOffBarrier"},{"v0":14,"v1":15,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":16,"v1":17,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":18,"v1":19,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":240},{"v0":20,"v1":21,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":22,"v1":23,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":24,"v1":25,"vis":true,"color":"F8F8F8","bCoef":0,"cMask":["ball"],"trait":"ballArea","x":550,"y":-240},{"v0":26,"v1":27,"curve":0,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":-240},{"v0":28,"v1":29,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":30,"v1":31,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":38,"v1":39,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":40,"v1":41,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":42,"v1":43,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":44,"v1":45,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":46,"v1":47,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":0},{"v0":48,"v1":49,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-550},{"v0":50,"v1":51,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":550},{"v0":64,"v1":65,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":66,"v1":67,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":69,"v1":68,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":70,"v1":71,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":67,"v1":71,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":73,"v1":72,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":76,"v1":77,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":78,"v1":79,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":84,"v1":85,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":86,"v1":87,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":89,"v1":88,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":91,"v1":90,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":92,"v1":93,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":94,"v1":95,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":96,"v1":97,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":390},{"v0":99,"v1":98,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":98,"v1":99,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":101,"v1":100,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":100,"v1":101,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":103,"v1":102,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":102,"v1":103,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":105,"v1":104,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":104,"v1":105,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":107,"v1":106,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":106,"v1":107,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":109,"v1":108,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":108,"v1":109,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":111,"v1":110,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":110,"v1":111,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":113,"v1":112,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":112,"v1":113,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":115,"v1":114,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":114,"v1":115,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":117,"v1":116,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":116,"v1":117,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":119,"v1":118,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":118,"v1":119,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":121,"v1":120,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":120,"v1":121,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":123,"v1":122,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":122,"v1":123,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":125,"v1":124,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":124,"v1":125,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":127,"v1":126,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":126,"v1":127,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":129,"v1":128,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":128,"v1":129,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5}],"goals":[{"p0":[-557.5,-80],"p1":[-557.5,80],"team":"red"},{"p0":[557.5,80],"p1":[557.5,-80],"team":"blue"}],"discs":[{"radius":5,"pos":[-550,80],"color":"FF6666","trait":"goalPost","y":80},{"radius":5,"pos":[-550,-80],"color":"FF6666","trait":"goalPost","y":-80,"x":-560},{"radius":5,"pos":[550,80],"color":"6666FF","trait":"goalPost","y":80},{"radius":5,"pos":[550,-80],"color":"6666FF","trait":"goalPost","y":-80},{"radius":3,"invMass":0,"pos":[-550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"}],"planes":[{"normal":[0,1],"dist":-240,"bCoef":1,"trait":"ballArea","vis":false,"curve":0},{"normal":[0,-1],"dist":-240,"bCoef":1,"trait":"ballArea"},{"normal":[0,1],"dist":-270,"bCoef":0.1},{"normal":[0,-1],"dist":-270,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1},{"normal":[-1,0],"dist":-620,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0},{"normal":[-1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"line":{"vis":true,"bCoef":0.1,"cMask":[""]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":5},"ballPhysics":{"radius":6.25,"bCoef":0.4,"invMass":1.5,"damping":0.99,"color":"FFCC00"}};
    room.setCustomStadium(JSON.stringify(mapa));
    room.setScoreLimit(3);
    room.setTimeLimit(3);
    room.setTeamsLock(true);
    room.onRoomLink = function(link){
        console.log(link)
    }

    // =====================================
    // CONEXÃO COM FIREBASE
    // =====================================
    var FIREBASE_CONFIG = {
        databaseURL: "https://doggao-discord-default-rtdb.firebaseio.com/haxball"
    };

    var FIREBASE_SECRET = "CAohCMsAc7eiDPeqcvitGJxoTBHVAVPsazeEF5J4"; 
    var FIREBASE_URL = FIREBASE_CONFIG.databaseURL;

    var dbData = { players: {}, stats: { totalGoals: 0, totalAssists: 0, totalGames: 0 } };
    var loggedInPlayers = {};

    function cleanKey(key) {
        return key.replace(/[.$#\[\]\/]/g, "_");
    }

    function loadDB() {
        fetch(FIREBASE_URL + "/.json?auth=" + FIREBASE_SECRET) 
            .then(res => {
                if (!res.ok) throw new Error("Erro de Autenticação. Verifique seu Segredo.");
                return res.json();
            }) 
            .then(data => {
                if (data) {
                    dbData.players = data.players || {};
                    dbData.stats = data.stats || { totalGoals: 0, totalAssists: 0, totalGames: 0 };
                    console.log("🔥 [Firebase] Dados carregados com segurança!"); 
                }
            })
            .catch(err => console.error("❌ [Firebase Error] Erro ao carregar:", err));
    }

    function saveDB() {
        fetch(FIREBASE_URL + "/.json?auth=" + FIREBASE_SECRET, { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbData)
        })
        .catch(err => console.error("❌ [Firebase Error] Erro ao salvar:", err));
    }

    function getProfile(name) {
        var key = cleanKey(name);
        return dbData.players[key] || null;
    }

    function createProfile(player) {
        var key = cleanKey(player.name);
        if (!dbData.players[key]) {
            dbData.players[key] = {
                name: player.name,
                password: "", 
                goals: 0, assists: 0, wins: 0, losses: 0, games: 0,
                joinDate: new Date().toISOString()
            };
            saveDB();
        }
        return dbData.players[key];
    }

    function addGoal(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].goals++;
        dbData.stats.totalGoals++;
        saveDB();
    }

    function addAssist(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].assists++;
        dbData.stats.totalAssists++;
        saveDB();
    }

    function addWin(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].wins++;
        dbData.players[key].games++;
        saveDB();
    }

    function addLoss(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].losses++;
        dbData.players[key].games++;
        saveDB();
    }

    function getRank(data) {
        if (!data) return { emoji: "🤖", name: "Iniciantes", color: 0x808080 };
        var total = (data.goals || 0) + (data.assists || 0);
        if (total < 150) return { emoji: "🤖", name: "Iniciantes", color: 0x808080 };
        if (total < 300) return { emoji: "🥉", name: "Bronze", color: 0xCD7F32 };
        if (total < 500) return { emoji: "🥈", name: "Prata", color: 0xC0C0C0 };
        if (total < 1000) return { emoji: "🥇", name: "Ouro", color: 0xFFD700 };
        return { emoji: "🌟", name: "Estrela", color: 0x00FFFF };
    }

    // =====================================
    // SISTEMA DE FILA E BALANCEAMENTO DINÂMICO
    // =====================================
    var fila = [];
    var gameEnding = false;
    var isManaging = false; 
    var lastKick = null;
    var secondLastKick = null;

    function addToQueue(player) {
        if (!fila.includes(player.id)) fila.push(player.id);
    }

    function removeFromQueue(player) {
        fila = fila.filter(id => id !== player.id);
    }

    function updateQueue() {
        var onlineIds = room.getPlayerList().map(p => p.id);
        fila = fila.filter(id => onlineIds.includes(id));

        var allPlayers = room.getPlayerList();
        allPlayers.forEach(p => {
            if (!fila.includes(p.id)) {
                fila.push(p.id);
            }
        });
    }
function manageTeams() {
        if (gameEnding) return;

        var players = room.getPlayerList();
        var red = players.filter(p => p.team === 1);
        var blue = players.filter(p => p.team === 2);
        
        var total = players.length;
        var maxPerTeam = 1;
        if (total >= 6) maxPerTeam = 3;
        else if (total >= 4) maxPerTeam = 2;
        else if (total >= 2) maxPerTeam = 1;

        updateQueue();

        while (red.length < maxPerTeam) {
            var nextId = fila.find(id => {
                var p = room.getPlayer(id);
                return p && p.team === 0;
            });
            if (!nextId) break;
            var p = room.getPlayer(nextId);
            room.setPlayerTeam(p.id, 1);
            removeFromQueue(p);
            red.push(p);
        }

        while (blue.length < maxPerTeam) {
            var nextId = fila.find(id => {
                var p = room.getPlayer(id);
                return p && p.team === 0;
            });
            if (!nextId) break;
            var p = room.getPlayer(nextId);
            room.setPlayerTeam(p.id, 2);
            removeFromQueue(p);
            blue.push(p);
        }

        while (red.length > maxPerTeam) {
            var p = red.pop();
            room.setPlayerTeam(p.id, 0);
            addToQueue(p);
        }
        while (blue.length > maxPerTeam) {
            var p = blue.pop();
            room.setPlayerTeam(p.id, 0);
            addToQueue(p);
        }

        var currentRed = room.getPlayerList().filter(p => p.team === 1).length;
        var currentBlue = room.getPlayerList().filter(p => p.team === 2).length;

        if (currentRed > 0 && currentRed === currentBlue) {
            setTimeout(function() {
                if (room.getScores() === null) {
                    room.startGame();
                }
            }, 800);
        }
    }
    // =====================================
    // UNIFORMES
    // =====================================
const uniforms = {
    "Brasil": [0x009C3B, 0xFFDF00, 0x009C3B],
    "Argentina": [0x75AADB, 0xFFFFFF, 0x75AADB],
    "Espanha": [0xAA151B, 0xF1BF00, 0xAA151B],
    "França": [0x0055A4, 0xFFFFFF, 0xEF4135],
    "Holanda": [0xAE1C28, 0xFFFFFF, 0x21468B],
    "Alemanha": [0x000000, 0xDD0000, 0xFFCC00],
    "Inglaterra": [0xFFFFFF, 0xCF081F, 0xFFFFFF],
    "Portugal": [0x006600, 0xCC0000, 0x006600],
    "Italia": [0x009246, 0xFFFFFF, 0xCE2B37],
    "Uruguai": [0x75AADB, 0xFFFFFF, 0x75AADB],
    "Corinthians": [0x000000, 0xFFFFFF, 0x000000],
    "Palmeiras": [0x006600, 0xFFFFFF, 0x006600],
    "São Paulo": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Santos": [0xFFFFFF, 0x000000, 0xFFFFFF],
    "Flamengo": [0xCC0000, 0x000000, 0xCC0000],
    "Vasco": [0x000000, 0xFFFFFF, 0xCC0000],
    "Fluminense": [0xCC0000, 0x006600, 0xCC0000],
    "Botafogo": [0x000000, 0xFFFFFF, 0x000000],
    "Internacional": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Grêmio": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Cruzeiro": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Atlético-MG": [0x000000, 0xFFFFFF, 0xCC0000],
    "Bahia": [0x0066CC, 0xCC0000, 0x0066CC],
    "Sport": [0xCC0000, 0x000000, 0xCC0000],
    "Coritiba": [0x006600, 0xFFFFFF, 0x006600],
    "Athletico-PR": [0xCC0000, 0x000000, 0xCC0000],
    "Barcelona": [0x004D98, 0xCC0000, 0x004D98],
    "Real Madrid": [0xFFFFFF, 0xFFFFFF, 0xFFFFFF],
    "Real Madrid (Visitante)": [0x000000, 0x000000, 0x000000],
    "Milan": [0xCC0000, 0x000000, 0xCC0000],
    "Internazionale": [0x0066CC, 0x000000, 0x0066CC],
    "Juventus": [0xFFFFFF, 0x000000, 0xFFFFFF],
    "Manchester United": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Manchester City": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Liverpool": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Chelsea": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Arsenal": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Bayern Munique": [0xCC0000, 0x0066CC, 0xCC0000],
    "Borussia Dortmund": [0x000000, 0xFFCC00, 0x000000],
    "Paris Saint-Germain": [0x0066CC, 0xCC0000, 0x0066CC],
    "Atletico Madrid": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Sevilla": [0xFFFFFF, 0xCC0000, 0xFFFFFF],
    "Benfica": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Porto": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Sporting": [0x006600, 0xCC0000, 0x006600],
    "Ajax": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "PSV Eindhoven": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Celtic": [0x006600, 0xFFFFFF, 0x006600],
    "Rangers": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Boca Juniors": [0x0066CC, 0xFFCC00, 0x0066CC],
    "River Plate": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Náutico": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Santa Cruz": [0x000000, 0xFFFFFF, 0x000000],
    "Londrina": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Ceará": [0x000000, 0xFFFFFF, 0x000000],
    "Fortaleza": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Goiás": [0x006600, 0xFFFFFF, 0x006600],
    "Vila Nova": [0xCC0000, 0xFFFFFF, 0xCC0000],
    "Remo": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Paysandu": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "América-MG": [0x006600, 0xFFFFFF, 0x006600],
    "Guarani": [0x000000, 0xFFFFFF, 0x000000],
    "Ponte Preta": [0x000000, 0xFFFFFF, 0x000000],
    "Juventude": [0x006600, 0xFFFFFF, 0x006600],
    "Criciúma": [0x000000, 0xFFFFFF, 0x000000],
    "Figueirense": [0x000000, 0xFFFFFF, 0x000000],
    "Avaí": [0x0066CC, 0xFFFFFF, 0x0066CC],
    "Chapecoense": [0x006600, 0xFFFFFF, 0x006600]
};
    function setUniform(room, teamId, uniformName) {
        if (!uniforms[uniformName]) return false;
        room.setTeamColors(teamId, 0, 0xFFFFFF, uniforms[uniformName]);
        return true;
    }

    // =====================================
    // EVENTOS DO HAXBALL
    // =====================================
    room.onPlayerJoin = function(player) {
        if (!getProfile(player.name)) createProfile(player);

        loggedInPlayers[player.id] = false;

        room.sendAnnouncement("🔐 Bem-vindo à ESP League BR, " + player.name + "!\n⚠️ Faça login com: !login <senha>\n📌 Sem cadastro? Use !register e acesse https://dcd.gg/espunited\n⚠️ Isso serve para salvar seus dados! Como perfil,gols,assistências e etc.", player.id, 0xFF0000, "bold");

        room.setPlayerTeam(player.id, 0);
        addToQueue(player);
        manageTeams();
    };

room.onPlayerLeave = function(player) {
    delete loggedInPlayers[player.id];
        removeFromQueue(player);
        manageTeams();
};

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
        if (changedPlayer.team === 0) {
            addToQueue(changedPlayer);
        } else {
            removeFromQueue(changedPlayer);
        }
        manageTeams();
    };
    room.onPlayerBallKick = function(player) {
        if (!lastKick || lastKick.id !== player.id) {
            secondLastKick = lastKick;
            lastKick = player;
        }
    };

    room.onTeamGoal = function(team) {
        if (lastKick && lastKick.team === team) {
            addGoal(lastKick.name);
            room.sendAnnouncement("⚽ GOL DE " + lastKick.name.toUpperCase() + "!", null, 0x00FF00, "bold");

            if (secondLastKick && secondLastKick.team === team && secondLastKick.id !== lastKick.id) {
                addAssist(secondLastKick.name);
                room.sendAnnouncement("🎯 Assistência de " + secondLastKick.name + "!", null, 0x00FF00);
            }
        } else {
            room.sendAnnouncement("⚠️ Gol contra registrado!", null, 0xFF6666, "bold");
        }
        lastKick = null;
        secondLastKick = null;
    };

room.onTeamVictory = function(scores) {
        if (gameEnding) return;
        gameEnding = true;

        var winnerTeam = scores.red > scores.blue ? 1 : 2;
        var winnerName = winnerTeam === 1 ? "🔴 VERMELHO" : "🔵 AZUL";

        var redPlayers = room.getPlayerList().filter(p => p.team === 1);
        var bluePlayers = room.getPlayerList().filter(p => p.team === 2);

        (winnerTeam === 1 ? redPlayers : bluePlayers).forEach(p => addWin(p.name));
        (winnerTeam === 1 ? bluePlayers : redPlayers).forEach(p => addLoss(p.name));

        dbData.stats.totalGames++;
        saveDB();

        room.sendAnnouncement("🏆 FIM DE JOGO! O Time " + winnerName + " venceu!", null, 0xFFD700, "bold");

        setTimeout(function() {
            room.stopGame();
            gameEnding = false;
            manageTeams();

            // Força o reinício garantido após o término para evitar que fique travado
            setTimeout(function() {
                var currentRed = room.getPlayerList().filter(p => p.team === 1).length;
                var currentBlue = room.getPlayerList().filter(p => p.team === 2).length;
                if (room.getScores() === null && currentRed > 0 && currentRed === currentBlue) {
                    room.startGame();
                }
            }, 1000);
        }, 3000);
    };

    // =====================================
    // SISTEMA DE COMANDOS DE CHAT
    // =====================================
    room.onPlayerChat = function(player, message) {
        var args = message.split(" ");
        var cmd = args[0].toLowerCase();

        if (cmd === "!login") {
            var senhaDigitada = args.slice(1).join(" ");
            
            loadDB();
            
            setTimeout(function() {
                var profile = getProfile(player.name);

                if (!profile || !profile.password || profile.password === "") {
                    room.sendAnnouncement("❌ Você ainda não se cadastrou no site do Discord! Acesse https://dcd.gg/espunited", player.id, 0xFF0000);
                    return false;
                }

                if (profile.password === senhaDigitada) {
                    loggedInPlayers[player.id] = true;
                    var rank = getRank(profile);
                    
                    if (admins.includes(player.name)) {
                        room.setPlayerAdmin(player.id, true);
                        room.sendAnnouncement("👑 Acesso de Administrador concedido com sucesso!", player.id, 0xFFD700, "bold");
                    }

                    room.sendAnnouncement("✅ Login efetuado com sucesso! Bem-vindo de volta, " + rank.emoji + " " + player.name + ".", player.id, 0x00FF00, "bold");
                } else {
                    room.sendAnnouncement("❌ Senha incorreta!", player.id, 0xFF0000);
                }
            }, 500);

            return false;
        }

        if (cmd === "!register" || cmd === "!registro") {
            room.sendAnnouncement("📌 Para se registrar e definir sua senha, acesse o site oficial: https://dcd.gg/espunited", player.id, 0x00BFFF, "bold");
            return false;
        }

        if (cmd === "!help") {
            room.sendAnnouncement(
                "📌 COMANDOS DISPONÍVEIS:\n" +
                "!login <senha> - Fazer login na sala\n" +
                "!register - Ver link de cadastro\n" +
                "!perfil - Ver suas estatísticas\n" +
                "!ranking - Top 5 jogadores\n" +
                "!fila - Ver fila de espera\n" +
                "!uni nome - Mudar uniforme do time (Admin)\n" +
                "!unilist - Lista de uniformes",
                player.id, 0x00BFFF
            );
            return false;
        }

        if (cmd === "!setprofile") {
            if (!player.admin) {
                room.sendAnnouncement("❌ Apenas administradores podem usar o comando !setprofile!", player.id, 0xFF0000);
                return false;
            }

            if (args.length < 4) {
                room.sendAnnouncement("⚠️ Uso incorreto! Use: !setprofile <jogador> <gols/assistencias/vitorias/derrotas/partidas> <quantidade>", player.id, 0xFFA500);
                return false;
            }

            var validStats = ["gols", "assistencias", "vitorias", "derrotas", "partidas"];
            var statIndex = -1;
            for (var i = args.length - 2; i > 0; i--) {
                if (validStats.includes(args[i].toLowerCase())) {
                    statIndex = i;
                    break;
                }
            }

            if (statIndex === -1) {
                room.sendAnnouncement("❌ Status inválido! Escolha entre: gols, assistencias, vitorias, derrotas, partidas", player.id, 0xFF0000);
                return false;
            }

            var statType = args[statIndex].toLowerCase();
            var value = parseInt(args[args.length - 1]);
            var targetName = args.slice(1, statIndex).join(" ");

            if (!targetName || isNaN(value)) {
                room.sendAnnouncement("❌ Formato inválido! Verifique o nome do jogador e o valor.", player.id, 0xFF0000);
                return false;
            }

            var key = cleanKey(targetName);
            if (!dbData.players[key]) {
                room.sendAnnouncement("❌ Perfil de '" + targetName + "' não encontrado!", player.id, 0xFF0000);
                return false;
            }

            if (statType === "gols") dbData.players[key].goals = value;
            if (statType === "assistencias") dbData.players[key].assists = value;
            if (statType === "vitorias") dbData.players[key].wins = value;
            if (statType === "derrotas") dbData.players[key].losses = value;
            if (statType === "partidas") dbData.players[key].games = value;

            saveDB();
            room.sendAnnouncement("✅ Perfil de " + dbData.players[key].name + " atualizado! " + statType + " alterado para " + value + ".", player.id, 0x00FF00, "bold");
            return false;
        }

        if (cmd === "!perfil" || cmd === "!profile") {
            var targetName = args.length > 1 ? args.slice(1).join(" ") : player.name;
            var data = getProfile(targetName);

            if (!data) {
                room.sendAnnouncement("❌ Perfil de '" + targetName + "' não encontrado!", player.id, 0xFF0000);
                return false;
            }

            var rank = getRank(data);
            room.sendAnnouncement(
                "👤 PERFIL DE " + data.name + "\n" +
                rank.emoji + " Rank: " + rank.name + "\n" +
                "⚽ Gols: " + (data.goals || 0) + " | 🎯 Assistências: " + (data.assists || 0) + "\n" +
                "🏆 Vitórias: " + (data.wins || 0) + " | ❌ Derrotas: " + (data.losses || 0) + "\n" +
                "📊 Partidas: " + (data.games || 0),
                player.id, 0x00BFFF
            );
            return false;
        }

        if (cmd === "!ranking" || cmd === "!rank") {
            var allPlayers = Object.values(dbData.players);
            allPlayers.sort((a, b) => ((b.goals || 0) + (b.assists || 0)) - ((a.goals || 0) + (a.assists || 0)));

            var text = "🏆 TOP 5 JOGADORES:\n";
            allPlayers.slice(0, 5).forEach((p, idx) => {
                var r = getRank(p);
                text += (idx + 1) + ". " + r.emoji + " " + p.name + " - " + ((p.goals || 0) + (p.assists || 0)) + " pts\n";
            });
            room.sendAnnouncement(text, player.id, 0xFFD700);
            return false;
        }

        if (cmd === "!fila") {
            var specs = fila.map(id => room.getPlayerList().find(p => p.id === id)).filter(Boolean);
            var text = "📋 FILA DE ESPERA (" + specs.length + "):\n";
            specs.forEach((p, i) => text += (i + 1) + ". " + p.name + "\n");
            room.sendAnnouncement(text, player.id, 0xFFA500);
            return false;
        }

        if (cmd === "!uni" || cmd === "!uniforme") {
            if (!player.admin) {
                room.sendAnnouncement("❌ Apenas admins podem mudar uniformes!", player.id, 0xFF0000);
                return false;
            }
            if (player.team === 0) {
                room.sendAnnouncement("⚠️ Mude para um time antes de alterar a camisa!", player.id, 0xFFA500);
                return false;
            }
            var uniName = args.slice(1).join("");
            var key = Object.keys(uniforms).find(k => k.toLowerCase() === uniName.toLowerCase());

            if (key && setUniform(room, player.team, key)) {
                room.sendAnnouncement("👕 Uniforme alterado para " + key + "!", null, 0x00FF00);
            } else {
                room.sendAnnouncement("❌ Uniforme não encontrado. Use !unilist", player.id, 0xFF0000);
            }
            return false;
        }

        if (cmd === "!unilist") {
            room.sendAnnouncement("👕 UNIFORMES: " + Object.keys(uniforms).join(", "), player.id, 0x00BFFF);
            return false;
        }

        // Envio de mensagens públicas (com verificação de login para definir [Guest] ou o Rank)
        if (loggedInPlayers[player.id]) {
            var profile = getProfile(player.name) || createProfile(player);
            var rank = getRank(profile);
            room.sendAnnouncement("[" + rank.emoji + " " + player.name + "]: " + message, null, rank.color, "normal", 0);
        } else {
            room.sendAnnouncement("[Guest] " + player.name + ": " + message, null, 0x808080, "normal", 0);
        }
        
        return false;
    };

    // Inicialização
    loadDB();
    console.log("🚀 Servidor pronto!");
});