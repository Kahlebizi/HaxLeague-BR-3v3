// =====================================
// CONFIGURAÇÃO DA SALA
// =====================================
var room = HBInit({
    roomName: "🔥 ESPLeague BR | 5v5",
    maxPlayers: 10,
    public: true,
    noPlayer: true // Bot roda headless sem jogador host em campo
});
var mapa = {"name":"Futsal x3  by Bazinga from HaxMaps","width":620,"height":270,"spawnDistance":350,"bg":{"type":"hockey","width":550,"height":240,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":550,"y":240,"trait":"ballArea"},{"x":550,"y":-240,"trait":"ballArea"},{"x":0,"y":270,"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-270,"trait":"kickOffBarrier"},{"x":-550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":-550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,-80]},{"x":-550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","pos":[700,80]},{"x":550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[700,-80]},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":-550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":0,"y":-240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":-557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[-700,80]},{"x":-557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":-557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":-557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[-700,-80]},{"x":557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[700,-80]},{"x":557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[700,80]},{"x":557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":0,"y":-80,"bCoef":0.1,"trait":"line"},{"x":0,"y":80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":80,"bCoef":0.1,"trait":"line"},{"x":550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":550,"y":80,"bCoef":0.1,"trait":"line"},{"x":-240,"y":256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":256,"bCoef":0.1,"trait":"line"},{"x":-240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":240,"y":256,"bCoef":0.1,"trait":"line"},{"x":120,"y":224,"bCoef":0.1,"trait":"line"},{"x":120,"y":256,"bCoef":0.1,"trait":"line"},{"x":240,"y":-224,"bCoef":0.1,"trait":"line"},{"x":240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-381,"y":240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":256,"bCoef":0.1,"trait":"line"},{"x":-550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":-390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":226,"bCoef":0.1,"trait":"line","curve":-90},{"x":-536,"y":240,"bCoef":0.1,"trait":"line","curve":-90},{"x":-550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":-390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":-226,"bCoef":0.1,"trait":"line","curve":90},{"x":-536,"y":-240,"bCoef":0.1,"trait":"line","curve":90},{"x":-556,"y":123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":123,"bCoef":0.1,"trait":"line"},{"x":556,"y":123,"bCoef":0.1,"trait":"line"},{"x":575,"y":123,"bCoef":0.1,"trait":"line"},{"x":-556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":381,"y":240,"bCoef":0.1,"trait":"line"},{"x":381,"y":256,"bCoef":0.1,"trait":"line"},{"x":381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":550,"y":-226,"bCoef":0.1,"trait":"line","curve":-90},{"x":536,"y":-240,"bCoef":0.1,"trait":"line","curve":-90},{"x":550,"y":226,"bCoef":0.1,"trait":"line","curve":90},{"x":536,"y":240,"bCoef":0.1,"trait":"line","curve":90},{"x":550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180}],"segments":[{"v0":6,"v1":7,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":7,"v1":8,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":8,"v1":9,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":10,"v1":11,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,-80],"y":-80},{"v0":11,"v1":12,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":590},{"v0":12,"v1":13,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,80],"y":80},{"v0":2,"v1":3,"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":-180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":4,"v1":5,"trait":"kickOffBarrier"},{"v0":14,"v1":15,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":16,"v1":17,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":18,"v1":19,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":240},{"v0":20,"v1":21,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":22,"v1":23,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":24,"v1":25,"vis":true,"color":"F8F8F8","bCoef":0,"cMask":["ball"],"trait":"ballArea","x":550,"y":-240},{"v0":26,"v1":27,"curve":0,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":-240},{"v0":28,"v1":29,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":30,"v1":31,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":38,"v1":39,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":40,"v1":41,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":42,"v1":43,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":44,"v1":45,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":46,"v1":47,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":0},{"v0":48,"v1":49,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-550},{"v0":50,"v1":51,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":550},{"v0":64,"v1":65,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":66,"v1":67,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":69,"v1":68,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":70,"v1":71,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":67,"v1":71,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":73,"v1":72,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":76,"v1":77,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":78,"v1":79,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":84,"v1":85,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":86,"v1":87,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":89,"v1":88,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":91,"v1":90,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":92,"v1":93,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":94,"v1":95,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":96,"v1":97,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":390},{"v0":99,"v1":98,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":98,"v1":99,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":101,"v1":100,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":100,"v1":101,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":103,"v1":102,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":102,"v1":103,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":105,"v1":104,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":104,"v1":105,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":107,"v1":106,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":106,"v1":107,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":109,"v1":108,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":108,"v1":109,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":111,"v1":110,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":110,"v1":111,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":113,"v1":112,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":112,"v1":113,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":115,"v1":114,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":114,"v1":115,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":117,"v1":116,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":116,"v1":117,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":119,"v1":118,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":118,"v1":119,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":121,"v1":120,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":120,"v1":121,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":123,"v1":122,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":122,"v1":123,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":125,"v1":124,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":124,"v1":125,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":127,"v1":126,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":126,"v1":127,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":129,"v1":128,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":128,"v1":129,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5}],"goals":[{"p0":[-557.5,-80],"p1":[-557.5,80],"team":"red"},{"p0":[557.5,80],"p1":[557.5,-80],"team":"blue"}],"discs":[{"radius":5,"pos":[-550,80],"color":"FF6666","trait":"goalPost","y":80},{"radius":5,"pos":[-550,-80],"color":"FF6666","trait":"goalPost","y":-80,"x":-560},{"radius":5,"pos":[550,80],"color":"6666FF","trait":"goalPost","y":80},{"radius":5,"pos":[550,-80],"color":"6666FF","trait":"goalPost","y":-80},{"radius":3,"invMass":0,"pos":[-550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"}],"planes":[{"normal":[0,1],"dist":-240,"bCoef":1,"trait":"ballArea","vis":false,"curve":0},{"normal":[0,-1],"dist":-240,"bCoef":1,"trait":"ballArea"},{"normal":[0,1],"dist":-270,"bCoef":0.1},{"normal":[0,-1],"dist":-270,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1},{"normal":[-1,0],"dist":-620,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0},{"normal":[-1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"line":{"vis":true,"bCoef":0.1,"cMask":[""]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":5},"ballPhysics":{"radius":6.25,"bCoef":0.4,"invMass":1.5,"damping":0.99,"color":"FFCC00"}}

// =====================================
// APLICA CONFIGURAÇÕES
// =====================================
console.log('🏟️ ESPLeague BR | 3v3 iniciado!');

room.setCustomStadium(JSON.stringify(mapa));

room.setScoreLimit(3);
room.setTimeLimit(3);
room.setTeamsLock(true);
// =====================================
// VARIÁVEIS GLOBAIS E BANCO DE DADOS
// =====================================
var maxPlayersPerTeam = 5;
var playerOrder = []; // Lista global que guarda quem entrou primeiro
var gameEnding = false;
var loggedInPlayers = {};
var balanceTimeout = null;

var dbData = JSON.parse(localStorage.getItem("esp_league_db")) || {
    users: {},
    stats: { totalGames: 0 }
};

function saveDB() {
    localStorage.setItem("esp_league_db", JSON.stringify(dbData));
}

function getProfile(playerName) {
    return dbData.users[playerName.toLowerCase()];
}

function createProfile(player, password) {
    dbData.users[player.name.toLowerCase()] = {
        name: player.name,
        password: password || "123456",
        wins: 0,
        losses: 0,
        registeredAt: new Date().toLocaleDateString("pt-BR")
    };
    saveDB();
}

function addWin(playerName) {
    var profile = getProfile(playerName);
    if (profile) {
        profile.wins++;
        saveDB();
    }
}

function addLoss(playerName) {
    var profile = getProfile(playerName);
    if (profile) {
        profile.losses++;
        saveDB();
    }
}

// =====================================
// BALANCEAMENTO E INÍCIO AUTOMÁTICO
// =====================================

function triggerAutoBalance() {
    if (balanceTimeout) clearTimeout(balanceTimeout);
    balanceTimeout = setTimeout(autoBalance, 150);
}

function autoBalance() {
    if (gameEnding) return;

    var allPlayers = room.getPlayerList();

    // Mantém a ordem de entrada sincronizada
    var currentIds = allPlayers.map(p => p.id);
    playerOrder = playerOrder.filter(id => currentIds.includes(id));
    currentIds.forEach(id => {
        if (!playerOrder.includes(id)) playerOrder.push(id);
    });

    // Menos de 2 jogadores: encerra o jogo se estiver rolando
    if (allPlayers.length < 2) {
        if (room.getScores() !== null) room.stopGame();
        return;
    }

    // Define a meta exata por time: 2-3 pps = 1v1 | 4-5 pps = 2v2 | 6-7 pps = 3v3...
    var target = Math.min(Math.floor(allPlayers.length / 2), maxPlayersPerTeam);
    if (target < 1) return;

    var reds = allPlayers.filter(p => p.team === 1);
    var blues = allPlayers.filter(p => p.team === 2);

    // 1. Remove excessos do Time Vermelho
    while (reds.length > target) {
        var excess = reds.pop();
        room.setPlayerTeam(excess.id, 0);
    }

    // 2. Remove excessos do Time Azul
    while (blues.length > target) {
        var excess = blues.pop();
        room.setPlayerTeam(excess.id, 0);
    }

    // Obtém os jogadores no Spectator (time 0) mantendo a ordem de chegada
    var specs = playerOrder
        .map(id => room.getPlayerList().find(p => p.id === id))
        .filter(p => p && p.team === 0);

    // 3. Preenche o Time Vermelho se faltar gente
    while (reds.length < target && specs.length > 0) {
        var p = specs.shift();
        room.setPlayerTeam(p.id, 1);
        reds.push(p);
    }

    // 4. Preenche o Time Azul se faltar gente
    while (blues.length < target && specs.length > 0) {
        var p = specs.shift();
        room.setPlayerTeam(p.id, 2);
        blues.push(p);
    }

    // 5. INÍCIO AUTOMÁTICO DE PARTIDA
    // Se a partida estiver PARADA e ambos os times tiverem a quantidade correta (target)
    if (room.getScores() === null) {
        var finalReds = room.getPlayerList().filter(p => p.team === 1);
        var finalBlues = room.getPlayerList().filter(p => p.team === 2);

        if (finalReds.length === target && finalBlues.length === target && target >= 1) {
            setTimeout(function() {
                if (room.getScores() === null && !gameEnding) {
                    var checkReds = room.getPlayerList().filter(p => p.team === 1);
                    var checkBlues = room.getPlayerList().filter(p => p.team === 2);
                    // Confirma se os times continuam prontos e inicia o jogo
                    if (checkReds.length === target && checkBlues.length === target) {
                        room.startGame();
                    }
                }
            }, 300);
        }
    }
}

// =====================================
// EVENTOS DO SISTEMA
// =====================================

room.onPlayerJoin = function(player) {
    if (!playerOrder.includes(player.id)) playerOrder.push(player.id);
    loggedInPlayers[player.id] = false;

    room.sendAnnouncement("🔐 Bem-vindo à ESP League BR, " + player.name + "!", player.id, 0x00FF00, "bold");
    room.sendAnnouncement("⚠️ Use !login <senha> ou !register <senha> para jogar.", player.id, 0xFFFF00, "normal");

    room.setPlayerTeam(player.id, 0);
    triggerAutoBalance();
};

room.onPlayerLeave = function(player) {
    playerOrder = playerOrder.filter(id => id !== player.id);
    delete loggedInPlayers[player.id];
    triggerAutoBalance();
};

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
    triggerAutoBalance();
};

room.onTeamVictory = function(scores) {
    if (gameEnding) return;
    gameEnding = true;

    var winnerTeam = scores.red > scores.blue ? 1 : 2;
    var loserTeam = winnerTeam === 1 ? 2 : 1;

    var redPlayers = room.getPlayerList().filter(p => p.team === 1);
    var bluePlayers = room.getPlayerList().filter(p => p.team === 2);

    (winnerTeam === 1 ? redPlayers : bluePlayers).forEach(p => addWin(p.name));
    (winnerTeam === 1 ? bluePlayers : redPlayers).forEach(p => addLoss(p.name));

    dbData.stats.totalGames++;
    saveDB();

    room.sendAnnouncement("🏆 FIM DE JOGO! Vitória do time " + (winnerTeam === 1 ? "Vermelho" : "Azul") + "!", null, 0xFFD700, "bold");

    setTimeout(function() {
        room.stopGame();

        // Envia perdedores para a fila (Spec)
        var losers = room.getPlayerList().filter(p => p.team === loserTeam);
        losers.forEach(p => room.setPlayerTeam(p.id, 0));

        // Rei da Mesa: Se o Azul venceu, assume o Time Vermelho
        if (winnerTeam === 2) {
            var winners = room.getPlayerList().filter(p => p.team === 2);
            winners.forEach(p => room.setPlayerTeam(p.id, 1));
        }

        gameEnding = false;
        triggerAutoBalance();
    }, 1500);
};

// =====================================
// COMANDOS DE CHAT
// =====================================

room.onPlayerChat = function(player, message) {
    var args = message.split(" ");
    var cmd = args[0].toLowerCase();

    if (cmd === "!register") {
        if (getProfile(player.name)) {
            room.sendAnnouncement("❌ Você já possui uma conta registrada! Use !login <senha>", player.id, 0xFF0000);
            return false;
        }
        if (!args[1]) {
            room.sendAnnouncement("❌ Uso correto: !register <senha>", player.id, 0xFF0000);
            return false;
        }
        createProfile(player, args[1]);
        loggedInPlayers[player.id] = true;
        room.sendAnnouncement("✅ Conta registrada e logada com sucesso!", player.id, 0x00FF00);
        return false;
    }

    if (cmd === "!login") {
        var profile = getProfile(player.name);
        if (!profile) {
            room.sendAnnouncement("❌ Conta não encontrada! Registre-se com !register <senha>", player.id, 0xFF0000);
            return false;
        }
        if (args[1] === profile.password) {
            loggedInPlayers[player.id] = true;
            room.sendAnnouncement("✅ Login efetuado com sucesso!", player.id, 0x00FF00);
        } else {
            room.sendAnnouncement("❌ Senha incorreta!", player.id, 0xFF0000);
        }
        return false;
    }

    if (cmd === "!stats") {
        var targetName = args[1] ? args[1] : player.name;
        var profile = getProfile(targetName);
        if (profile) {
            var total = profile.wins + profile.losses;
            var winrate = total > 0 ? ((profile.wins / total) * 100).toFixed(1) : "0.0";
            room.sendAnnouncement("📊 Stats de " + profile.name + ": " + profile.wins + "V / " + profile.losses + "D (" + winrate + "% WR)", player.id, 0x00FFFF);
        } else {
            room.sendAnnouncement("❌ Jogador não encontrado no banco de dados.", player.id, 0xFF0000);
        }
        return false;
    }

    if (cmd === "!help") {
        room.sendAnnouncement("📌 Comandos: !register <senha>, !login <senha>, !stats [nome]", player.id, 0xFFFFFF);
        return false;
    }

    return true;
};