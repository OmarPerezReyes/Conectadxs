/*
 Joel Espinosa Longi
 jlongi@im.unam.mx
 https://github.com/jlongi/DescartesJS
 LGPL - http://www.gnu.org/licenses/lgpl.html
 2021-04-20
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) { var g = 0; return function() { return g < a.length ? { done: !1, value: a[g++] } : { done: !0 } } };
$jscomp.arrayIterator = function(a) { return { next: $jscomp.arrayIteratorImpl(a) } };
$jscomp.makeIterator = function(a) { var g = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator]; return g ? g.call(a) : $jscomp.arrayIterator(a) };
$jscomp.arrayFromIterator = function(a) { for (var g, f = []; !(g = a.next()).done;) f.push(g.value); return f };
$jscomp.arrayFromIterable = function(a) { return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a)) };
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
    var g = function() {};
    g.prototype = a;
    return new g
};
$jscomp.underscoreProtoCanBeSet = function() {
    var a = { a: !0 },
        g = {};
    try { return g.__proto__ = a, g.a } catch (f) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, g) { a.__proto__ = g; if (a.__proto__ !== g) throw new TypeError(a + " is not extensible"); return a } : null;
$jscomp.inherits = function(a, g) {
    a.prototype = $jscomp.objectCreate(g.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var f = $jscomp.setPrototypeOf;
        f(a, g)
    } else
        for (f in g)
            if ("prototype" != f)
                if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(g, f);
                    e && Object.defineProperty(a, f, e)
                } else a[f] = g[f];
    a.superClass_ = g.prototype
};
$jscomp.checkStringArgs = function(a, g, f) { if (null == a) throw new TypeError("The 'this' value for String.prototype." + f + " must not be null or undefined"); if (g instanceof RegExp) throw new TypeError("First argument to String.prototype." + f + " must not be a regular expression"); return a + "" };
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, g, f) { a != Array.prototype && a != Object.prototype && (a[g] = f.value) };
$jscomp.getGlobal = function(a) { return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, g, f, e) {
    if (g) {
        f = $jscomp.global;
        a = a.split(".");
        for (e = 0; e < a.length - 1; e++) {
            var r = a[e];
            r in f || (f[r] = {});
            f = f[r]
        }
        a = a[a.length - 1];
        e = f[a];
        g = g(e);
        g != e && null != g && $jscomp.defineProperty(f, a, { configurable: !0, writable: !0, value: g })
    }
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
    return a ? a : function(a) {
        var f = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > a || 1342177279 < a) throw new RangeError("Invalid count value");
        a |= 0;
        for (var e = ""; a;)
            if (a & 1 && (e += f), a >>>= 1) f += f;
        return e
    }
}, "es6", "es3");
$jscomp.owns = function(a, g) { return Object.prototype.hasOwnProperty.call(a, g) };
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(a, g) {
    for (var f = 1; f < arguments.length; f++) {
        var e = arguments[f];
        if (e)
            for (var r in e) $jscomp.owns(e, r) && (a[r] = e[r])
    }
    return a
};
$jscomp.polyfill("Object.assign", function(a) { return a || $jscomp.assign }, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function(a) {
    return a ? a : function(a, f, e) {
        var g = this.length || 0;
        0 > f && (f = Math.max(0, g + f));
        if (null == e || e > g) e = g;
        e = Number(e);
        0 > e && (e = Math.max(0, g + e));
        for (f = Number(f || 0); f < e; f++) this[f] = a;
        return this
    }
}, "es6", "es3");
$jscomp.findInternal = function(a, g, f) { a instanceof String && (a = String(a)); for (var e = a.length, r = 0; r < e; r++) { var p = a[r]; if (g.call(f, p, r, a)) return { i: r, v: p } } return { i: -1, v: void 0 } };
$jscomp.polyfill("Array.prototype.find", function(a) { return a ? a : function(a, f) { return $jscomp.findInternal(this, a, f).v } }, "es6", "es3");
$jscomp.polyfill("Array.prototype.flat", function(a) {
    return a ? a : function(a) {
        a = void 0 === a ? 1 : Number(a);
        for (var f = [], e = 0; e < this.length; e++) {
            var g = this[e];
            Array.isArray(g) && 0 < a ? (g = Array.prototype.flat.call(g, a - 1), f.push.apply(f, g)) : f.push(g)
        }
        return f
    }
}, "es9", "es5");
var babel = function(a) {
        if (a.loadLib) return a;
        a.loadLib = !0;
        a.no = a.ez = a.non = a["n\u00e3o"] = a.falso = a["false"] = a.fals = a.gezurra = a.faux = a.fals = "false";
        a["s\u00ed"] = a.yes = a.bai = a.oui = a.si = a.sim = a.verdadero = a["true"] = a.veritable = a.egia = a.vrai = a.verdadeiro = a.veritable = "true";
        a.negro = a.black = a.negre = a.beltza = a.noir = a.preto = a["#000000"] = "#000000";
        a.maxenta = a.magenta = a["#ff00ff"] = "#ff00ff";
        a.azul = a.blue = a.blau = a.urdina = a.bleu = a["#0000ff"] = "#0000ff";
        a.turquesa = a.cyan = a.turkesa = a.turquoise = a["#00ffff"] = "#00ffff";
        a.verde = a.green = a.verd = a.berdea = a.vert = a["#00ff00"] = "#00ff00";
        a.amarillo = a.yellow = a.groc = a.horia = a.jaune = a.amarelo = a["#ffff00"] = "#ffff00";
        a.naranja = a.orange = a.taronja = a.laranja = a.laranxa = a["#ffc800"] = "#ffc800";
        a.rojo = a.red = a.vermell = a.gorria = a.rouge = a.vermello = a.vermelho = a["#ff0000"] = "#ff0000";
        a.pink = a.rosa = a.arrosa = a.rose = a["#ffafaf"] = "#ffafaf";
        a.grisObscuro = a.darkGray = a.grisFosc = a["gris iluna"] = a.grisObscur = a.grisEscuro = a.cinzaEscuro = a["#404040"] = "#404040";
        a.gris = a.gray = a.grisa = a.cinza = a["#808080"] =
            "#808080";
        a.grisClaro = a.lightGray = a.grisClar = a["gris argia"] = a.grisClair = a.cinzaClaro = a["#c0c0c0"] = "#c0c0c0";
        a.blanco = a.white = a.blanc = a.zuria = a.branco = a["#ffffff"] = "#ffffff";
        a.escala = a.scale = a.eskala = a["\u00e9chelle"] = "scale";
        a.nombre = a.name = a.nom = a.izena = a.nome = "name";
        a.ikusgai = a["vis\u00edvel"] = a.visible = "visible";
        a.rastro = a.trace = a.rastre = a.arrastoa = "trace";
        a.fondo = a.background = a.fons = a.hondoa = a.fond = a.fundo = "background";
        a["par\u00e1metro"] = a.parameter = a.parametroa = a["par\u00e2metro"] = a["par\u00e0metre"] =
            "parameter";
        a["sucesi\u00f3n"] = a.sequence = a["successi\u00f3"] = a.segida = a.succession = a["seq\u00fc\u00eancia"] = "sequence";
        a["tama\u00f1o"] = a.size = a.neurria = a.taille = a.tamanho = a["grand\u00e0ria"] = "size";
        a.decimales = a.decimals = a.hamartarra = a["d\u00e9cimales"] = a.decimais = "decimals";
        a.red = a.net = a.xarxa = a.sarea = a["r\u00e9seau"] = a.rede = a.malha = "net";
        a.red10 = a.net10 = a.xarxa10 = a.sarea10 = a["r\u00e9seau10"] = a.rede10 = a.malha10 = "net10";
        a.ejes = a.axes = a.eixos = a.ardatzak = a.eixes = "axes";
        a["cr\u00e9ditos"] = a.about =
            a["cr\u00e8dits"] = a.kreditoak = a["cr\u00e9dits"] = a.sobre = "about";
        a.config = a.konfig = a["configura\u00e7\u00e3o"] = "config";
        a.inicio = a.init = a.inici = a.hasiera = a.commencement = a["in\u00edcio"] = "init";
        a.limpiar = a.clear = a.neteja = a.ezabatu = a.nettoye = a.limpar = "clear";
        a.incr = a.gehi = a.incremento = "incr";
        a.min = a.inf = "min";
        a.max = a.sup = a["m\u00e1x"] = "max";
        a.relleno = a.fill = a.ple = a.betea = a.plein = a.recheo = a.preencher = "fill";
        a["relleno+"] = a["fill+"] = a["ple+"] = a["betea+"] = a["plein+"] = a["recheo+"] = a["preencher+"] = a.fillP =
            "fillP";
        a["relleno-"] = a["fill-"] = a["ple-"] = a["betea-"] = a["plein-"] = a["recheo-"] = a["preencher-"] = a.fillM = "fillM";
        a.flecha = a.arrow = a.fletxa = a.gezia = a["fl\u00e8che"] = a.frecha = a.seta = "arrow";
        a.punta = a.spear = a.muturra = a.pointe = a.ponta = "spear";
        a["regi\u00f3n"] = a.region = a["regi\u00f3"] = a.eskualde = a["r\u00e9gion"] = a["rexi\u00f3n"] = a["regi\u00e3o"] = "region";
        a.norte = a.north = a.nord = a.ipar = "north";
        a.sur = a.south = a.sud = a.hego = a.sul = "south";
        a.este = a.east = a.est = a.ekialde = a.leste = "east";
        a.oeste = a.west = a.oest = a.hegoalde =
            a.ouest = "west";
        a.exterior = a.external = a.kanpoalde = a.externo = "external";
        a["expresi\u00f3n"] = a.expresion = a["expresi\u00f3"] = a.adierazpen = a["express\u00e3o"] = "expresion";
        a.tipo = a.type = a.tipus = a.mota = "type";
        a["posici\u00f3n"] = a.position = a["posici\u00f3"] = a.posizio = a["posi\u00e7\u00e3o"] = "position";
        a["constricci\u00f3n"] = a.constraint = a["constricci\u00f3"] = a.beharte = a.constriction = a["constrici\u00f3n"] = a["restri\u00e7\u00e3o"] = "constraint";
        a.valor = a.value = a.balio = a.valeur = "value";
        a["ecuaci\u00f3n"] = a.equation =
            a["equaci\u00f3"] = a.ekuazio = a["\u00e9quation"] = a["equa\u00e7\u00e3o"] = "equation";
        a.curva = a.curve = a.corba = a.kurba = a.courbe = "curve";
        a.texto = a.text = a.testu = a.texte = a.testua = "text";
        a.punto = a.point = a.punt = a.puntu = a.ponto = a.dot = "point";
        a.segmento = a.segment = a.zuzenki = "segment";
        a.arco = a.arc = a.arku = "arc";
        a["pol\u00edgono"] = a.polygon = a["pol\u00edgon"] = a.poligono = a.polygone = "polygon";
        a.imagen = a.image = a.imatge = a.irudi = a.imaxe = a.imagem = a.bg_image = a.irudia = a.imagem_de_fundo = a.irundia = "image";
        a["Versi\u00f3n"] =
            a.Version = a["Versi\u00f3"] = a["Vers\u00e3o"] = a.version = "version";
        a.Idioma = a.Language = a.Hizkuntza = a.Langue = a.language = "language";
        a["O.x"] = "O.x";
        a["O.y"] = "O.y";
        a.Botones = a.Buttons = a.Botons = a.Botoiak = a.Boutons = a["Bot\u00f3ns"] = a["Bot\u00f5es"] = a.Botons = "Buttons";
        a["Animaci\u00f3n"] = a.Animation = a["Animaci\u00f3"] = a.Animazio = a["Anima\u00e7\u00e3o"] = "Animation";
        a.constante = a.constant = a.Konstante = "constant";
        a.fuente = a.font = a.iturri = a.source = a.fonte = "font";
        a["num\u00e9rico"] = a.numeric = a["num\u00e8ric"] = a.zenbakizko =
            a["num\u00e9rique"] = "numeric";
        a["gr\u00e1fico"] = a.graphic = a["gr\u00e0fic"] = a.grafiko = a.graphique = "graphic";
        a.hacer = a["do"] = a.fer = a.egin = a.faire = a.facer = a.fazer = a.doExpr = "doExpr";
        a.mientras = a["while"] = a.mentre = a.bitartean = a["tandis que"] = a.mentres = a.enquanto = a.whileExpr = "whileExpr";
        a.evaluar = a.evaluate = a.avalua = a.ebaluatu = a["\u00e9valuer"] = a.avaliar = "evaluate";
        a.variable = a.aldagaia = a["vari\u00e1vel"] = "variable";
        a["funci\u00f3n"] = a["function"] = a["funci\u00f3"] = a.funtzio = a.fonction = a["fun\u00e7\u00e3o"] =
            "function";
        a.algoritmo = a.algorithm = a.algorisme = a.algorithme = "algorithm";
        a.vector = a.array = a.bektore = a.vecteur = a.matriz = "array";
        a["dibujar-si"] = a["draw-if"] = a["marraztu-baldin"] = a["dessiner-si"] = a["debuxar-se"] = a["desenhar-se"] = a["dibuixa-si"] = a.drawif = "drawif";
        a.dominio = a.range = a.domini = a["izate-eremua"] = a.domain = a["dom\u00ednio"] = "range";
        a.pausa = a.delay = a.eten = "delay";
        a["eje-x"] = a["x-axis"] = a["eix-x"] = a["x-ardatza"] = a["axe-x"] = a["eixe-x"] = a["eixo-x"] = a.x_axis = "x_axis";
        a["eje-y"] = a["y-axis"] = a["eix-y"] =
            a["y-ardatza"] = a["axe-y"] = a["eixe-y"] = a["eixo-y"] = a.y_axis = "y_axis";
        a["n\u00fameros"] = a.numbers = a.nombres = a.zenbakiak = "numbers";
        a["exponencial-si"] = a["exponential-if"] = a["esponentzial-baldin"] = a["exponentiel-si"] = a["exponencial-se"] = a.exponentialif = "exponentialif";
        a.familia = a.family = a["fam\u00edlia"] = a.famille = "family";
        a.intervalo = a.interval = a.tarte = a.intervalle = "interval";
        a.pasos = a.steps = a.passos = a.pausoak = a.pas = "steps";
        a.centro = a.center = a.centre = a.zentro = "center";
        a.radio = a.radius = a.radi = a.erradio =
            a.rayon = a.raio = "radius";
        a.fin = a.end = a.fi = a.bukaera = a.fim = "end";
        a["una-sola-vez"] = a["only-once"] = a["una-sola-vegada"] = a["behin-bakarrik"] = a["une-seule-fois"] = a["unha-soa-vez"] = a["apenas-uma-vez"] = a.onlyOnce = "onlyOnce";
        a.siempre = a.always = a.sempre = a.beti = a.toujours = "always";
        a["color-int"] = a["int-colour"] = a["barruko-kolore"] = a["couleur-int"] = a["cor-int"] = a.colorInt = "colorInt";
        a.repetir = a.loop = a.repeteix = a.errepikatu = a["r\u00e9p\u00e9ter"] = "loop";
        a.controles = a.controls = a.kontrolak = a["contr\u00f4les"] =
            a.controis = "controls";
        a.animar = a.animate = a.anima = a.animatu = a.animer = "animate";
        a.auto = "auto";
        a.y = a.top = "y";
        a.espacio = a.space = a.espai = a.espazio = a.espace = a.espazo = a["espa\u00e7o"] = "space";
        a.Nu = "Nu";
        a.Nv = "Nv";
        a.alto = a.height = a.alt = a.altu = a.haut = a.altura = a["al\u00e7ada"] = a.hauteur = a.alto = "height";
        a.ancho = a.depth = a.amplada = a.zabalera = a.largeur = a.profundidade = a.amplada = a.width = a.ample = a.large = a.largura = "width";
        a.largo = a.length = a.llargada = a.luzera = a.longueur = a.longo = a.comprimento = a.llargada = "length";
        a.color_reverso =
            a.backcolor = a.color_revers = a["atzealde kolorea"] = a.couleur_revers = a.cor_reverso = a.cor_de_fundo = "backcolor";
        a.aristas = a.edges = a.arestes = a.ertzak = a["ar\u00eates"] = a.arestas = "edges";
        a.rotini = a.inirot = "inirot";
        a.posini = a.inipos = "inipos";
        a["tri\u00e1ngulo"] = a.triangle = a.hirukia = a["tri\u00e2ngulo"] = "triangle";
        a.cara = a.face = a.aurpegi = "face";
        a.polireg = a.regpoly = a["pol\u00edgonoRegular"] = "polireg";
        a.superficie = a.surface = a["superf\u00edcie"] = a.azalera = "surface";
        a.cubo = a.cube = a.cub = a.kubo = "cube";
        a["paralelep\u00edpedo"] =
            a.box = a["paral\u00b7lelep\u00edpede"] = a.paralelepipedo = a["parall\u00e9l\u00e9pip\u00e8de"] = "box";
        a.cono = a.cone = a.con = a.kono = a["c\u00f4ne"] = "cone";
        a.cilindro = a.cylinder = a.cilindre = a.zilindro = a.cylindre = "cylinder";
        a.esfera = a.sphere = a["sph\u00e8re"] = "sphere";
        a.tetraedro = a.tetrahedron = a.tetraedre = a["t\u00e9tra\u00e8dre"] = "tetrahedron";
        a.octaedro = a.octahedron = a.octaedre = a.oktaedro = a["octa\u00e8dre"] = "octahedron";
        a.dodecaedro = a.dodecahedron = a.dodecaedre = a.dodekaedro = a["dod\u00e9ca\u00e8dre"] = "dodecahedron";
        a.icosaedro = a.icosahedron = a.icosaedre = a.ikosaedro = a["icosa\u00e8dre"] = "icosahedron";
        a.elipsoide = a.ellipsoid = a["el\u00b7lipsoide"] = a["ellipso\u00efde"] = a["elips\u00f3ide"] = "ellipsoid";
        a.macro = a.makro = "macro";
        a.id = "id";
        a.modelo = a.model = a.eredu = a["mod\u00e8le"] = "model";
        a.color = a.kolore = a.couleur = a.cor = a.colour = a.kolorea = "color";
        a.luz = a.light = a.llum = a.argia = a["lumi\u00e8re"] = "light";
        a.metal = a.metall = a["m\u00e9tal"] = "metal";
        a.alambre = a.wire = a.filferro = a.alanbre = a["fil de fer"] = a.arame = "wire";
        a.cortar =
            a.split = a.talla = a.moztu = a.couper = a.dividir = "split";
        a.despliegue = a.render = a.desplegament = a.zabaltze = a["d\u00e8ploiement"] = a.despregamento = a.processar = "render";
        a.orden = a.sort = a.ordre = a.ordena = a.orde = a.ordenar = "sort";
        a.pintor = a.painter = a.margolari = a.peintre = "painter";
        a["trazado de rayos"] = a["ray trace"] = a["tra\u00e7at de raigs"] = a["izpi trazadura"] = a["trace de rayons"] = a["trazado de raios"] = a["tra\u00e7ado de raios"] = a.raytrace = "raytrace";
        a.despl_imagen = a.bg_display = a.despl_imatge = a["irudi desplazamendu"] =
            a.despl_image = a.despr_imaxe = a["apresenta\u00e7\u00e3o_de_imagem"] = "bg_display";
        a["arr-izq"] = a.topleft = a["dalt-esq"] = a["goi-ezk"] = a["au-dessus-gau"] = a["arr-esq"] = a["acima-esquerda"] = "topleft";
        a["expand."] = a.stretch = a.hedatu = a["expandir "] = "stretch";
        a.mosaico = a.patch = a.mosaic = a.mosaiko = a["mosa\u00efque"] = "patch";
        a.centrada = a.zentratu = a["centr\u00e9e"] = a.centrado = a.imgcenter = "imgcenter";
        a.archivo = a.file = a.fitxer = a.artxibo = a.fichier = a.arquivo = "file";
        a.filas_norte = a.rows_north = a.files_nord = a["HTML kodea"] =
            a.files_nord = a.filas_norte = a.linhas_norte = a.files_nord = a.rowsNorth = "rowsNorth";
        a.filas_sur = a.rows_south = a.files_sud = a.ipar_lerro = a.files_sud = a.filas_sur = a.linhas_sul = a.files_sud = a.rowsSouth = "rowsSouth";
        a.ancho_este = a.width_east = a.ample_est = a.hego_lerro = a.ample_est = a.ancho_leste = a.largura_leste = a.ample_est = a.widthEast = "widthEast";
        a.ancho_oeste = a.width_west = a.ample_oest = a.ekialde_zabalera = a.ample_ouest = a.ancho_oeste = a.largura_oeste = a.ample_oest = a.widthWest = "widthWest";
        a.fijo = a.fixed = a.fix = a.hegoalde_zabalera =
            a.fixe = a.fixo = "fixed";
        a["Reiniciar Animaci\u00f3n"] = a["Init Animation"] = a["Reinicia Animaci\u00f3"] = a.finko = a["Recommencer l'Animation"] = a["Reiniciar Anima\u00e7\u00e3o"] = a.initAnimation = "initAnimation";
        a["Explicaci\u00f3n"] = a.Explanation = a.Azalpena = a.Explication = a["Explica\u00e7\u00e3o"] = a["Explicaci\u00f3"] = "Explanation";
        a.tooltip = a.dica = "tooltip";
        a.discreto = a.discrete = a.discret = a.diskretu = "discrete";
        a.interfaz = a.gui = a["interf\u00edcie"] = a.interfaze = a["interface"] = "gui";
        a.pulsador = a.spinner = a.polsador =
            a.pultsadore = a.bouton = "spinner";
        a["campo de texto"] = a.textfield = a["camp de text"] = a["testu esarrua"] = a["champ de texte"] = "textfield";
        a["men\u00fa"] = a.choice = a.menu = a.escolha = "menu";
        a.barra = a.scrollbar = a.barre = "scrollbar";
        a.opciones = a.options = a.opcions = a.aukerak = a["opci\u00f3ns"] = a["op\u00e7\u00f5es"] = "options";
        a.interior = a.barruko = a["int\u00e9rieur"] = "interior";
        a["condici\u00f3n"] = a.condition = a["condici\u00f3"] = a.baldintza = a["condi\u00e7\u00e3o"] = "condition";
        a["acci\u00f3n"] = a.action = a["acci\u00f3"] =
            a.ekintza = a["a\u00e7\u00e3o"] = "action";
        a.evento = a.event = a.esdeveniment = a.gertaera = a["\u00e9v\u00e9nement"] = "event";
        a["abrir URL"] = a["open URL"] = a["obre URL"] = a["URL zabaldu"] = a["ouvrir URL"] = a.openURL = "openURL";
        a["abrir Escena"] = a["open Scene"] = a["obre Escena"] = a["eszena zabaldu"] = a["ouvrir Escena"] = a["abrir Cena"] = a.openScene = "openScene";
        a["bot\u00f3n"] = a.button = a["bot\u00f3"] = a.botoi = a.bouton = a["bot\u00e3o"] = "button";
        a.mensaje = a.message = a.mezua = a.mensaxe = a.mensagem = a.missatge = "message";
        a.alternar =
            a.alternate = a.alterna = a.txandakatu = a.alterner = "alternate";
        a["ejecuci\u00f3n"] = a.execution = a["execuci\u00f3"] = a.gauzatze = a["ex\u00e9cution"] = a["execuci\u00f3n"] = a["execu\u00e7\u00e3o"] = "execution";
        a.calcular = a.calculate = a.calcula = a.kalkulatu = a.calculer = "calculate";
        a.coord_abs = a.abs_coord = a.koor_abs = "abs_coord";
        a.negrita = a.bold = a.negreta = a.lodi = a["caract\u00e8re gras"] = a.negra = a.negrito = "bold";
        a.cursiva = a.italics = a.etzana = a.italique = a["it\u00e1lico"] = "italics";
        a.subrayada = a.underlined = a.subratllat =
            a.azpimarratua = a.soulignement = a["subli\u00f1ada"] = a.sublinhado = "underlined";
        a.pos_mensajes = a.msg_pos = a.pos_missatges = a.mezuen_pos = a.pos_messages = a.pos_mensaxes = "msg_pos";
        a.izquierda = a.left = a.esquerra = a.eskerrean = a.gauche = a.esquerda = a.esquerda = a.esquerra = a.x = "x";
        a.derecha = a.right = a.dreta = a.eskuinan = a.droite = a.dereita = a.direita = a.dreta = "right";
        a["sensible_a_los_movimientos_del_rat\u00f3n"] = a.sensitive_to_mouse_movements = a["sensible_als_moviments_del_ratol\u00ed"] = a["xagu mugimenduarekiko sentikorra"] =
            a.sensible_aux_mouvements_du_souris = a.sensible_aos_movementos_do_rato = a["sens\u00edvel_aos_movimentos_do_mouse"] = "sensitive_to_mouse_movements";
        a.reproducir = a.play = a.reprodueix = a.erreproduzitu = a.reproduire = a.reproduzir = a.playAudio = "playAudio";
        a["activo-si"] = a["active-if"] = a["actiu-si"] = a["altiboa-baldin"] = a["actif-si"] = a["activo-se"] = a["ativo-se"] = a.activeif = "activeif";
        a.rotfin = a.finrot = a.bukrot = a.endrot = "endrot";
        a.posfin = a.finpos = a.bukpos = a.endpos = "endpos";
        a.editable = a.editagarria = a["edit\u00e1vel"] =
            "editable";
        a.R2 = "2D";
        a.R3 = "3D";
        a.vectores = a.bektoreak = a.vecteurs = a.vetores = a.vectors = "vectors";
        a["fuente puntos"] = a["font size"] = a["font punts"] = a["puntu iturria"] = a["source points"] = a["fonte puntos"] = a["fonte pontos"] = a.font_size = "font_size";
        a.escenario = a.scenario = a.escenari = a.agertoki = a["sc\u00e8ne"] = a["cen\u00e1rio"] = "scenario";
        a.cID = "cID";
        a.matriz = a.matrix = a.matriu = a.matrice = "matrix";
        a.filas = a.rows = a.files = "rows";
        a.columnas = a.columns = a.colonnes = "columns";
        a.solo_texto = a.only_text = a.seulement_texte =
            a["s\u00f3_texto"] = a.tan_sols_texte = a.onlyText = "onlyText";
        a.respuesta = a.answer = "answer";
        a.peso = a.weight = a.pes = "weight";
        a.decimal_symbol = a["signo decimal"] = a["decimal symbol"] = "decimal_symbol";
        a.info = "info";
        a.library = "library";
        a.color_contorn_text = a.color_text_border = a.color_borde_texto = a.muga_testuaren_kolorea = a.couleur_contour_texte = a.cor_borde_texto = a.colore_bordo_testo = a.cor_borda_texto = a.color_contorn_text = a.border = "border";
        a.video = a["vid\u00e9o"] = "video";
        a.audio = a["\u00e0udio"] = "audio";
        a.autoplay =
            "autoplay";
        a.poster = "poster";
        a.opacidad = a.opacity = a["opacit\u00e9"] = a.opacitat = a.opacidade = "opacity";
        a.alinear = a.align = a["ali\u00f1ar"] = a.aligner = "align";
        a.anchor = "anchor";
        a.a_left = "left";
        a.a_center = "center";
        a.a_right = "right";
        a.a_justify = "justify";
        a.a_top_left = "top_left";
        a.a_top_center = "top_center";
        a.a_top_right = "top_right";
        a.a_center_left = "center_left";
        a.a_center_center = "center_center";
        a.a_center_right = "center_right";
        a.a_bottom_left = "bottom_left";
        a.a_bottom_center = "bottom_center";
        a.a_bottom_right =
            "bottom_right";
        a.malla = a.mesh = "mesh";
        a.local = a.Local = "local";
        a.rectangle = a["rect\u00e1ngulo"] = "rectangle";
        a.lineDash = "lineDash";
        a.solid = "solid";
        a.dot = "dot";
        a.dash = "dash";
        a.dash_dot = "dash_dot";
        a.offset_dist = "offset_dist";
        a.offset_angle = "offset_angle";
        a.flat = "flat";
        a.borderColor = "borderColor";
        a.text_align = "text_align";
        a.image_align = "image_align";
        a.checkbox = "checkbox";
        a.torus = a.toro = "torus";
        a.R = "R";
        a.r = "r";
        a.border_radius = "border_radius";
        a.radio_group = "radio_group";
        a.font_family = "font_family";
        a.resizable =
            "resizable";
        a.antialias = "antialias";
        a.image_loader = "image_loader";
        a.expand = "expand";
        a.cover = a.cubrir = "expand";
        a.fit = a.escalar = "fit";
        a.code = "code";
        a.doc = "doc";
        a.image_dec = "image_dec";
        a.image_inc = "image_inc";
        a.btn_pos = "btn_pos";
        a.border_width = "border_width";
        a.border_color = "border_color";
        a.v_left = "v_left";
        a.v_right = "v_right";
        a.h_left = "h_left";
        a.h_right = "h_right";
        a.h_left_right = "h_left_right";
        a.label_color = "label_color";
        a.label_text_color = "label_text_color";
        a.shadowColor = "shadowColor";
        a.shadowBlur = "shadowBlur";
        a.shadowOffsetX = "shadowOffsetX";
        a.shadowOffsetY = "shadowOffsetY";
        a.border_size = "border_size";
        a.clip = "clip";
        a.extra_style = "extra_style";
        return a
    }(babel || Object.create(null)),
    descartesJS = function(a) {
        if (a.loadLib) return a;
        a.arimoBFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.arimoBIFont = function() { return "data:font/woff2;charset=utf-8;base64,d09GMgABAAAAADxUABIAAAAAeygAADvrAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGiYbjmQcgVgGYACGNghiCZoWEQgKgZMc9AgLhBAAATYCJAOIHAQgBZZDB4g/DIEYG0toNWPcDR42DgCep83I2QgbNg6IGcu2RyJs9qKkyP7/jwdUDtdOBucEFixRJaV0osygUOaKrt2AK8a3o3xpKYqCnOhB21PyK4obmXK39bGPbg9yDcsz/kb4OwMlgNhSUnqxJIrESu4so+yk9ZPx4teeP4EjSPTmU47eb++lI/3aH6GxT+ouefhvrc/7XlV1z/8hUACkFtRuJBDND7PMRuWsjXAAIIkcsGPoqQOYW7egYgwYIwdsDNjIkaPHNqpGh0SP6EnFyNCmRSxSMLAKsV9R7PfV/1eMem5i8G/N4UWBCAKhpV+uVb1sbNcpzCyrU4BPbAP0O4FKZ/ZqTspXBEdu1uwywBqiESNmROxEtXut+r901RXl+31rulegzQVlAY0kY35uJtktAM/dF67gUPVV2L4o2/L/6qwWUNK3J5tjqKorOjly4IbwCDJRY89cZWc6IlqGL8m3ORp4/XVr2VL/XGpb7bnsEOSRuZ1Wv4onBIaxQIW6fwNFCaRmlQuQHaAPDukzSUH5UVGnqNVVI4cf1jLo/khdBBmpZHoiAmODyb2lGuh1mZcCeAklwjbQCWDfrkwt0+nFTfEgz2ckf0bmXarc+PBTRdGid2YxPbNLYgGCWizOwLzB0twR4J3o3gAgTg/yvc9kXUiA9wZ8SzljMuNTKchcplCVGxvGikz2yuQjBVmmIBQ84X6r907QWqlpX9kwqUSaWAiRUDrwxN+K63VeIJGF4TfuohlLb9AosXBxCZbHASbwEIgkltFkqt2MZ0N0eaQtnS4+psN8pIixWqpZcO1yY+IzQmesIHRu9Z39vWrtjbhjDS+GjATCQHDufvtwuz9pCMDHG1FfAK8fXXsAwCdH60xBAJsC21OFhIAKQUBAA8lx8aFYxlECfcEtpQXFS7L1DrTm8aKA8eXRNYItNLjFdLJ6fMRSkJddVCJIFiMHsv4PCAOzG5V7xwqIGIOU6bLAxpEsV6cDEKYuOSNat1nXvDVO/DVkwzDcHydCIi/aY/qES3EvPqX07QunatIzLMtyV57O50WQmEIWcZT+4m2TKOwSU8pKfzlebpX3VRStVRk1ohbVbkjr91jboSDIQJAEIqEG2YPSEBTqLg1Io1A3gF9oztmPX+bwm9Uvt7J5pzxFqlzmV7S18/gdHiA9ed2xPkLfv8mg6yOGoUG3dV0m6LxFyFWj04OQDnZURcODdabCYGI/yro/hCDbkwhA5WS+kaXE9M5nnepRpLoKDIhYoJ0/HOIbNCuWWvwNmGCIDDL3EJ3AuoAhNZO0EzCkQqAKRDImYtYRm8CZ3HPwJf8EARAEIRRG9RKkOpP0RhgCFVIl9DDGZA4dRZZdkXjIkx4/CfjwEB7C+yd8qKVilHnxJOA/aT75CXAgCIILCC6VhGSM1vAXcBTJd14aiiwiHQZoTJmzRGfNhb9gIcKeryf1lZogJgyHrDt7orZSjcgLLggZJKfy6QqA5HIUYdIUCBqYAIxQIYYZUJTmOcveiX144hlFk7J7NJI7DxDdP+sYcfuoGpVLBAi3/kajGkrJ7JByU0LKjJsjxYTQSCRSBIneJNq9FURm7fpBOuqYFy9BHWGXv60vfII22sbsuYB49YtXAHV14wG7QAeDY2+H6II4oDMIcy46pIG1Lh9PZWX2OmDUlLOu+8tzH/zyB2EUBdGe5nkuH5WysruMlYtlo/xbPu1yDaF+l5ZdJsUu7mIX8xs/7pDzbtr0yr8/j24re8vhXVcTcgnNH8c/W6Cv9JOgL/b5PteP96P9SJ/tvG7VNRZl08dfD//fNZEnrUltkv3/288vm7dvFpvXm23Aaozg/IXB61PEiBUnUZIdpAmmqDjYbVFociRkp5CspnczEubPcVFixEmQJEUahgwsWXLk4SjAU6REmQpVagjUadBERKKFTJsOXRRUevQZMGTEGI0JU2bMWbhKyIrfPhu27NhzwOCIiYXNiTMXrtzOs9fPkxdvPnz54fAXIFDQtUWh/PEPFyFSlGjgLuBuO9Vr0alHt179+oD7DRk0bMRuu+yx1z4H7HfQ2HmzfNK0Q8BlouLg/tfY5SoJ6D7wy/2rE/hi5yW4rtc/qEiMHUg8NTyX9/IXxco0iw0PvPTHHQExEP61+oN1h0olqvDUqFWnWqMm4F7tOrSZddwJyY6X6TqHVh3w2G4Vr62B7e1KB4tTRtuFZ+vu73LlGQUCEw/WPqfV5VybtO5pz+nFVzFmQzMPGAh4jStJ2voH9uMWxv2nyHxO5zXPVF5foNr/Z0EFkrGNnPfAJ3BsywMQYA4NBCThrIFCE/H/GvSfho4TxyvjFYxL9GiaDj9Hb96Vjw0P1//hwauDtTG98ZpUHcv9hA5Jw7assR47sf+zNFNZFzsTlAud0FosrCVbZnK6lxzEYmhAqabL+7xBg1YEaj8ROvcjugQMCc77BAkbEObNa1L1OIjEYD2XO05DaDiU0U7+5K2nSvL3jVbHxSboD2Led/1hipZ8Egf3sdGuWDLvozXowOSjAahIzFAmSiaAaz00nrWUDCH6aYhM6G8ukRz/wyAWu8JBmLbn8rK6NYbBrANXwkMvO+Otx8ETHgrETCuBmrOZUo80kSoLBTkPksw5EMjulJre8u7Pjcwa0KgAWLHCFBbmng6ypp1G78ynh77BQqW5U/44yg02BiVEiptZU2soIZlowBNY9m3KgXDLY4H+YZCUelSzg1nlh7JPma3nYus4VkyX0+3vH5TZD+UVJx/EraNm4PyQCI7to4JzfKKcuAQSBRxLhZmkGqpqgbUAMjKh6axryc0FNZR19z4LJ2+/uCvP2RhNidOZnVBcw0JKaRPcTp1Y73YrQGDLEAJ7A3Fk+yMd4FwFenoccSRoBSkBIdAwKEOi3173PLTgHMqPf7/U52tsfis1hKgQPGqIkkVYbFGWsTSWtZDlLJ3lLYMVLJMVLcZKFt/XhVHeFyPcOo6mFvI5Ouy+u/fEULzt5/H7Q61tv6/WZZyjwkyDCpQhwXNWtSirWRqrW8gals6alsFalsnaFmMdi1cHUMdRNqzPeKGWbB39gHqdZeCnmRSGskGdtlfKCNKaHFixfs6SYefPamc4G8uNjcmI0anqLlqJT9PgzISUzp6qTqFXUGnmcgl4kXDNEJOMj41DnKWWnLyzuTp10cBeKXOo05q2IXDM30YNC7TXuoZlvQxETaVduEKlweiO2i4C6mOitlHWR/KY7BVHLqkulDAsHYkuPwz1GwBiXASoI6fO+nA+mpZUpK5snD+RzXG1YjJggY0i8SNiLDy4xZ90czFxcdJfzKcQRacYVeoNQ1vNvCZDUedIJnJGD8o8MTT2k5aiL3IrnaNY2+Zb6k0Cva32c85gXIWqdhRcYtYfbetkpM4WKOjaj9vWiEBvjFENkpqdONmk5tTUsEUBicjrfj20bu7z0HYO9pxaBUpEx43uPO4MRJK7GF5iq868++VuakFy8Q8MNVZtZHZhuRU5LZ2kxa9Hd/eReHdH5+V/2+G6ts3sYdMtgbbctsu47w5TVJfamrrwkfGE+yc9dPvnfNCt48Yv9CHYMGlLj8CmlWTT+dalLBv16kC2pNocDxf9knvkZGjqsrzNCSydoDLThFrPQQb/Qaz5LBqA8em5O5tz3jvyPsFjp/tg4xEFdGbYU97bX2lEesBw7kWju9rdAGHcX9JG89MsF9dLVCBvWxaV/sqer2Zy/QviFVOr1VKPSNrdgL9brpcPtxioUAK9w1HiThA8lX07qUFCDpFApC7x4CdN2LyyGalOEWom1/vatFEhN1GBlsnt/Lja4Vi7HGuP49y3UzrgTIec6YizMg4Jt0nSZYoEZqbMkcDClCUSWJnbelDpDl7ZGFuY3reweVfilYLr9x+XsMshYMeAnM70Hjn7c/EvV1Q9bs1WuQfkEZDnmdrj5eXt5ePl20B+AfkH5gmGI/WR+ch9FA2kDIga/4J8faHDkb6o9mH8Zn+/S+PhxzP4fxsI0buGGAG5OYgdwdYGYKcaUI4F+dRXuEOgdMepaLJ21LozQaWLo430L+x4xVgJPJ/cgJTT9KKV2zkvESL89CrFaeWQjakqapg4RCtSaZbLSFswyqbuee4DyW01uwQh4Ppxc3BXF0O9VQxE63Fplt6FFRhb+3DS1k5DDtT7VorY4TxEFaqeclEoR1nKYN+XzZHUmnU3SGwX0Vw+h8r4EjItkDyxpBIthaEyLBG6lqy6rkxZ0bQUFwyZiUZqR245UkWZb7hZRHQUzvKhbWeydjjNO8WRSHH0OdupB2D3WzXQdRUaNR99m3GOUpNYlcgqUQKmPZnIGKpRghVCCQSh2zARqHylKgYlQpkjYtYTQ0fEhqEwDmXx2cYsWZSNza6XxF5YmqeNmHNbFWvBSZtxprmgWqzwJNnIczm0Y2YqRFSqaSt6aeflMFjaJgRLg0qXOqIkMBohiR+mCgXqrLSObGIkTkTrXKtQkj7CAvTNmHB4ZpMqVT4o24vuoXjR1/FF19jBe0/aBtLITz0UBR4jr1KQYXb4jxphMCuoUmF+Tahze7fYNOlMa31ma4MdZBXCJY6kM+RRyntzhXV3FjLqr4n6I7EInmx96BgyVy/6fG2ngHvBcxKA/2OSsr/uf8/dV3qawW/XHy+RpXD4gyWY2JqTotdnhrpLSdrtu1KXpG9Z6KrC3Gu5sEH39ZVLavIwbeKIESwLm63QfTz+hrmxHvR1moIE2QMVBLBUVIABiBh7YubOmK/jFHBne3nhRUuRa0+5tR5jtG0jxlmU1+XeikGtzaHdwCZHZG5XlNcJ0bm9xck2X68ld1mwRIJR5H4BxmApAllo6mM4626Fsdigr9utSms9+5ZaaN7AhBbp6yjVp+OaptZzaZfImdHMk70W8HwRehwRnyQZM4VwO6xjbKbJkkRLLXJ9AFk6raS1u7jBQhTwrAsUJ2vRBRE/pUFrxz1LzvKU/TtFbDgbHy7I3On8jK+Yh4h4DLHkC3SGrv/5aQNVBG/FKKR6cbPq54DyjIRqqutXhOF43fmvPK/aKlFuXgzTV4apm7ea9qPftwEKbRfdCarJfX1cUHSYHPrt2UBdylJGyHO1QNtOlTjar7Blcdoi3BqkiBk0relytu8Z0+E4OIhFVGo2xRsftkq13qd8gt6SWsbpGjbS+zMEvhkRzziK1IalMcjzMDLy+Ld5NyVf3HHCS68PUYOEvkYEEztiXK0pabgAor0MRinjZfnxGYc20FdiP6FFjDX1/CG/w0XjEhtxZkmRNSy1Pha7nJYtosq0S0MPJF8mqA51ZT4+DxAS04qpr+HWBpg5xrpVWuvVhaUdBqrhr9GAFXuZqSlmkZGaIifq6n18D9NvB5AtjgPF00iDNswt9eB4hoAfsidtYonFnmVkEsf3hwDHQj6KnsieavChEfgqt6pYYZziy8te4ub7GFo1cFHHlmrZtV1azsFuA1i8LtKSGLIxlTaYAcpyNHcFEMmyrK8lvI346Ybj6w/T5Furo4m9wBSls/ByQhqubcnthSEJh/hdCrQb/TZk/KD93TAo3Oj7lsq2cqtgqhNeYYKUaJv+o0DJjH9JMx1NZVFkwnhFuBB+6inZzDIb4dOOEjAm2VVr5zxdBfWmV5Y9S0aKHgTduUSP76LGiF9AJI3NDRMhFK7jk8376ikXfqwXoezNCBP9Sl7XVM3WJtuQ735ILelUXTPfD1MuZtiy9vig4F6dcQHIVp3zSqDiK4amTIXzg6tS3N1lNbBRp2TFqsX2ycVuMg1bGh6EULpa4hcLu0DKmN9Ew6VCPVJ/wpvyiqAJQ2k0wrX+bCKc5RltNSAwLkiXPDcH2t6ItEDiLC+Mf9ky6j7SHHl4gN3+pLMZ7MlPvCkS5omorjugRovjjWFh/Oikr9Ftj5gxF481KLlWBDrfKZUQoQ+GIomDxAYcSas/C1GWSIDS6X6rhz9Bo6HSrmT79TwPd+qSdVqoVjNsmp5D3Dcm8TuTGH6xUeP29reMgtzodfSHVBHG0ojjA8u4t9tFvruf7penEvIGvy09YB/MUch56I6VcORU+uYj6N7+aWM7R1q7PVB9uBQzp3PHG3iwFoyc+uDA06BZSe1nY2W4kgGBaSdaTxiPnM+3QbVIfTHmROVWJRZEaHgiInr4RF1ntwtg9rjkfNpjY2JGsnAL36dEDR3ZSL5XvqjxbDWJW9GVJJ5vmKSXBydLcL2bAzJ3B/lFbvcnAzo77lXbODmyUaaVr9IqYU9Xyc56o4NwqJd1Zrvx9AcbCYmM9kevrO3yXsO3XnlwKIbdb1jJjFCoD0fZU7nD1tL3TXjCRIkpaSZ5JRnfTn1YuXj7UkJqnAiTGqoUqUpaCBq4EDRSPIFYTa+ZqYOuNKQTGFMXSpOM6+8XC7wpDhh5fSahJAzhXM9kg/UkD9ud1jCXWZ3HRbv+qfU2iXpdnlhHk5lb6ALE5nJrP64/hUna114W/XdZkOUfeucty6Iv9d11GFlpvPPa3xpKEJDhbdpAtmleJort1nvp7dZH5HYerDFephvhLfHseUaWczofeaO08POqDe8or6kWVTVOZRWvrpQUUR9dgJNrDycM9s0r7XDK71p+6STN6jTDCbCdP5sGeaQi3HxYL0979wM2xhPeaXt/Xk0nQ1Ma/WY6Gh5LbeZyonjlNiGil8guWsJ0DTftN8FpZMQ+6SzzDCD/okQFP4QmuZVxc1nWyHNCFmtsZZzu5Cg3G2uFg3li5IoKK7ynoXXKkO7JsMLKcj7NqTGOK/mzUSQvkhh73jxuRH6uFjFYm7wyBpnpohFElBWkT1aYrKACiFk2nxkixnKCHFGg6Wq4R1RHadB4QLSBAvC2Qe3y8nCag4dzTKCwAqw5s3pz//R+jsTp6+GuJbS5tjAQrLT/f3Uo7ZiZAuRRY8eQsK/ktGqfajkmj+D1U1zoT/94St7M+u7x3f1rROnuLgk6E8ZCgUnm0ck9Q3uIY9Tz+w6LQ25TxhrAJuD+9/Qdonj+cPuquQ2eCBrb6VhX9crQlKPUcJwSMVQwy3ccohFI5c2v2+cXiB7G6SKu75KW5QGwueBt7Dk/Mb7WNzK1sqXmbp7RtEniRdcA9p/eV335eHa58yZv3vwgJtLrxuYsI2RERGeulvid0AdeM1WB+olk2g4hh/XE2tof7g/fiV5XO+ypsx99Nvq905BkbCjESv9kol6XUiWj3ueMTlOwnOh5h9jfQqaD1e1OUttFXZcQdqCzube+gnlZeKcmfMmK2YHSMDQxdXJPrug6w6KNPVEXWzNz9teWWJhawOHNxwp14vQXecseaLUfiUh3tAkebiICxn4xcXQnxEFi3j1WePQlVvcR7b1+X4n9pRvMLkxd4MnexL3mdLGjuW1RKOrDHtknhZVHE/d9gX+5e3R6td6EYfen68OCDZK9JsPTlVbhy9JPpIa0keqc2brJUBCG496ffBAh3SW0Z9Ep0SVhHJoXvZKHDUsKxc3tq5w5zrWj2E8cM5WGnUa2xN1lIzu5vK3mpzluzh7s3Zg0OaAil4Wc65VY7SgSqHauHZi7Fys8TYQxfSMlPytDzTr//fNpf3lWCXMBwFfphzHMZSvs3Stx/WkvM/ahbZeMVNheq1A468wSsNfB8cX19CXZ6/0MyTIygu4gzVX/teRF9Bb+S2IbQqfuwQhLJj1tZ1XgXn8WXtDZjzJP3h7SjCJZ+C75+o5X/B+9jgHsrbutwV/liLSyeZ9HgU8BUguLn8Q+DWaCgD9B3iMPHXuv9sKBsZeiqLtamtU8mgSBJgH0IxFMt7td2z4lg14ltOa2+zxLBrqWWG7XO9/7VfT5VNCiGsT/2u/rbHNyM2W5gSPvgcp2ahV9jjCZqTZ9HZlV4B0gWimgI3loFpwrUQ7eIwQHj/cPEnfaHEbgStNQirxnENlEsRcNRltgwu110FGMqPoQsT8MmNw86qiz8w4+OLKWmtsDi6i3BRiuSQgHByxokJrHfDMsPLnn/YcTTx4nsLX6vJJsfHkPQoeyzt4WFDaxFz/PFOCtSaO3c62ndYtboYkD1dbnNfPKod7438qMlyDQ7f4nGdyYDWcflzuQ9jJ2+tqeSO2o4cc8WvBN+Hv6iKtdmsMTrUv2cq7TwMupzrgkepMA8UMWQeUI2sFOjbLY1wsRiSaNUyEcFoOa61QCyR6FuzweVdEs4l7bpHjQfsNGR32bZUaWYGak2E2pdkJTjq4jKGJ3PnT+LQ1m+6+IfVrhtxthO6y64LHAWTgyKo64kdppJrLLPjvA66BvUnwIaD7PeJvoePab9fztEwVtPzp/zBct38rsYsD7RAzmLvxj0fusl7/Jj6X2TdjnuKd5ZZTwyBEe3VBd/z3lUVFrAZj36v8v/NwB+nRD9b/Fg5s28djn90TuZ9BjddUh4Jrujl/Zsufj42lcW7qhpGu4ZvC/hextfz9lYeaV2Ug9m9Ni74QxE866/xnMBbuaXRD8KMHhNqjrvgwXo/WVbOj/2/hcUjKu35HyEgjE04mzb2aDcn2bY+uysyGrtEDKSK7JPOP9nAg9JbQV7PzOKjlwrt449nIwNc5vLNeZFafZQnkJ9tF7Hh7Ia4pdLwn5JROMJ0k1V+LlqaVW/jRnxNx9SKE8c1lwivJzSfAkGlDmEcbHRGmJMf3wPDsnMKjx5kSkr16y2DFVu+q/wGy3qqmKuKlKhfY16npntphm25LOTenYXuW1asCu8bx0X/oGeCQFd1+M6Wel9mJO8PsKPla4WhoRFKly1ZmK29rDrHwyK4QfbNJrmeJo++iaDOhobxctBTeeJ2f9U/j7dnAiJU+Hef9EmIi2VPjzBLXzUQhVX0xsauMrM1kTAfm/ecPlA9dkb62ulrvYvGJ2WLYoswJSXB0ymaXW+SRXEFvjCVEef1JN7VHYaeuhp6RrG/MtKK33xc867ODV9yCeq/xsI6LUfPRO7o7o4JbF1mgXwyipcQtK92Ozn9fy+N5XxfJbPMP5T+8k2at6YvZ5Yedwq4v1+lwDOuLAGNQYpHhaFgbq2JPPj9B5/a7VCfp7LPm2eer2vuWR+mvw9oMZnmCGP/zBTIFgpgDFKIa9Ue1zEwzLBMPcAqEjrk9QT+yNyX+h/oLiki0TBNMEwXp+/rc0Buh3df9dmp4Q1nNiojqZy/gaOxiMyRNT2N2ShXPW4bnqZrgUNsl2qD4FkxURMrcEuF00CXWaBPhXmQ/mfiOOsa16hLENwQedakXGUDJqJ0cONKBQwoJeDy6cPmJMkAwK1z08dWA3RlBclAjkPptCs5lQ99vz5ye11UQYTkmn0dNvVIO7DQ5G3Jq7PCtjqKL6JGomceWQHtW0gRy9qiOi491aZs0muG54HiUF5j5OG00fmyWL0lbBZdLmUBbHusB5OHS/UwVqn7BQl5/NMwYvfsC7FNcTAFJmifjTiVpGprwwyRc85dxR0+hGwMbznMMyRgxZUdtCTxdeDit7pNJcIr0rXZOxVaeU97poLTqZb4bVjEmeNtITO3PZedGbHG8CJTCv7gqt1l8PeLHVw0ShG57lFt47yulkbZB2jwz0YeWq7vV8V/Au1Ghch5QaDFtvsIHWxWSUYphdoPeCd71PmVU577l6b+KUnIGXBIeBIfHQskMvVfin0rseK79w98DHzwARI8fjULb0mNEfKVsfnbIDqFugiR7iHBmkbA3GobXO2IPPBNiSCT14paT/v5J7T1cvWhOq6cw9a46+hDS8h/HSrNacoVjzGe7e7cf86BDrnU9hKEJvK0DrekKS+ZcpFqYNlrih2YR+SuRUw2xUlTEkXq6aPH9/PsEa7fiqZC/FEbU02ByGMv3m3Z0tT/GUl3bi2AemmN2xGUzYiim/VRSHdj8Kr+xLWdbbRBUsnn+bkpyhT9QtOC4Vd5xkcvyW8GszidzjghgSr1FIVlvdRLt+D425uLgUCWbKplIErpNrWtzPOaALdOuP7RvuR/kffTV2D28diU3UHT04MiLidvT5vpuStvG4iNcCDZfTJ5Hvb5RF+ttXKNU8iRx5dbcyws8KTEk8ZGNpQdoCZr2iLehaYfSH4n0Pu6fUPxl3/m2+Z4hYbyTo/afhoBOvJu+p0v97Jpf/aoHp4SxBPc1WiHH3kNgWOPhNLp+P77i5x8b/XsiFJMiRi/ZViKwpSU+auj+dF+3Ak8Wwr/9YYSUi2fx24gIt1XsEArEpVUesfGSKCIY660IQCLBWfpj+JkhO2C4pzy+yaetFXJv9Gr/wdeucGkO9sMjoAqvE3ew3OOUeMu3IUnpqHs8pTDzsXe6TpwDmn4Yk44bIUjpP2Tre/JmGQ7fWAyoN2Lgy0co4suiRDM5sWnC8QqkBv39H1nFuhrHea3F7snxr8EVLst/IsK4NPPWTNOUZCVd1EG93mECINEQg0WEqsmGxAl08BeTRetWqemvkvnoVTr0mSKzxTJ/cabtjGbgv/SHtJ/Yclt74BG5rZTjgNO2IyLD7YY66Z+yAnky+Yfn/xR7qy23yFbrmVUkwHcWRuarEZVmZrq+yxJNA0BYjbb8X427D1CjxpJyi5E/+JqKKM+eCtQaS9cHxw5ZCTjlDoaMc8r959nkCiTlijC1CnlaLAGvsbk6qtWc60cohTKYScRIpG05ClJVAny7XiiKo6kpsBIJnq0SQFi6PHVWuoOYO6uck+jcyjiqW0OTl3aL6i/UZChaie9oYrGL7SDYRdItd81HvYRB70b/xx5ThYSkZ7hV8Fr1m8TE88ZjQ9ErTS7tc910EBVDrI6ucO8YVe8o9bbScxtxu61Ud2hNM+gm4yUH7CyikpFFKeBtIZ4+yEvoshxYPnCF+T99l4SeaoyQvttwPPX4L1rWovcJC8BpqZeeCmqyj6kWj1go/vyIQiT/B9mymo5z0sSt48ZH0tgHFgy6ry5wbJrxxxNY8jHneNa7bBw8h/mGTXnMArY7ejnA48MnFc7rBNo46LJhz0DVlj1Hn3NApWVTaXkZsRxwu++8FqtKBArUDasccntvZgTqqRHSrRCH81TVMXB5WeeQb4O0/K2go6+QnrXnUV0QiTNW5RzqQQNkgLkOn0Eownx5e5lJyrv4uAnaHxU5TDZdEJOIMjWVWo0ptL+Ji6/ul/RVVlEpHYMgmV0KhW9wnNKazTHtP9rEajsUfm3Td0uENINbGoStolFkpuE8cTI96GCIAbyGbUtaE4/ria1TTM6U0ZJuDygxY0v7ccEXMiysKua7dlwCz75f2Nbz2NXX0L4kGHS9hQgfM0V/ka3jyNRL7QD5TRnOxI1DT7cY+iU95eMmzC+oTXHcXA7i3+LHRlbNfQUbgCl40x/fGCuPefpkO0DQ/B2XkroDv3pIa14EFCVZeBK6oSNrfODFAUkauzXnab4kbqiga6ycTga2Vxs8F18brXnB/oXfKWCOg0sfYy3DHlv78pKmlbHJ5E64wGxNMi/GTNYnl4D+mMx+squuXaSHKu4AXnGPpigkFequ7rnBAXH7u9p8GV5kJrcGTvXN/XEb5UN6clHNMc2S+b+anAoNEzTlkH01q7YwxfW17wXudktONQFyFNZ+/9EpBr7JxNuiCdd1orT8dwbhupSybWIVY116jKUiZvMWmyTRgZUcT6ss0+OxzAXxaQHF206XaU5/ho9MqEgH1slf9dukFFiDDz2V/vKP3xnjaNxrXZDgrWSqXIJ8sxfwfn+fWfDxyZd39AzG3B/F8Ai65ftYsGKp3ozmDkYmnfrPeW6ak3gsXI7ZzHAIvirXF5WMqxZUe+feF0E6DLc9TXNchBJulkdO1gPP5rqmSlKCwwDgnl6Ys4d+pKSuAinph6JVGY8e9E2BGK5SIx1a+lw77rqy8c+IyQF7gKd2bcaioJ/qsvEjIl1owLbK2dJPyiZfoJC7vqfs1Y/Drksby1UT5MTVEMAc0ncXVjvngoEbmh96ZOgO5B1QRkhKwcYrVgTnmzpjwtiB+lt7fW6hfvSWyCuneYmi6usB6slJssj6c0EGhihTWi3TQHDoStqxwflZ6yP+t5CqtROH2fBm7TO+HkbwQcTKEHGLyTJxEhcDRaDcM6Uydfr5XkptlnClWgqmhKbjXDv+/HVX7eU7heolfihOIks7FHZwjX0JoXYjeK0W+Ak8U7D2KVIM9JGk4b+LJE3xHzgUfZ72rhG5DRO8ymrTyXID6iOFDeTxqctjjNHHZvYiaf6rdylShstiF2pyqSgr4RJGHk6MgxBWUTUDvjpKzvXsTwYmpUKe8s0FdjNA8d+qoNS1BBTG4DJd+SOomw5u6NW3Md/nZUaqbP9PxMVNsrHB641ajLZ9pAubt6OAOo2aDsRpSOZQFbGT6Dcd302r08QfJ1ZAV8nCHeztSCKRyqCYShNasHImtjZci9IkBotMwwu6qpJH9+nhArHGx2oE9alMtcVkh8aJ1kpKWDWtNF/+TGmNV+/ao7SqLSvcNl8xRk7rTfcYO+5yiN8N+xGuouLmKoC5vavknx17SurLorn1OoWhRbWzWGOXZkA5/TM+0KOeTgcpAA3C1k08umIipEsZUFUt1Ty25wMqTd4LvpOPq/xH8BzSrDuk+uE+lBp0Hd4bvH242rCRJsBnpH4Kc0xaj2LPGWwRmm82TmpuoJnBam2yOaAa1Fz1V4eFhEVBZDXsIqqoOiqDbCI8Ir2zztcuw8bM3/mxNKlI+q7e24fxp/03/tidtnE1O+xN74zNPUE9A6tNIxLaaXFE+Ft5gy4AUFPpeQcZ0C88Nu26O2FsEXbafyqMzHPDtn5pkwRHwbKnVRIXA7B+/17qhx8H6038g8H1Q4MzPvQdOigP7vDwjYKMvLNSslMuHJRm6IYFuCIp3bgXT4pVz83T7ANxUUgB/OHq82cB3AAnTM04IsD+Wn5WbPmOOALN9Kflxma3SPoaepxCggRgpgJNgh6gCxdhxUT4JU2uOL3jnhdHvlNrqFNvYskmp68shN6Nkk6tvY3ecYz+dk+POhmycSsMVX8ytzw3aL89N/7OYejxPJsYipjlRrynEbttLAuHkDZ5KbLpVjYrZ4SvLilUmuOydiVkswxTXluUmDzkuR8PPPTJT/8JLozM0Ap8oHRQW4ssI+4YIpB/7bqMHlBDhaWAun0PKVmbmKFjbrktGAD6sVtHk6M0GM6+D5oVpeio5KTL4gEB9Tangf3TCm9BvRfmhIfyZgfKSRt+q2CzHryVsMYnhmUrh/hP8PJfrKyxEz0249fnyzbXa/93gbcP7S9vpqPjvnwrfdIO17+kS22Jr3luhF1t/CL1rcO5dU93oD91j7mbYF6hAisOE6Voe12Rt+v0Nf4K6v3WJtGO2i3omtK7J7hUlxYQqqZUkdomX+QnZeK/PUuJuuKjJy10ltRIFOWbzJ6+oc7Ev4qNde7ygPDxc1DcgwCtotXM3PUpZsfGRkUMDkeExHIqM5szQCOzy3YWQYwvXH38o6XwRcOzl6D1Fq0hswsOe0Oyi61ceNgxu7/bwtDcwGNtZ6ft2Msl+x15zGNMrU0+8zIvzOPAyFiw/l9v1idtPfhmfMPIvrfNXindR7wNldH3iE4Iyj1HP76sV3vj+Tt9beevUm/dv8mo3UZuFLVsfsD8atlLVH5o0+WJzt/O/lPZR6ncY0R1XKnvTuYtvN9O7002J9Z2NjIvWJEOL5pcFMC44dY8KaL7fbcXBX9DFIg6BL5PibBCXN6RJJAXBN9VvOblMCzUlKOBIg9roq9+9LBpx0a17/wr6y8qYm53NC7CoPuuseQ0A6QDhVtE22u6UojpnzevAgGjrcGsSILx1i8CPxKNs3ZHkDJIxchVA8ecFgVTcMOWpTwVQn9pFyfDmNa6TzTXZOj4vdjuVHrXtFQWNM1ZulC03RZQdcWxgdEDsS9LlpEvLqUsp/59qduK7uFS6VB97s+Nq0sWFlMWUrdd7slyz3a07bXr3wImgsODQ3bsgyyXT1bbDtnP0UEB0YBR4rCLIQn5c6WFkMjnQ/7DyFtfGaD+PAjJrPEvKliWdNk/dKqNusbIDKVsulC04LGnSnESTJIwcb+Ia/e8mA6PvhO/Bs9p3X1G25nVzFaufLEtQt4DxSbmsxWwcopKiko9AkRXLhpWivo9MOud+FcrLysqvg+b08KFhFktlSFJlyLE92TKZbpFkmVoPqjNDR0fMfUjn0Giy/jRExkbFL0KBpTOdncgAa96E7zjOd1zlHyhNLN1x0UnS3Wc/zu/IUTvE9Z+g1PEV1/FVawh8mRwnpZ7gW7jga6RTbmluaeU0nskKWGx0a8N053TXl1SlJKUEG44tJ46RxORTJkWpTylb+bYOy9aJtYn1q/4tioyFXy+3OTWJlkl0yxTL1G6BB5X2DlmUrc8V6OzZTq9Qfgh/z37LUiteHCcxoInaTAUtpkcz+DsEMOW5SDbBQZM9Ls1O8trHOUQujEIHC8R4pMvny+PLYqTQYfxwergl9wAEJ4Ykz1UT+Vo9jlFO8TGGsYb8U8FQHqleT6jLhfVW4IBHlFccbVatgeJOcQWj6ivzkBGUGdLqo8DAM8KGrcOKs5RY/qyAgr/qefW8fxI8lTyV4gUlEyydsxQx3MGwu3MXzyFMJNr/zd+3Qd8Jbq4urjUQ50b3oJeT19TU7wI7eQAEz9IJHraxAlkCqVS1WLdhZpERyQRd89L7i4brw/S7QJ2pBe8E78SpaFVPgq+Tb4Xhw3fxeViGLDMQss2ZlkyFo+FuKKEbm0KCratoME1uIidpJSTD7/1dB7vl70MFd2fBacSKede2ueawk9IyXB0LdCe7aDGty7sTI9O0M3W6Z1IDUgMaoNDbxddlSBoRgNelekFjlke2+3pHlEmkqcWOFT8Gtw78YPOZNbBcNd0123DTu52l2dJ+8Q70eC4wBa6oL1HRzT0tfaxSVlmCqJK7X2yOxh79S48Co/RC9UPZDr1RBptPVURUVYa1c1WOf1v74QWXx/4ZfdtAF3ASMDEnLoHzupFqlLC9o4SsGU688ucn1eJ44HhzfOW5Oe1fAD8/CZaVhYdEtbl1BtotMdgo1CinF9yc3F1B7/OVFASsHTK6b/zYu82nPY2ZweqYgLCS8PLNKdptkzueLV7NaawMlsCaToxdrj1X93OxYlssvJU9mhEFtql26br/F6k2BMPfENkKAfXU5sqdZNvdon6eiqI5gb7w7/LxQ5lM1r3q//LExwt/FU43rsqmwHtlM2XhJAEn3P82mcZhFJbwpLFu7E9MppwL1mHyqrH+DH4lWCWhB5y8nTmq12FLOFnCHcW9tBvoiYlvBKWynYsUZEyf4blh4o40xN5GiAJ3Pw9/pcYMB7wozVnKTcSJ6GUkCK/ftx+zjnNIV01US83VlfDQELSGU6V/VTw1Z4qJmdDVwI57RXPuHi7UIsQSQhCrT3x2pokQTy7Ix5HiyV4mDlHgvP9ojVamuvevG8sM2Dt8pDeydSyWjLyhUaq6X9vZ1dk9p8Jhh0NSuUu58xQeWSrsRnelR0K0p52vw4ACzlulYjUIaetOWgKyZgmuWGvNbMZyLvK6WuglUgI5WS2NkIkrxld6M8SYYiVaa48Se/RyiMtv0o298YiwIFAX8VU7LnzfyTIL3v2TY7OQrA3U214bUFRcVPLXAqOT0VHMKfbrT2FoskjX0Jhc31Etcdp7E7HGsqay+6cuIaw8jfDMkRbHYvDgeey8WGnENmKCfq7XS0gf2N3slZIBbHjpoGPqbOaqEaURbQ9+3yktuvYy0h2/4dJfjjP7RnqjRP7770CKlffsQInaCQNXN1f3Up5Fm0VraFZoBteGaw1Y7AMoySjOvNpoUKZfHBcRF96i16q37EpcrlkQQEV09S641LrWtbg3u+1eGfbM98z/WkhId0r0JHgSTB1MGQpB+HAO5JswzBiAzSnxcRJzEZ/QWrusfdeymriMTRXh37sEWXqOvSTbDTzKhv1JCM/dlGZVEq/vs8uyy1J1VG308auQEpQSMuMi7srlgD3Rey+EJ0WkHILAqdWpk2Zoz+73Hp0LQtnFWcXnAdc62T6JoUrMlqh41Xk1rnD1WfrMEIFEefc2q6kZsxC5nETZeBJ8hYeAlfUOhKe3SD5EX+1hXLhNTvYtOu3nYaktI4W96UQH+1TKiqmWo63Tf4R021i/KqLuiPgpH0UwiZpJRPQvWeniCriR2IIMjcNO8c6xBQYlBucQnp0oz85FLOQx5AvjBLEZbDE2GXHtKlqS2IgAK14CeBnF7PKBpGZCKaEiAtaPmZsun1LOKssqP7zXcQ9zXy4nz393ObjYutgr16ELhAGmICI1Iv3qknufew8/tDVkGSt6QtzY2VYmwDE1gOMIw3bahk9R1OuS9rA86tn5QDo/j5t3fpXT49/Ty+njnEW4lGJcSrfksjJyss+d9Ov26xoI6g84K+TZmcNJFPK287LTidWJ44LoFSlMNHiaepjpJeglFrUYuhi5JAmBm/H+U6597gM7/Wo4U5nBuqEUXXaVMsUL76Uwl2ePZyhtnCtE5uJDYvb4HtpB32FlUGxY/mQ75Gro1aEdQ0k3NiA/LS89bqoffIp8St4gXt2BduBU+u58CqnBDUAX6H6JUBcfL2gp7WTaf3gPoXJP56ZXW8jBXFBoSKjs+v1ERFaiAWI8KDI4AmRNiV1rpztPr8Ueq52rIGwSievEtfDsI5+P68CB2N5QSEc/PWX0+W+3ZWbzlcMeo6DFdIMCwZer6tv/vp1i8a9MckbB6qyVXCkXxl1mbDFsbeVOvTeGZvgYGyKZ8HEP1IBF2X/kBAM3OC3drNpZLuK0s0yts6YM3xjnBQV2X5DeG0TjFNhyANHtSW8B+Hqypb5G7cRYzJfDUvtN9UwxubRv33ZcOfl5Ype9u+Wl5dwxskrvZmstIIItRzgRixFq7EyIe+G2bKT1Q5sT4UC1aSaEipi0GnngkRgjTRid4kSqheKmxbwHcJz7hvmXEWq0edwr84QrdYJ7sOscq+Lszb7JdUbCd14w8NlidnPsDhjwySir3vH3ooQ31Sfakgzw/XXE12ZGpDbHQ3nmdMXrhNDQIA/Uu0GEu0FCUrNCRcOcRFrZW7cJPvRfq/U3eCeG29aCQAQREtrYQIGKPoYYYQwNc6yxGsJ/bgFYIXnsvNrcvT3X7NmNU5qLUwqi8vhiN553ru5WZJbze5XEu4ByYi70EYAeuzrJCME78O8i8VyextP5e/6Bf+T/8v/4//yL9XUGDbBs8AUag8iZe87RP3+uv//45SogSf181/8AfFp2ls3GY9//rpGti/xiNVkVJykPFUKrl5Ancra14eZUHmztmnMuG1qtBtB+QHLYzdSYBX6/g5H1o1rvw4cNPovAdqV1I4JtQCTLkQj1refZxPV3A06lNJWPZPuXiT6zat4eJ77t5bSzWNjAbhFY/asnUiC6p43i32zUNEEeHFAly7agRGGh6Q2o1kfbWVfajTYJ/+bi2A38+z91pR34t9kNfWIRWC8g6Ms42oNWiw/aR8OGJLnGi92/TbENyX6D7S6UwP3yzPsP67vftTlSSUnpNKK2BNfBJPs52fewl0Sob1X1UJ0T2dVa/MgTqdYmpeRiHm4NkrV4tlWroK0MNL6ynM99rU52zuRY6wRM3cM2STmXR+tn1dNYdmnSPB3Pylq1hOkY78DHnY51UKuUafthlOyJZ1WqSFsZ0KxsOpH71MiepnNMuwYTvfgW/n+TPOMGAXE/iAggVn/1okSi6Rwp6z+ExYTh/zkzneirztRGyj927UQCDPzHTug4XjW2L9afWxw5g+PGiHyHKcgHxKxKFnqVyx7VHA4Y0D+PKjLbeUbxyjlduWKd7l5UBNVJpd5kf0cWNaR/0FE/BRCo0yaRdILHTDYpEvigRPaBgkMsXyeViCnW622ZG6/qbuf7HSQRTRxUALbXrfHB0kymZSEH/hCUHneTNi8gkRzAU9sB+bWJsVk3BX0P1GTo0W/keL+UljJooW+d5F9zeh1lQh0B0UCaADuLjjGn/PoblQJpBszfWVVHFZqusGXbsF60KipcwtWwAPR7LOmDpdigH5B4osKfbbuGTRsrqa7H10l5PpSI3ANd1Wg131Gb25ICzqG3W03pHwrNco0TqFOCADf+gx7sN21KPmiZIChuzncSyhmtYVIDpmrqFkVZ2yPLR7IWPGNapqVti1SgsmQ05W3WCJRwJfVE7VA+CVBKy9gehTgskC6e0B+ltKGXeeUWgA/94NiUc5w7fGZ8w8T69JjIvorH3o0HlThXJvre86jaGP3rOQQn0TWa7zcVxlQZOkXpgcNu44Nd36zbLOuXjuidWp8xL7cplg+MvDGp5klFwbHWHlM5fV9dP06TO0ofIxW0WZ3ule8rBvfmxb6wWNZFCW03+zrS3QcDMcMU80EKmPVflHBSAarph0AKJEMFlPnZq+5KwAIM+kmcw7v5vDlz2/1TzaEMAWKEJAJ8oSERmWoEbgMSCtgp0iEAWC1vJQhYlsQ8VBDDSIWJIg0hrhlIJ8bILy+ZkSuulkiWMssRPDjYhOp436aYs502o79E2januzQOBVFFMNcDQBB1GJK8M1CcvYKmEQEE2EcTQYT4QMiB1CBMt6gSoVyiiOZsaSbGehwgrm78SkLY7PwmibPEwVwnnpWo9ZGmYHL1haQk6xUHUsAdFx2SjuKVhSV8tqBVGd9Kkmu4penyiIo8de4QRn6biRrwhZVV/KNWM0Smy0hEh/JojlXN5lkQs3w3v7rUIsC5JoUgTfYPcUgAF5NptTb3i0LLQ0MpL/cNfVclwHO5lKypXqabQQBLMT43YlDsuUKBledXxfQy/s7X7ZNjqMMqlHXEvazUofCBZp8o6o2WGitrZ3DpXxlcp0qcztIRZt9kZusIzPqxdNms1mdYq3nR8K/H+VjxcL9stkdaDbEVFhZb0YyCR5PhUNCdRUVjGBc7GNY27p97L5KaDhS9CaQ+GfEclWisSF0Nl95n/K6W91AzeXv4sw6bGaWp601ELKmsekJexhRLlEsG3fg+yubz2Wt65elNb5tOlk5pfT0XR8wZadpKrEBlRYC3Jpl9N/M8APC2IZEGiu2Fz3lNin5tg3P0gFcOvsgHsAIZI7DruFcPuyHeEkkcgL8fgdjcP8XdmFOf2ATWUAdDl0ZDWcsAQMuDG6tsGAk0WgS9yGa/jxwUWCj0BRvo4cCuMtCw6U12PYAm8CSPfDMWUAGK0AW+NB8NJNYZCd1oQHhpeOQi4datCgkBgSJXPckwyTX87RLkK4MQHIJFwcVrnTrIgsQX+NGtZ8IkUd1VEDrBtFC7SSy6D6sxGiu+WvdaJdJYvLU/2TmEDPxCnFHVuWHUGkOLXxWaBAaUcDE+Asqug87TEUTG57UraYZT66culFXgAsaqMOZa3ml5G1bbE9HQ9L42bTjlEDBEpohHwlfj5Jv2cv7EMOiqYEGCtfoZaDDd2kv+y0i7ThkFtzT7nhRZIQIsYyxngmo3K1XrxwWz1zE2h8SVPt4+q1VF0nUhv+CdnKYvcTY9v0Rz2XRnjoUuBhULQ6d+81PRRLdQA5aBdjUTpbLcMgoYeYwL5zgnGjqDRyL/6vSlxaPVOxa+vkf4UP4GZ7vw05KS5/9gKYmzseeiAW9OTMXhiuWZ8WOtyRtPyLG9BjidVzNjV5zNT1KgfA9En6d4LUfnbyjDLd0RzDmn7pv9wDeYgXNS7AU4Ui4mLZEcgGvi5DUFnnEIFC/2VrvmQG279AXjfYagfGlTYY+yQyaXL/mo/LAt18p4IK3d0ZKN/vihRKMrVQNJWi93LhyxePKLnt6vVopMtGSnMIksCJKn+Q+DaJj0b1qC/glMt7vr4I/yGAEE5Iso/+thryrVXmsxZMw+D1TqCCQCBc161DnjcaBh2LjPPtm2x5SLzpsWI85l8S645Lorrromwbobbjok0Udt7rhtQ5K/JdshRZpUGbJkypaDK1eefAWKFCpWqsSc3cqVqcDzzoK7Fh0IAbjndr8eZZiW7bie9nl8gVAklpGVk1dQVFJWkaiqqWtoamnr6OrpG8SARmpkbGJqZm5haWXDpi3bduzas+8ATyCSyBQqjc5gstgcLo8vECbZyL3SLwzd+JzTEpZV48X9ba/o8dt5mTNxOi8E/mBvmtLLupp8m+I4hIMR6yzgzLfC2OWq9vV1Oy9nPnU/LwjFhx43DD1vGAatzLyKC60fh94rI995mvit2FA1zTmvm/n3E4685yo5ivJ+FzKqZikQrdqKsRLNZE6k/Cx+YRVBfCLX2pFISaQKEUdxx2H6DcOClVmG/MwoO9xnmlNcCuToALmcC5kQyzLrJxlXaMvHhbcUMlrnlsnDV4aMfHLimx/OXLhy484vD57b6v6CfPKPL05888OZC1ce2UTnwDsAt+fgwvFB3wii5bQZ8hKa/a7+BkLrngTlBN3LQ5+uC0gJI4Wrh/ZQ+KGXyLoXOaBBEmEm9jCwZ79+AebjDUTdcUFfD+o+LizOas36zyog6v/oN+fT03Ta/bZ/NQUwM6S47nPxp/qx2vx4fmp8Uo8bgHkEAAAA" };
        a.arimoIFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.arimoRFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.cousineBFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.cousineBIFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.cousineIFont = function() { return "data:font/woff2;charset=utf-8;base64,d09GMgABAAAAADwQABIAAAAAdPAAADupAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4bijQcVAZgAIY2CGIJmhYRCAqBkCD0TwuEEAABNgIkA4QWBCAFlkYHiD8MgRgb02M3xN13FJTbAVEU513kSISwcYRAYH4IUdSENeqTwf///zmpHGITlrQM9oeYHWZKOSozpASHpWGY6fFOVYUSbVN50ndQPXHtRj/vdYjMfOx5FcJxHcJEociFExXZd+QJCb4Ytw5WXCY4qFis+m18US1HDZN9ob57rg+dl16ByHZD0dGcTLHga/3UKNQB41IXNf9Et6hFt+gUXVDhhBnZYFJhptCTDhP/s58tXkT9jtDYJ7lEkN3zVc/OPn2evGcgOocKLyNDOXQER2TK6PPNAWyzwywMwCyMxhypCAgqoqKYKGIjNsas3IycC3tuzqlTl+k2F7/6/2X9MnzXAG8hAuG//3t59z4zc9e3/0kDFtBgrHuiGmsFA9Kwi6S/orA5lguQkt1E7pvrnd1MFoIbPM7lgDgFIPdR2L4K2+9UhWz+wwIc6bQecFYQPyCXz+23Y61sK1GAfcCWvY106aRLh4DHu9Ih/5G7cXmhDpmLukzuaBWBcv3kgCQ5UCD2uP+2Atuj7ZsVJXiaCQ9fQexksayB33kemnwraoo6XTVZ3MrlEkpVtd9c/p9b43ZeKBQ9oYwHI2EwlMllLP+mq2e9ad9cpRD5YtWJaPeACBFgLPuzZXm2NixytsoUPorj/2xapfWrVTYvkGd2jzzHlC5QelF6Uel3daurqkt2S/a4LZnlAckLAs88W3PQoyFZ62iBX35I4SB5fAQUIUb3LiOI73KgNCXKiIIovii/aIBIPX5ovAIHBcEKDAyW8fz9Mntgqlk2ggS+tOe5zrGmdWOyuqW7rEEckTLQg175XbdHvS8+Vuql4rBcLgWXIgXf31/fx90fnbbnN+R+OMV5D4dcyLCuLOYdS2cEQUaI73jGCA7iuvvJYlA4JVUV3E7cGwHjUuPWnIBGekdYPqjiVVLAXrNEjzkrzDu97ZtaOt5bDjLaAjvu+GkPestPB1YopDZOQBJTk/GczcvJ50S1/F1K3TZFrPiSVF/tqcv1uuXqFh1wKpWqBzQPaUNqS9C4LQqIBASkNGpoCLDlxbc8fD8xJdp9b3e8devCMGJa36c5o+b+MOeE/gKpxrrDpnMmaue5wJ5x5d1skZWUjLrbjaBA+uEWGrTz74D1czuQpdA/Pm4YxXD8vIR2SQiK1oVsGddpKf201l9RanhKGrwsnXwqkwUIJsNL9cVRCYyeT9otQLz3/TtAPWAogIEM0L31NxYPspOpEUNKJnTpg/i5+ZqvNGbSlBmnXXHPU+/9zx+EiyV2xStnc7cqa6R21Pm6WR+7L8PDoXnYMOxqfzAYRnnf7zTrnL889MLHL7furLGaX/ZgKBjav1u4/QG0Y44G7ZAD9ttr0YI9qvk2s3nl/mH/vGp4t96tduNde/u5/f5x28PUw8TDKCCAAwAO8upp6STjS5FGKB26wgbun2uHbEbnH2QHIdo0/5ASJIPJYnO4FI8vEIrEcvIKikrKKhJVqZq6hqaWto6unr4BFkFSNMNyvCBKskIJIMIqtcaadRs2OWK2fOHyxCUkpQRiCRUmHFsEjkhRonHFiMUTJ16CREkA1gOoUqPZBj369RmwySCAIVtsttU2I4aNGjNu0oTtdsTQurvsNgsgk2B81ZlnGeQSaOlgssCIenjQnabQldufJpEs3VrMChVR+zhaldqdWna673kLALFAh9jLqkKtcnWqNWjUpF6rNgAtunTrtMde+2QIXaV8IDd9SM2CCtc10B9fU8D80dqxD45ae2N7R1Xq2AwB9YUkV/TIyPdHcg5h/MV4F4bca85yIwxB+OZ7Bd7+Ayf7luz4yXO5YPcUVkjfPKnG/8IJuJ3LzFhL+EV4It0EBJ4EV5GAaVxVpMAC/L83hk9T1xvs5z1Z6S011YPP3oo16Sf4ce8tzNQQ3V60PSmy0HhcsMsOk2N0qqYC5H8RVkgPsUcMGRyV8iiDQddk/WYQVNWQmKoQPvqlakUN6EHUuAB17nnq4sjEGWuVJFZEiBWLRdafDo+ouG8UwVFIGpdxagcbetaJlP7/rVue1lvEsO/DnokH6kWtgtmhn5TR0VGDTw+og5zFBJQwwjzOYwJCO5ZI+lyRvEgi9UNFDmy51OT8H7qbaPzIZEEhHbrTngQm3nVPenfb+oDI9X3iG2iDxMQfI2owL06NhAVtKShReynTBTOyePUU9Lu15mMuE7CZBtjgmVio2dFOZqdaemvE6m1b0UamlZJ38HhFB4sHylh8s0y8E4pTEJnwGWx+TbkAlW1m4B+629RI+VswIF15TpDI1hTeHvmM706vjp7wkR+e50zu+7eHd4GxixXcro8M7sax56oqkuTommpWoOqydQ/2DJKxgJruKluxkqguPWD9wYOVcZflGz5C49J+LFZaHGlT3K3hso1x5AEzwBnpSEg4T8T7h1d2gLWMOkeerjj0NMXRENLoEEjSb6+3Dg48dukq+40B/xaLK1oxRIagqBhpSkhMKclRjeQpkgLVSZEyUqKclKkgFSpHehD6t0sW3x55QU1ySxQ+1/cvao5j3zMPmtux35N0gjUuMjOhCgmkOCY1SkmdaqRBkTSpTlqUkTblpEMF6VKZGwJNuJJRaaAX0Upfty71yKGGMTtjDI6Mo0PtngAYN+zNCYlbUhk3nlMZEsjUud0xGXNyyLof9f6uaqpnBG3cZbk58EhtucCvIOVqoyS2iZrTfRA3rKrumWzluY+0fIIsgQbjxkPCk/ZBVHGF+kJTcT1nnITzsZkbZOria6hrhtBIj9Wv08MoohDhZ6bCzhQ3rT0Znb1dSrcgxFQUoN7ty7dOyWKZxgI0aRs9m10fasyA6MQTGfCqeMzM9v1Put1MjSqEzaK6gjoliNQQCmUIrSHzUoWiJtrHVijDQqgxLlq8G0QzqVDQaoouKApADDLELSMUHEj1aUu7woCzEpACqOCMUNcoa6NniMEwrZuJK3+vZEZkenom93RIuP16gFCarUjzIU3B5w2Eq6MXk0ceWyuH6Nnw1ddoxBrHvbsWqLsiYGrOed3khRM3GN6Ox5TEePL0gl5wH1XYC9TU3XVzeIbgSCaXe1f0e+ZAPRqt89iHBXTWy/0emL3LzjA2WvARflRyaysXPy65s5RuGGdXMm3nlBBZc5zUT3THGGUBwzMUNGa/bKGPPS2zALWbsRmD+adijF80BkvVQzayZWyk9FtVlTwbgW1Bh3xu8q3fyo1jUEJ7eOFHiZ6aIKe9M37L8nBuXq5+VWYg3YCryXuNys2TvNkdxL2gxpAaibDU2zKUA77plbwrJ4CuAixFQ9JtCmRoVJYXHJpDIPk2BYhmjLEAG6xJ2awQ066Ab0UFL1TRkKIRDd2m1I5soGypgJZKaKmCVmleGKgBAzVhoBYM2lYPnOWAs1xwlgfO8sFZATgrBGdF4C6NkQk4UifMYDrHUmAqs77dAffygAEvKRiskoFUAwTRoY4hNDHULdjP0DnPpGcgA4Mcz2aCKUYwxwiWGMHqANkYyM4gD2pmOGMMV4zhjjE8DpCXgXwMa/0w1YJEumv1Hq9ri/ur+fFPO/7iHQE2LkHGAGUxYBlrvGSTaVCPSXfSN+SyJPNRRja2d6dMunS128QEPphibgBYmBvF64wcxMSwSSi2AUZVkhF01Ezw2jyy96un2yth8GaFy1HCLXQ7lzxXQLBd1uVwiNIT9YcLUT/MlfcyonzkcaON/kO5orLL2DE5hipUbWVjEHtWDhWGpsEbc1Prpr5sKsUReaJWltACKRumbRktx8rZ3DbD0JWNUJlTUeK2JU2BgiOmbuzX8qpsFtTOKShDRbYxKCorCvwgXFZLwrECc4LjpCY3iEph4nLOMFRoYVOpKFTIOZoaxxrHqalZRdNUCotSGoOIp4yJvI8mIgo7ce3mPPHSxA8r60k3lGZsVTvq6aDgTfNBNemZ+TSLJe+rPJcWIvqxi24cmZrMll+WDnpj1WAn5rQ7XqOc9KIBFphO9Lgc7FpGdRKjOkF4246xNkpkOPKaT9wRxwSmsoaS71AwfuCLLvg82MRprBOB+kLfF5zjfO3ZmQx6YIJLwTGXuCUWMI+XBSpc7cqIWlASUgS2W46e+YgpZ77igrd5ru/Nn/Yw0yY4LKuM9Gd9GOYURo3nqV8S2Vw9FOChs9zj5TN7H1F+8e1YptEzvZYYcPTyAd4JW1RJxF0e/u2Wz0+0j7baqhzxhYpAwEkPTdibM6rnhDMjGM3VCrJp1rl4XUZJh5hE5bygJuhwhgfqK5RjZtHKa+53VSZUVAhvmlrNLGyxqoWZwC2/NWAcqqoSfnBMsDdVpZgFLFPLEcOFZe81rv6HCsdpP7XKkQnt0t7qd1rw1nN7bEdzmpMoJyt4eLxum/aFfrzstJOIl0+4k8xy8myIKZRZZmEi/xCmioq+SPWYdmVhnH4sSHPk9p550y6f2dKCXFUYDV6Lzd2cb/NpIVKZyS1oC36EVMVH5/D/FbNpj8Qq2g8nrnQDERiFfcvv+vTNeO4aOr0XsNu1u+1yax3GI5SxEKbpMs9oEq113Ka52WAvQsrLL5mNQA1ICBw1evdExpJGHxtt+eksODBhrpbwSTGWBvVgU1H0c7XSJ1mRpwWDiDCShKikH43mMrmU621O7QotMZ14+unCDyaVf1iwOAZsL37iJ+S3oOfEwmor3w5OMuIEOaX1AI2qRDY0WCyEiq6+DdKYxtDLGMCWgrqZ2xiYGFBZb+SUo8V2bjP+4svOB5hzSslPumyS777SAlZBoYQBKzQuUVbkK6bWDhqNCexYERbj3NBI5MxVCiPISHo8ecNCiKrxEKQsSCaXG8W8IJInT/I4RvEDlUiHlUuD6lBEpXi1bVMnOJ+4VAW22z5FEVzPF6fFX7Zuwu5j6ZABG0a/nQ0h6OzZ1yEFqm8Si5Pw3GT7nMhWCjOmuR3U1TaEkgVMKnAJbBdGDSMWOaL02FZoSzIudZwh7HCAwnSI5kI8g0RUiKVo2t+raYYpNISWSpmKEt1hElPW/iyFykyi8ThJx2huOHCfcgSj7DbbZMRYwXhIPqw7uiN2+7ftxFOfZvk0joz8bqSJa/tJXzChZ1AGzZ6lnWjr28Q+1aHBVIWKH+7Kyd8WAqU+Qee5Yv4hYpST5jh/6OZUmJluSRhQmvCW77VyTxHjPkblhAmUCOEW4JfklRk8QRfUh3cmKmt22kfG91SZxwES1Dw5XBce2Nur7IJmpJ6rK9pCTqLoAc3yryKUsxZ2RIXaUj3D1hvKczpcmD2WLRLwxKzFMfbOJLr08AyA9nDU5s4n5aM+YR1lshPRe/wXwH7rim2xCpSOQcx3vZQuCmtitropUFAjETUf7Oy+nX1X3wlLsked5za3l0rxk3NN/6r4Lab4cHYeY1zfhS2KOp4tPn1FiQWxEnVm+kxHXadIMPrehA4R8uaVi1yV4P51oAyLujXOa6ai2k+8iP/wmlJuKaG0bNDBpqrW+O2BFB8pj55mBgfbeuUdJrHqADw7xvWdsGVN9l7FGEsxNLRMj1VDRiEwRnIjadNSEFV51u9ddmph0KTIT0KL4hVpJqFQFY+pNIngSoX2k1DTrDjINFDiGXr1iCBwqrUpwqDU46VYsenKxDmy6dL+nHRtw/4Ey4lNHH6Kh4SyRqwDYbNhKlfRv9CdbujDifK6+a5Y4KNTlTb8E6ZQv2dovpajUaO+rc1WzeJ7LqwFNc1pVTVQUnZO+ndBr0MQntpoaNG7Kx0PNxvMU+aWPAdJeJ7EJq1oVMRWZwV4hWC7tQnRgQySd1uXqagTrW77SRfNh9m5t4LdiZ/9PhVXr+14zUjsuKCtaeV2MufITnaX5y8aJ9VjSlP0OHN4Fs7VGCdfdDBNYjRBSse7K+pAOCVF1RxPJEgnEi8P2bW2+qZBAyXoLbUAtRWAowKDw0/zFtnEXmdXO6hyUjPPKiqJ93K1Ao0efq+yjk0L0slHgEClTwv0WC4zwMQP6D+qbivhZeeDMrWslr9E6UNyy0Zloq3yrVTwKSIWK/Pyiy2OFwTqzwoH1ZmpyW0NRGHIvz0/VY5h3YFzOZ3HV+8L5x4AwyiNWHWYuRgs2It8clt8gflsCe1w8J9cTbqs5kZ7bHXsNcQWNcN3wZQcjcQOeNpYfIYLt+3VYwtdRZzKTs3Vgr1OexWe0e4sd+owr+XbfD/T0xhET8dqDauBlQUkghoy7xYqqle6KyLLr0wSUkXKST7TWwTHkUMBZSSJKU5WKOVL1qNDgNvUc9xekfEkXOaAq4RQoq/CKCdso4pdMeNSs12JDL3dnmIRmsgfS8vDQ0odJF/BOqLPEUrwxe7lXiCrwaDYu9jkOw8hMXd1Q0UxUK40RnQOIgtMMGKR5XAiRfy44CJiG/IlRZXCFspzKIVS9YgaiYlhM4ObR78ImQSY4e6uBF8dEGvLkgy1gHczlALeVqIWGs2cI01y1k+dWTVlnd4LJtRwuiC9fmBm7cagJRb3YS1PMWd8ZHxAhgKTbe7H8KlFxNqy9V3Spo6iVMUrRybMC8uPcMXE037uwmXubhTXxQfETaG7zWIQZ3byNB85d3tpHn22tjgyqBpSZ2Qotb6CUn32JtcSDeEtyeEDay16eaePLXG/tS2tDZUNtTW1ititTURu4PZyK8uGdZ7SveKVkkjhcNl2Q18NsGnr/pPom66/YuZ0U6KyUVd2hX7RGAlyqIhp/vhAf492N7XOmU305qZZcBIy/PYh4uegx6c4iKV5ouzrVFhf1c66h6RFfQqc3PmdYV2FFEkGv5TTTnYgnkV4Ux/OrXjzs32gqpHoboO36aV5cm4+1A+8xdvh8mjmF4YHlPPtiWFGHdT3taM3c0g9lyinw5QubRqox2+Aqztp59YkhnC/cxpBlCTCe/SWr7saKRKROZA9vxG3F86JpuFK9A/8r8rWKFIRtNdk5P7vOeLzaGr22I3xxAmS8d4hPINtm2vaT51RTouJaLcBLQTxOGLIlq91ArEcEfj20MjUTFH8HluM+8bdKLgrBBb111em3U5tF2F6JE6OJeGgy5Qxz+j4NnunIJKnmZGj9tiwkynEGfDoOkp7z8AHrj2Wm3Aq22npkapPlvavlgFchFzy9q+8s74iFupdvyHZF5uS6OoRl5086SZIsv2g56zPzcNHUFPdMT0h0dh6YQq8NZ+bWjggd8McKHPFkp0VtpQUla/R+BYwYPgfytUA93hpcZa5pvFHEH3cfICTd9H+S/tfOyu1745LnJH0Tnsxr7F3FpdVTkkvGWQ5JvKQd0gDlwag53ZAV48eafec0/iPpab5NPkxe80imnG0HkWBYKBuvwEc6tbKpPPjHos4FYhc9kHjhIOF3BVD3ookf71CRdHT4uxSREnmsn7sSl78fXTcY15sPu9xPg9mOTLx0De5OVsQJFavEqEltTT1kEO64fU5ORc82YXa7NZhtwDi1ujawnyhoNFE/hGmqhhdflsjrSuvlMbM6VWVrBls/D9rdX9kn0CFSaPT2qmIhI14erI/wTrOB6g3Vpv8C1brDD30kl0Z2rRaNj88MVdOQU7kkJSEL+LwQ2IS1T8qZuEcAm3xtCi5m+q+9oE2xAj6s+ee2wVZBMltzSMQ5glqH5WWYMl2hBO/3dL450ZbUgTt6y3wOBK5sbA6OyWCEaf2Sa2QQST6Aic7s5adFmn7/fowQZiqH7oq4sWV5OanHWiNoS3OzV6upUV54mNn+jdHx86WSkyCLhYGoUnh1BhgBny7ZYbvVlE65XogiWxMDRcUQEY43jHTIUccWwtuX5MH8nQGwIkOEuuzUZm4A5bFkX4++9ADr1800ezpBqblSY03JVlug6DNV5E8SNlx8fAj6/9bvW8VzjBycwiEyrWqaHm7ih6XiyYjT/7rCHMBp6fWk1CU6JbSrV9ekHHMvTaqm+3IieHSXWlZrDq7IXCRcaqhxcWjy+PDKmvCKjPQ5RkwiKEHrESEqxle/Rhkr4wnWDfZES/dNd2p82YSwGL5sU/zY+j513dkL4a0MuNEyKvRJc3ugUcYn4nszHU+9ULw4kgv0o/bZ7WtRP7L/z2Sl0kr2c04gxVX3055kvpsICedHlNWldufO2B7XzMuRkc5IMB6Cufm7e22swx6ck/GjRreUiR6A/npmqbMWpvaOEOTrsESz4DnV5kWbmR4WMkZxO2Cmm7xsd6cHj0Xww1vtbhz334eL4y5OqzdYarZnmcbYscKt/8rVIYTNnwJiq4ey4qKoUFRGMtO0bsashP9ooaaLg4GZtuR4qoyhERCuGGEAZa3QjrZWSXJ3KF1zfAApHU0VV14xyw0GExN5HErCvOcGwNNbkCQzJrSmPE4pnKcltBHS5LSFWKfuKnwjUt83/nCm7NtUF4cZrHQ1ISpUuPniN3SpiIKcEzhtfzBoi3HjerthtIFBye740iWZK7pcbumpBqmULVKW6s0GucMslvK+0dgii5xoKVt4fZx+2u9/sWv+T7RwIdOB/+bbDLcuV7UtQ8SxGVZn3ZXLVRcCqlgP+iL9QdKHksSlC3bqqQk+LnkuRXqdurHgLFMoX7DdQ1Wr8jKZ9TFITcQghe1BnvKt5FNE5xck0zx5O684pyCrYbLDl1xLA4NRNM9rbERfNN4T+O0CauBypw0Xr3WGHosMG2zGfL/uthEaoQ0t6A0dEUjxzacx0kEfgQd1/xKHG4ZHMbiAoMe6PQn+xFCZFERYcnJQfuBeeqHi0tmUYfp0K//tZP9XJYBhaymYcppAXaPxYB68sOow/mdI6F/2Fr4T6yump3AkPFr5OQ5lJdGpTMx1RrsBg22QXtddWliDNIGH1CQYD/qPgwtc+FJx6+rQD0zwZ9hirzhPzKJIt6ecSaKanQIR/cAmd1uVGrECwsguDKOtp8Sbba5oRYa2BuaGV3YAhuhkGiaMsJtWynq4ZdLz8nJfst5IHq8lFKIr0UayTmbh+gIuVNlGiH8uOh2MmsP9fXHyEK74VSzw/EMijfE5lUozamOIAie0OSQqqWhWq/VE1DQc6Eg8jHjhdILMHRfzTDzH/nhVpmSSaFGGk0GK0wqKny+m9MRdEKIItdG9i3380k8PKQidr4Cpnr610/jqVExoeWIKxgAg80P+A8z3k+Jilh1PVncSKpGYj8R5dvZDUfqjotGTZ4rBhL3cXkkcua2iqEYimjjrDNFi3qPu+yYAYYpq7bbEdCHrXvS8vYjNckwW8NUpNv7KWNa/a2GsdR+j/jAQdWn2mAss6aGqWzijqEwNaiUf2owlQpgUrD2AFMeGtFxD1N+r068EXzIrU+bHwqndd4HYD+OEgqDhFDOwDu+RJdnpX+6Wjekm3zWMbH2v7THWe92ZxYE1epB0PWSVKEWnmZjBwFzUp1VSZ+qEno1vqxuc07/+CXfbIgB5uOrpaiSVdUbagqoom7GmMo7wO4e9XjTO73plo/OWA7Pv2gJuG2SAqodq0h+Tnkz4eIFdeqmf75B6OnVKKv0GwflHRrKcnLVN2nKrO26kYfq4sBAuQBTvqrxZXXKhAIGPauivaJz4qxzoU0q109VI3C9v1QWDtfBN5HO5zeq7DctiffSNu3Pe1TGFgf6AEdRWwtQ0WKnP+L/m/HfrvT8wOqTUdO+BfseZvybdW+7sIgaXztQNlLQb3NHI4ot3+OT4zBRsid7q/FTxSASss/1Jxg+XR30RQJCa76xqCR9p3oeSrPYtRuVUphwEnqiI2nBmYil6wA4S6UVv8w85N/OeL0rg+UcqaavxCYNdGxXNGkJ3fQ61gby3GnzqMADNhl9DzL+zbq7Pb0oWIllpXuytposUWzHOfxsIK+WOjgcybc7VrOewy43n8FtG3X9UezaqT8/weEHBGeUV5oNufxIOAl+1evjNlBnIsxRJTC6pbEoPa4WpWP0DdK35kvq/CoWIItJpOMhNrs3JLZrgPwiJhTSZ/vKylKn9FItv0PhSH63JKz5GIiEwQKqFs8U9E+vFepXlaqTKzrlz/JM2LOkSnSr53kHUO7GPRSoEpSR+CZl6QCc0lxpafjIG/JMewhFk62MJI+aEgCTstYnn3/ThH+9zf6mDBHQ7qsNUp/jRX/26SkZrVPJJYZLMjipfBrajeYDQSlrHcui+22jMz8rfm5+1nJFvGn8KZzenPFdjS8zvjdjc8aAyRMZUGNq8z219TIwVdrafI8CdAxRGawoPBpGclaz0HwZlc8A/4f6tT46z4SN64Auy9Peq0VD5S+HvLPofyfA8vspZYdxxSK3UoGDACasxJhyMXjdHMh3EPt1a4P72GEnBPz2UCVLSK06qfPlI+P0iK/M/eeTNlAWZJQU5sVLdvX9mnvMmkCS5hY3WPPP/aAgy3r7HTlCejA6c+UR72kWK9gTrmpZhu9SyVEuamhFLWIGOSJidMmKcEEws5nIMo2YgMAOhmSSjXj1BMa4D7w3Koypq0oKDH/YbE8djKyRXVIC0/APfTtruo/a/r/uH2Dvqik5hotJVBbbbc1pihNr9NthDg97dAdnQ0Uenr+ja+WIQBKWCNT68K02Gtqn5DldchQNVklLK3pRf47Rah+a9b5oIX9mP7bddw/YDsecQrw5BbsSjtC6pU8oKPBYXmTv4/H7SbXQhwy00Q+0Oy/enju2y4umx9zATWCwC2NtygbrsKMS/8uhtVCaiWf1bigmf3QUhHqwyS0Zze5kg1BYt/jqAQLvqBbojipwH/ndNvJ7BVWwgoz1XF1MTHSVzEPo+viGTGt8tCYb7mUXMbERrjFMUhQTwWeSXD97RjL9uEGyZIcdAIcqj2W5uAQop1fHF03GUSGjU1SUmt6oH2XRFMgVs5sxsiXdRtEQal/oUZGRxU+tNYiy8OvzO7pN36B+SPaVV+kn+9beuEJqh7JLf0cPHeIQJYqN8S5xrsBmCNSf2k7BL4wY06dlGb7zodho5OABuIuAl4FanBLPrmLX++6xaQumzRmC8FDAPSN4tI3p+KV52+BCRFr+OGzMQJHSE5e7qKJ4VNG7ngOPIfAr/rzEi5eHfDXZIyn6SmwlHrrkk/L1Mtf30ykC37oFCKmWVLaaEVI08/Uq6S2/Idh89B9xhOMxefTdLjEtSal3hakbSmPmTvNgnhq+VaPnjhaq6DCqSFvtS4oCkN2OpiMzPFAWIwOXm9r699uwo0NlfQhcT5paYE16c3OLerAjIpgAdH9ehhq5TtSokj/ViIxNEhUDxzTwnlRsA6xixJiB90MPmE1EpYtcyUYB/yHgHVGTbfx/KcUXjZg1pPM5YeBmfjQOAf7o+oWuM3Jyigo8BPiqlC20XQQ1k/VFiAf34GrKKXLdDOL+XTgtmGU1gR6nX1NmrddwQ3FdO+q0/kSExDuicCVlLm3vRADdIGwKKF0FJ7ojN1kQNEIM27a4Rg5cxL1LPelfNHmi3zoY2rKGEnfQGxR3S2kibp6A7pTmmFKVCT3d3ggy7s68QVOrpsxat/C/2qk52BIpIkSV/pYsFs+dtFJ0WwB4czZxuVclf+eg7ULdedUqoKcktVmyUh1cywvFGamWVSwIPsTItCLwDbqSDvg5hkU4Dm9KKmEMyR1X+Q+qOsVdJzwiqg2mbBNCHaJdgcYZdwkLa7JlFBIhu7udLSb2P4GUTlGVrSeNr/fcIJls/zeg2U7oksfkn9vRevHUu+7oEvdKPSbju0olzULI0nXXTYKacO2C8bTuuwi42tz2BAHmn6dyFNVpfvtGz0Ze4jzIlu5TZkeU2G+20I2y06ue2KGNADW6VrRIEczdplYr5ufvN5iP7RYrje0Go/wpHYL8DLY/xrf3y9smXbedLfZx5nENsLAT8J+nBjac/fhwaiGLkDW1+/ajldEdXHDg1wGemV5TEDGcntq4ZEtQZo/v1ag+3Pd20PKL1oYfAO7a/NsnUZiqW9r8y6ftiMrg43xdT0xTaJH7oCKSdk98SfNQJbitHHAKZxu9AluU2OqYw239rpDkPES1XsHUEYTTLfRGp8cn6cVYGHBTJdlNT1qJaw2FWDCz9GoBuawWICYH2qHE2Chon0fVIiwvklJjYUpPLHrlfbyEbjRt/30vPokg8YEu3JT5xgo7xMZx2KRXgN/DNC/EwYjPtGVXnQ2iDainRhkhk4dqc94P6mQdHjKJBWFVFKlvcQnY+IDGj0cvyGmHp6SkHh4EP5m1OtVX3lNtxvi6mpJj2MCbH491qlTK9+yLoMJ6IVJjvuqyw9dYhPA+9O+s7j5mi0HYlm2WzmqOLVDv19OF3W2+cF/dIL/a+4+1JvVaYVCsp9SIKsjcn9aa2bULLWPWB7y0vFzecsAsYwKbCGWXUAVzyDOMgTeSBUP/TBuhtau8/FUWzjijIlxgX2LT5RQIwUDOF9SdFoWxzpazLeDgEe4ZV6Ptm4qz8fWP1/Tl0nvY77gQO3FBL+eCOf/oYwQctu6O3ZOuQa/nldR7UpfcOyeoOc419THFJsIKxQ9aAogNsQrMTxq1wm1eMWpiR8toUDebUg4xKZNwRjYf68+2+7BslBz2jZvpWNz/7P3FhT1n+8Lr6ryktcBa5oeCnlgBcJaGooDIy6yC5CReTIEmXzfHn32YWZuWzIsqUfkoJ2TcOQQsuscNq5BDg0ALkf8bno7R9KtoljeKq4Lj4zHl8WFVVWFVWZjyLPCVHcjhKGpH+4FzR7NgaAl2g0F7ytX15z/nKDYW2q24ian22vbVrHrbQO0ksVFt94FiDIJWRQAS31TIz41cryN2g9DCcG3Ze8VahcLN8jkoURozqoyOiowo+PVRsNHvErggjf26ltDEi9+kvjnrEHePwvQtFCfAbybGNCFJ8FGnuN7xa3ApcIMpnEBqRo4MeD791URItSPGVQfWsrc0uoR71xOSHCiCDnZDdFuNvbqFuJgupgg3hh7HmNUGV3mnNjErMXYPnfJGBc9kt7Zx8WFEo5MfEtjp2K0t3IAwvNHpD0lsUDXxmcjnePos5Tlr4VIbktf42OkY7C7367s7ihqC9Gz0oFdrLi+mHzNvsfdjBKyO0d5vxIm8XreUYKRTxlKBBkR7iYOJVMJLTcqJ6YyS3niKfUs0hNCZmkgkvprxrtMrMUXh1EY0okGXvv2fyVPuOdh6B6GMrRswDAGCow+PKMm0pLwxozA8ca1zTf2ojHQ8xzUjF/wpYQFlVn/hZbMuC2FdqM7fZtoj7OCNvyHJMnIsLllzWSsv7ry6l3wg10flnHp+3GllCPmakeyz7YZLzs5H/NuZr3eliynVdRDObD0Y77n9kU/Rwv7281fdAGEhv9z7y0fy+23vaERFcLXIFqd0cdTMkxb5Sj4k/m77c4sJ56Zc/BKRPm5fzbz+Z6h76ynuEH/y1rEl/LFh82Mgu1vH+6TUM1n9qPqFzjMy8krK6UH6/Np4T0FjaFivctli28ofJUUKGIYX+KfT5phNh0MWL/M/1/CupsiQGtjDCgWThakr+ndKd4+hK6RBj+i5MzfOL5XDtY/9xRMeYoYeFgb6yCPQFeChrs5xtj6CDcelRvvy/IMmIAofL8CknUAEUhDeJnFaSeCKt9wD/A5jucgzMcKOm2QHia/9dRWCLX29w/o6Qoi+xJIrVemLyu7B4cGaDHzHTAlQGcy0S21SJlLYo+RNbuB5TCOVUmY4dBji9DuwBYtf1Mf3GHTpyRwlNkS0GzxRdVcyV9UVq9fAd+R54Iv5Bf9ucznmcpxTHV1fQiglbD4DgixBzr2tzodcT0TVxzRKyOVkbfYEwv4ZNEBicnwy7rz3pRHweAYpQHMN8cBl47ItJy1GB00NB1mGg8A9r/C5QZmtcdKjOGKr0eeG805fKWdBc3yH4VC/4VCwuybHQmBLZ+SWJe+jkUpplN3H1Op2KG4NpI1G6iym7xoNv1hnaZRs1SujfcxuRVOXbG3/Wbq/a9suQJpQmDEPA7Q2Rnt9SD1jp5HJ9JLJtOFxSE9IT9oJg4yukK4GdiP7eThISL5k3zLZhn0qUYGmZBMPoqNBtD7H/WEBFAeQ8KQylYZ9CkXROK6PY5qjEOYYbT4TEM3jxs+FqDPYcyMRi6pUbyhmeeKz3BSfOA/J/9usWy3E8rl8s/mIxRH2nOOb1rb2tgs+jDZwro9ZAVFeXv5leFf5V/X1fypLlWyXDYee2D9YHxaRycm2a7RrqILmADqB0dgIiYxklmefZ38HvNzdb//gieHQsm2hkijSR+It6ap27nBq52ZyM0txpThwm3s78eeTYWCE0cOnE/Ukee4TUAoh60IIumVSNhmM9YfXJVI6gwdN8jBzrb2Y9H2a7EFUKojO3EgsAaFYmB9wEkGE5NsggeAQGsthp8NOcEbuBzFPTiUNmeRts6i5tMvxbX1WY/ajaYgiR1LWR5hGm0avrqZYlqLXMfDMfKgjlJMqJMQyovriAjDQNnE9EEIPZRmNKz5xxjHRDFREJhPLcsBysJExkMf1i/WbwrSXKIZi2U42ITYs0K3z2dhRr5GpxlM/j+EYPNE+Y31DNm8lXP2Y/4mcDxoFTuBNdCFh0B3biJHPQyo6K7oOQgmeTCQX5UGkFwfnkusikpcuHZBfw8XkYNchCUgSTWyfby8Oi4yIzsLmOlSfhuzErKQ5eN67q3/GOmEtCFX9BrMB0HnZAtsU21AGh3/uZMD+5HUJ66AYeFiqA5Vuz8Jy5KVilMiRLOD5MH2Zefa5dht7E+ySsQ6JHVEmgQRTgml6O8WN7A5sRHC0eaz5LXTD0TR0GgZpxUJsBDYnwJqbrJOF2WgxVCYr7+NnFWJJx5HFXukxWRjDuYdbTEbMyGYU8/39YXDk2urNP4EhS5XlXMa0m6GbA3/t3XN4X0xnXC9sn1IdT9xlCdH9y7ESSOQmxBgPlooXldhsXnqeB8bMVd5daad6QbIKQZoUx/PiedahEfDbSzVI9YsEviAngZvJzXnQYjrd9eYKLHGEnIwrEy7PnB+wN4X3FzILmeV1G2MaeM3+Rub6Y9lgqB/xzwbg1nDr/fXNDSZFGx444SFaEUh/kiwbSoWU4sHWhV4g+RD9SjxUaWLmOkz75w0P2sBW9W1fEqN1UdXCZzENTURf17jKEYIN/4xGsm4zUq22y8VUX6H2x/NiI/rdFUOiAQHTr3Kj8Gg8HtnrVOUR5RKW63sIjKe0OE+W6maUSKYQPX0woQq4HG6U4XCpeFHxiXObocI7NQz6b1RVENJhCAGtbtJdx49A4GeZ+rgn4LVTpc7niGL+8L17f/XPE5/PW61bHvg5tAZObthNShxchDckhSCFHDxn3Qhafg7k4jHt99GNBiYSsoQC2cCKdIhyuKuBqjmo2+3T60uPoHPi1/18mayXoV9j6qM4tugFeHOqGcWfLvaitqabqsXnNGDaTAZ+r8PzvHGijS+Q/QfQQCTtqhmRoFRM1pkZpMlUhSEJcdA1wbLvalkuoKT53Pa+ta7zsG0cttFM6LhosRGnxyQok1SmDXovUl/43sS0gwsyk2ZKN3MKlkFKwqcWVUjvHD92t3W13NoHGXkZ4nOVNtXWlSEptEQhTuD1cwHa/UMCQgrlEIwGPz87Et2abhWVDqHUUJpji2MbOJufCAeaPdXeJ8ovxjzHsoAEnJtfd3nW29hjT5/xBnHNNrGX9JZWE3k1tU22w/aBtmTbEH9ujlOTc0uMJKakAF+wrukZpPQ15HHL4D7yPAiSU/lLBI0kd8X5zoVOpBOmfahLVtqIqEvVYyTuoA3RhpDb3+/odq/hiuJs4m3XsfDhhhlGeSkIqRdQDlHruASnKqdqMPy8i01TZiiXG/RexL3wu4ppL6qbZiCiUyCApoiqSfm7CJcJeugIi9aWZfiI3AdxgfHUrWRVUlXfUvXmKlvEhbtQCxGsyHDHcaepPXtMsw6bFI0/YZxinGhJbebDp6lhVt8R+aTkJP7e3cRx0nixoFSwCSXTyNTAu+LdHJlOYRgBRpiEkHmnKiJZnUnJSsnslgApisSdqLHps+ljZYbn5PkU+XbKG3Trpi7eFPUgvIzyAklqnIO6FeD17nXfYWu+tyTSMosi+GDyTr7mByUaLLw8h4RW7ZhD2vs1822PQmLeNgQjKCTYdKa8flt5rfPnsvTK9FcIZs8ws+c4gkvhUoaomtHltSPl9apEPxCWTRci1J5eGIZet7hrj0L93UM92Jb9VkNlOaZ4c+IjXH0+Zp0AnzG52WfJZymen8AvSgI3slsgokLGtSwkkBXETwfvcG/2lkbzZvMWfA4+h0ONCBQgZeqjdSnxlETbCdvtVTAfC3QIiF0Xr9/t/Hub82+1EAifYg32IJkpzNT94Naw1Lz3hzG9ZpxWParBTA7h74GAloOtBwDDGsScTqzIXc9UUyLRR41Z3czuQhd4u9FSyZzcY8bsYHaBM/XPV6YREXABkhITk84Ce8u+bfvs8qiWdGsHRpkdCNIaQ9AsdFf1fxeNIchsm+4re3Pz7luQkyXK9ToVBs1ueC+i5CIkNSe16kCrB8WLUnAVkpoSm0ELuQJJ4uTCf0Zcj7qdjKiKqivBlxEG9ycvzMJNpojsvzJUWCHgod/j2QVJOfw8z+eZKlwiwh5cUwYr7a8oIhMUnR9XsqfVKdICo9rzg3rZIBg/dR03GRrUNv/n9umsCw3zqgeXtw+PNoln8A7h5balWds2GmwOMdiUUxRAgm8ujmESa4loU6tJb75ZW3IBmcUxCQtfy3B81ul5+9S+zqajRIDLsedh4V2q+zENKTN3y8PCsZASmQEFhTp0cb4mOx9VXGdaUrW+vXXI6TNuRlQdHKGVWu7u++4BdDTVcCNdsjxRxXRNNh1d7FlCT2QJ8uSqehyg8Syl5gsOAxY9eh007qLkzLDwJYDu/+2v79PYhiZYOgZNG0r7lTXJbj0hB+q4u2X6v4ewrWPp+B7Ebli/YoEukx/W9naap25h1r8ZXE5rGxbYl5JAdmaeNfe2e9ufUOU+pLlIAbVMl1blj7+sucAKcrNNz/Zw1lzY23wUCKCfixU/K/as2LNiky7qtZrPdUU7q+tZXY1rxxTWw56L686KOytuLq6r8xMgV7NJfxKtBWRgXSj35K6961t17Vv/YZdg/aUT8zf+SgIRj/4Vo9JTYlTYwIGTBRsu2WL0q9gecwiQNXGCU9fen60yAkuqUH4YBv06Fl53aNe1d2bVtW/28CTBbEkA/SgWTXePRcMqB7oEq5YENUkeBaJzyXSozS+wAKQtR5aN5W/ZW1jL0XK2XCxXy83ysvws31S4jLk10g/Xbs3wJTIn6fmGrBaoTn/fGu2TfwDD/r+1vs9RqjfgHQqzOu2tWcibYMWho4LsnHfvP3z89Pm7Hv1xcQMs9qp485Fi+zO/U77ov3x/5soYUtT/vXMDUN4qxpyYZPXP/7p7FDNvr6q+0tx0TFVLpUXLPtr3Ey1Zr07or5kOot46Rp71h710THNu79sNRrUmGrX+ev4/03tVB2rSZ1NrisWez1ulP5MmUI9ZZ+Dkk9apkz9badt+cMVqeLT0z17NQ7q++egEsGP3X5SG51pdWCfYsb1FsQz6tRdf1famb2C1gB1z4faj1D6fD7IGsGOcumeA/uDHTam96rIZA2vk5KdD2fuukc8WR2tvr4Oan2+6Gq8F1ojcTfn9gO4DP86d9WK5I4YQPDh/NNI0ayhKtafdWWqMrRFzC+5268hn+/NVb68FbKRYnnC+uT+SA0bePD/KP0tHi9NDL/cq3bwFjrNcaXvXy016uboqTqtn249epQUOstwKt2nv6LXxUXMlTz4MMuzD7ra8OId7QOW2MGPBddTHfqh5g/F+ZLrfJ9DTQdQTaOEHfN0dg/S5n2r1GEc2q+um0fGcnikcrGf9WJP8o3Q+SvWE5vl4e1fzQJVz2x8ZG2rNdFiAAX6L7VsnIE8z0BZ+YHtZO9DM8+1DV2NYZFet7E0gc44HhdjlBt/XJJ5tvDl3KtQsM1H7nIQAsve7sy5fk0v8fiooT/zcxN7WmZk1J9YZpCiQAsE0+Lk9IdTPoRaqD0UKHa+8CgSQNbDfvsjTpA7xny8cdLNccrMKOVuCm3ztmsfBpZQPaotUNseYq36Va9CvbzdVnM1DMTQ5HUPOeei7BlyPIffMeumg5ai6EiVnPM2w2k4ayp7McDxoV6PveVrLa5VcjZn6mhtDk0/ieOB4FMz4pJTqmPGdn/Zqa62BnCa0kviYsS+MaOnByWKWUMkGOpDoWHA+057NYfyyPxIJOSdZtSz2v5piaYKbxJCHHTFEtRMQnM/hQNeMSqduoXkMh8om4FY38jy2LQjjWPUMST4kNip0LVXcxrzjdQlBDNvaSMCIPJ8WkOY3/xkM7ZHRriFsH2wVpcQGoTZ5opZie8gZPZFCaY/oQXVXBdPWmSsMERfVeex9T3vA55HNh571hjdcjLHLzvs450hajw850kz/IrHFjUWRxSJDihk3rcB953WkbZocEOcARSwh74RCzt86pjFTqeUKPZMs7Miv/41xyowJnc7JlFp3pVmuXD4WMBrftRB5Um8Rx6nNfzG76QzSEHUK3AoAgpp5UlScJ43oPhkGIZOFT97KUd0gb2dBUGDXSVNk0FEolQ9KTJnfeCsVTePfVPEmF25qIqZXHXVMqWTC3ChI0Ci8gGBYI8edeoJtwo5B8rlURoYyZO7Js5w0iRM7hTyyso4daZS0pqExJB5Crgm1KSSyPQF2zmyLHeqhouBzwd2NtvZSk4+XRp6iryzZqIUa8Y52pcuORwTSsua41sk/VxrByKrG49BDJbV6WICCTzeAT04k0wakbY94TT8FIdkGpG0CTs1Z3aLghFVKQYbJ1WL+AUFQQlFg1AsL2+uB/+IfdpBftV+dsTz7ByGUP6u3uFY6wPbgXe6PHbXOmc6LalGpeAAf0X1ZqbBd3mlBpnHpbnnxg6zAhKXOWSDHqjmfdEpX+DpQIIJNqyctJnCb4vHERkQRLbftBo/yg2vTnPKAvz0QfzOwEzFP6UILBqgl/L3XkX9WzPmNBev/FQWbHCyuobWDwpacJSRvoB4w9E3II1t7fE1+x1V4g0HfgDfa8tk1HNDiOKmrQUs7wrjRqxjAQAcI26JGZsg6FDX7jtDlaNSrtdNeWHuGLqzfqFQGQwHqnhAeJ/cKdBFGFm9mrBayb0L6MNeZpxWOm2fgOIOTt/phr79FWA6KQDNlqqB0xNfONEENGi9p1cIsXSiLDI3VS/Kk7uQL9dAI6UgL6kSAWcF9MtJYVAENQSnZE1E2WEHww39z5hpZkFgfUNFDulO73svQ+lHLqaQh3OY2nURhODJHjdZbsiTjSNVymA+lXZcUmSBdG8VACv/jJEj+C4i6EDBQoxsHAjXSbIy4tACgUKlBn5Tr/dfTNcKeb9Ivkf8xkZNdiCbHXDTlUXtoGI8pP+WYMgv7IrgIB280GoPAUphHeHYtuC3WX6xMFgQzl5gwZDSFgyNb1NHOXgsU76LnPdvpoXrdr/V2dv1CDnwRds6oy6QLP7KqERMIUZi5zT2to+ojrTX+DWNIZi48HdmsrkjBr3HR5lhE6fNcn7f+SoS1vj6mL7jmqp1h6cQQJgVqoDd9+eWrDeLdt+BPson7hDIlRSLx6aekrIdMhglvOPH8pbnHBZx0iXzNWFfAeReCnZUJmvQ4/SB5DrotcMBWH6Ce+CFCEhKwbHPKDIha/jqSH/VB/jHiao13Yb9mNQ35SIowBSOw/fEDi+LpPOH0gONG5SwN43oUoVmmkhU0txODIXi4axeOnLj15AS1o+GlUYRNC/A7If0+ma0/i37MElJA+wJWfRIBxIEJwv77OZT3Lw9j6tR7aYMtdhh3W63uSKXTrl+TU+5HxlY7feUL3xg147xzdkuW4qJUyy64YsUllwlcd9VfZqX5QKdbbrhJ6D8Z0mXKliVXHhGxfIUKFClWQqJUmQrl9huxXqUq1d446G+HrOkz+viWyy6ptLFsx/V8Hl8gFInl5BUUlZRVJKpSNXUNTS1tHV09fQPDqLWzsYmpmbmFpZW1ja2dvYOjk7OLTKvTG4wms8VqszucLrfH6/O/9SpqlXLrOTMLObWktmioeRs7KhZn2Pf4wLYNPk+sV53R888WzE5iwXNtDM4vzGexV2gtLq+x5xKnN3F6G6fvanVH/Hiq9PRezR5rs3hSVY+zZ4yrl0+Gs/sakEfSu++L3+U2CNWgnFZ6Yaakf1Xs6AYKK1BltVYnvreTPlMdp//VykjpnbnStvTZjLwcCCyCBUGstxgcLyqcO372xeQ/p37TnJOZMGfBFktWDGyzZodd9mK/s5gJU2bMWbDFkhUDu6k36sODkKt/PnqsPHqeIO6+OUeQjNu7cR7kj3gKBgXsrkx/3pBVn5TJ/oy+NHptS/GItxJkQKHYiPJNAA+/9Q7IrzcRTTei57KmnyZJoe2ig6IKRH3L3EZEPyrPv+19qSWreSG1cIdX+VN/tz/Oe/mbesoC8lEAAA==" };
        a.cousineRFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.tinosBFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.tinosBIFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.tinosIFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.tinosRFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.mathBFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.mathRFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
        a.addFonts = function() {
            return "@font-face{font-family:'DJS_sansserif';src:url('" + a.arimoBFont() + "') format('woff2');font-style:normal;font-weight:bold;}\n@font-face{font-family:'DJS_sansserif';src:url('" + a.arimoBIFont() + "') format('woff2');font-style:italic;font-weight:bold;}\n@font-face{font-family:'DJS_sansserif';src:url('" + a.arimoIFont() + "') format('woff2');font-style:italic;font-weight:normal;}\n@font-face{font-family:'DJS_sansserif';src:url('" + a.arimoRFont() + "') format('woff2');font-style:normal;font-weight:normal;}\n@font-face{font-family:'DJS_monospace';src:url('" +
                a.cousineBFont() + "') format('woff2');font-style:normal;font-weight:bold;}\n@font-face{font-family:'DJS_monospace';src:url('" + a.cousineBIFont() + "') format('woff2');font-style:italic;font-weight:bold;}\n@font-face{font-family:'DJS_monospace';src:url('" + a.cousineIFont() + "') format('woff2');font-style:italic;font-weight:normal;}\n@font-face{font-family:'DJS_monospace';src:url('" + a.cousineRFont() + "') format('woff2');font-style:normal;font-weight:normal;}\n@font-face{font-family:'DJS_serif';src:url('" +
                a.tinosBFont() + "') format('woff2');font-style:normal;font-weight:bold;}\n@font-face{font-family:'DJS_serif';src:url('" + a.tinosBIFont() + "') format('woff2');font-style:italic;font-weight:bold;}\n@font-face{font-family:'DJS_serif';src:url('" + a.tinosIFont() + "') format('woff2');font-style:italic;font-weight:normal;}\n@font-face{font-family:'DJS_serif';src:url('" + a.tinosRFont() + "') format('woff2');font-style:normal;font-weight:normal;}\n@font-face{font-family:'DJS_math';src:url('" + a.mathBFont() + "') format('woff2');font-style:normal;font-weight:bold;}\n@font-face{font-family:'DJS_math';src:url('" +
                a.mathBFont() + "') format('woff2');font-style:italic;font-weight:bold;}\n@font-face{font-family:'DJS_math';src:url('" + a.mathRFont() + "') format('woff2');font-style:italic;font-weight:normal;}\n@font-face{font-family:'DJS_math';src:url('" + a.mathRFont() + "') format('woff2');font-style:normal;font-weight:normal;}\n"
        };
        return a
    }(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    a.symbolFont = function() { return "data:font/woff2;charset=utf-8;base64,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" };
    a.addSymbolFont =
        function() { return "@font-face{font-family:'DJS_symbol';src:url('" + a.symbolFont() + "') format('woff2');font-style:normal;font-weight:bold;}\n@font-face{font-family:'DJS_symbol';src:url('" + a.symbolFont() + "') format('woff2');font-style:italic;font-weight:bold;}\n@font-face{font-family:'DJS_symbol';src:url('" + a.symbolFont() + "') format('woff2');font-style:italic;font-weight:normal;}\n@font-face{font-family:'DJS_symbol';src:url('" + a.symbolFont() + "') format('woff2');font-style:normal;font-weight:normal;}\n" };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r = { bold: "Bold", italic: "Italic", italics: "Italic", "bold+italic": "Italic Bold" };
    a.serif_font = "descartesJS_serif,DJS_symbol,DJS_serif,Times,'Times New Roman','Liberation Serif','Nimbus Roman No9 L Regular',serif";
    a.sansserif_font = "descartesJS_sansserif,DJS_symbol,DJS_sansserif,Helvetica,Arial,'Liberation Sans','Nimbus Sans L',sans-serif";
    a.monospace_font = "descartesJS_monospace,DJS_symbol,DJS_monospace,'Courier New',Courier,'Liberation Mono','Nimbus Mono L',monospace";
    a.math_font =
        "descartesJS_math,DJS_symbol,DJS_math,DJS_serif,Times,'Times New Roman','Liberation Serif','Nimbus Roman No9 L Regular',serif";
    a.convertFont = function(e) {
        if ("" == e) return "";
        g = e.split(",");
        f = "";
        f += a.getFontStyle(g[1]) + " ";
        f += g[2] + "px ";
        return f += a.getFontName(g[0].split(" ")[0])
    };
    a.getFontName = function(f) {
        f = f.toLowerCase();
        e = a.monospace_font;
        if ("serif" === f || "times new roman" === f || "timesroman" === f || "times" === f) e = a.serif_font;
        else if ("sansserif" === f || "arial" === f || "helvetica" === f) e = a.sansserif_font;
        return e
    };
    a.getFontStyle = function(a) { return r[a.toLowerCase()] || "" };
    a.getTextWidth = function(f, c) { a.ctx.font = c; return Math.round(a.ctx.measureText(f).width) };
    a.getFieldFontSize = function(a) { a = Math.min(50, a); return a = 24 <= a ? Math.floor(a / 2 + 2 - a / 16) : 20 <= a ? 12 : 17 <= a ? 11 : 15 <= a ? 10 : 9 };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g() {
        var a, b, d, c, h, m, f;
        Number.prototype.oToFixed = Number.prototype.toFixed;
        Number.prototype.toFixed = function(q) {
            q = q || 0;
            q = 0 > q ? 0 : parseInt(q);
            a = this.toString(); - 1 !== a.indexOf("e") && (c = a.split("e"), m = "-" === c[0][0] ? "-" : "", h = "-" === m ? parseFloat(c[0].substring(1)).oToFixed(11) : parseFloat(c[0]).oToFixed(11), f = parseInt(c[1]), b = h.indexOf("."), h = h.replace(".", ""), 0 > b + f ? (b = 0 > b ? 1 : b, a = m + "0." + "0".repeat(Math.abs(b + f)) + h) : a = m + h + "0".repeat(f - h.length + 1));
            b = a.indexOf("."); - 1 === b ? 0 < q &&
                (a += "." + "0".repeat(q)) : (d = a.length - b - 1, a = d >= q ? 11 >= q ? parseFloat(a).oToFixed(q) : a.substring(0, b + q + 1) : a + "0".repeat(q - d));
            return a
        }
    }
    if (a.loadLib) return a;
    var f = 2 * Math.PI,
        e = 360 / f,
        r = f / 360,
        p = Math.floor,
        c, k, l, b;
    a.rangeOK = 1;
    a.cssScale = 1;
    a.radToDeg = function(a) { return a * e };
    a.degToRad = function(a) { return a * r };
    a.drawLine = function(a, d, c, h, f, m, e) {
        a.lineWidth = e || 1;
        a.strokeStyle = m || "black";
        b = a.lineWidth % 2 * .5;
        a.beginPath();
        a.moveTo(p(d) + b, p(c) + b);
        a.lineTo(p(h) + b, p(f) + b);
        a.stroke()
    };
    a.getColor = function(a, b) {
        if ("string" ===
            typeof b) return b;
        c = a.eval(b);
        return "rgba(" + p(255 * c[0][0]) + "," + p(255 * c[0][1]) + "," + p(255 * c[0][2]) + "," + (1 - c[0][3]) + ")"
    };
    a.getFeatures = function() {
        var b = navigator.appVersion.toLowerCase();
        a.hasTouchSupport = window.hasOwnProperty && window.hasOwnProperty("ontouchstart") || "ontouchstart" in window || /android/i.test(b);
        a.isIOS = /iPad|iPhone/i.test(navigator.userAgent);
        a.isMsEdge = /Edge/i.test(navigator.userAgent);
        b = a.newHTML("canvas");
        a.hasCanvas = b.getContext && b.getContext("2d");
        a.hasCanvas && (b.width = b.height = 1,
            a.ctx = a.hasCanvas, a._ratio = 2);
        g()
    };
    var h, d;
    a.removeNeedlessDecimals = function(a) {
        if ("string" == typeof a && (h = a.indexOf("."), -1 !== h)) {
            d = a.substring(h);
            if (0 == parseFloat(d)) return a.substring(0, h);
            for (var b = d.length - 1; 0 < b; b--)
                if ("0" !== d.charAt(b)) return a.substring(0, h + b + 1)
        }
        return a
    };
    a.returnValue = function(a) { return "number" === typeof a ? parseFloat(a.toFixed(11)) : a };
    a.whichBtn = function(a) { return a.touches ? "L" : 0 === a.button ? "L" : 1 === a.button ? "M" : "R" };
    a.createGradient = function(a, b, d) {
        a = void 0 === a ? 0 : a;
        b = void 0 ===
            b ? 100 : b;
        d = "linear-gradient(" + (void 0 === d ? 0 : d) + "deg,";
        for (var c = 2 * a, h = a; h < b; h++) a = p(100 - h - 35), d += "rgba(0,0,0," + a * a * 192 / 1E4 / 255 + ") " + (2 * h - c) + "%, ";
        return d + "rgba(0,0,0,0.1) 100%)"
    };
    a.getCursorPosition = function(b, d) {
        k = b.touches ? b.touches[0] : b;
        l = d.getBoundingClientRect();
        return k ? { x: (k.pageX - window.pageXOffset - l.left) / a.cssScale, y: (k.pageY - window.pageYOffset - l.top) / a.cssScale } : null
    };
    a.splitSeparator = function(a) {
        a = a.replace(/\\n/g, "\n");
        for (var b = !1, d, c = [], h = 0, m = 0, f = a.length; m < f; m++) d = a.charAt(m), "'" ===
            d && (b = !b), b || ";" !== d && "\n" !== d || (c.push(a.substring(h, m).replace(/\n/g, "\\n")), h = m + 1);
        c.push(a.substring(h).replace(/\n/g, "\\n"));
        return c
    };
    a.preventDefault = function(a) { a.preventDefault(); return !1 };
    a.convertHTMLEntities = function(b) {
        var d = a.newHTML("textarea");
        d.innerHTML = b;
        return d.value
    };
    a.newHTML = function(a, b) { a = document.createElement(a); for (var d in b) a.setAttribute(d, b[d]); return a };
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    a.setInterval = function(a, b) {
        function d() {
            Date.now() - c >= b && (a.call(), c = Date.now());
            h.value = requestAnimationFrame(d)
        }
        if (!requestAnimationFrame) return setInterval(a, b);
        var c = Date.now(),
            h = {};
        h.value = requestAnimationFrame(d);
        return h
    };
    a.clearInterval = function(a) { a && (cancelAnimationFrame ? cancelAnimationFrame(a.value) : clearInterval(a)) };
    a.setTimeout = function(a, b) {
        function d() {
            Date.now() -
                c >= b ? a.call() : h.value = requestAnimationFrame(d)
        }
        if (!requestAnimationFrame) return setTimeout(a, b);
        var c = Date.now(),
            h = {};
        h.value = requestAnimationFrame(d);
        return h
    };
    a.clearTimeout = function(a) { a && (cancelAnimationFrame ? cancelAnimationFrame(a.value) : clearTimeout(a)) };
    a.showAbout = function() {
        var b = "<html>\n<head>\n<style>\nbody{text-align:center;}\niframe{width:650px;height:73px;overflow:hidden;border:1px solid black;}\ndt{font-weight:bold;margin-top:10px;}\n</style>\n</head>\n<body>\n<iframe src='http://arquimedes.matem.unam.mx/Descartes5/creditos/bannerPatrocinadores.html'></iframe>\n<h2><a href='http://proyectodescartes.org/' target='_blank'>ProyectoDescartes.org</a><br><a href='http://descartesjs.org' target='_blank'>DescartesJS.org</a></h2>\n<dl>\n<dt>Dise\u00f1o funcional:</dt>\n<dd>\n<nobr>Jos\u00e9 Luis Abreu Leon,</nobr>\n<nobr>Jos\u00e9 R. Galo Sanchez,</nobr>\n<nobr>Juan Madrigal Muga</nobr>\n</dd>\n<dt>Autores del software:</dt>\n<dd>\n<nobr>Jos\u00e9 Luis Abreu Leon,</nobr>\n<nobr>Marta Oliver\u00e1 Serrat,</nobr>\n<nobr>Oscar Escamilla Gonz\u00e1lez,</nobr>\n<nobr>Joel Espinosa Longi</nobr>\n</dd></dl>\n<p>\nEl software en Java est\u00e1 bajo la licencia\n<a href='https://joinup.ec.europa.eu/software/page/eupl/licence-eupl'>EUPL v.1.1</a>\n<br>\nEl software en JavaScript est\u00e1 bajo licencia\n<a href='http://www.gnu.org/licenses/lgpl.html'>LGPL</a>\n</p>\n<p>\nLa documentaci\u00f3n y el c\u00f3digo fuente se encuentran en :\n<br>\n<a href='http://descartes.matem.unam.mx/'>http://descartes.matem.unam.mx/</a>\n</p>";
        a.ccLicense && (b += "<p>\nEste objeto, creado con Descartes, est\u00e1 licenciado\npor sus autores como\n<a href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'><nobr>Creative Commons</nobr></a>\n<br>\n<a href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'><img src='https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png'></a>\n</p>");
        b += "</body> </html>";
        var d = window.open("", "creditos", "width=700,height=500,titlebar=0,toolbar=0,location=0,menubar=0,resizable=0,scrollbars=0,status=0");
        d.document.write(b);
        d.document.close()
    };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    a.cacheFiles = Object.create(null);
    a.openExternalFile = function(g) {
        if (a.cacheFiles[g]) return a.cacheFiles[g];
        var f = null,
            e = new XMLHttpRequest;
        e.open("GET", g, !1);
        try { e.send(null), f = 200 === e.status || 304 === e.status ? e.responseText : e.responseText || "", f = 404 === e.status ? "" : f, f.match(String.fromCharCode(65533)) && (e.open("GET", g, !1), e.overrideMimeType("text/plain;charset=ISO-8859-1"), e.send(null), f = e.responseText) } catch (r) { f = null }
        return f
    };
    a.addExternalFileContent = function(g,
        f) { a.cacheFiles[g] = f };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a) {
        A = a.indexOf("--radial--"); - 1 != A && (a = a.substring(0, A));
        p = a.trim();
        a = { ignoreAccents: !1, ignoreCaps: !1, regExp: null };
        p[0] == p[p.length - 1] && "'" == p[0] && (a.ignoreCaps = !0, p = p.substring(1, p.length - 1), "`" == p[0] && "\u00b4" == p[p.length - 1] && (a.ignoreAccents = !0, p = p.substring(1, p.length - 1)));
        "`" == p[0] && "\u00b4" == p[p.length - 1] && (a.ignoreAccents = !0, p = p.substring(1, p.length - 1), p[0] == p[p.length - 1] && "'" == p[0] && (a.ignoreCaps = !0, p = p.substring(1, p.length - 1)));
        "*" === p.charAt(0) && "*" !==
            p.charAt(p.length - 1) ? p = p.substring(1) + "$" : "*" !== p.charAt(0) && "*" === p.charAt(p.length - 1) ? p = "^" + p.substring(0, p.length - 1) : "*" !== p.charAt(0) && "*" !== p.charAt(p.length - 1) ? p = "^" + p + "$" : "*" === p.charAt(0) && "*" === p.charAt(p.length - 1) && (p = p.substring(1, p.length - 1));
        a.regExp = p.replace(/\?/g, "[\\S\\s]{1}");
        return a
    }

    function f(a, b) {
        p = (a || "").trim();
        a = { ignoreAccents: !1, ignoreCaps: !1, regExp: null };
        a.expr = p.split(",");
        a.expr[0] = a.expr[0].trim();
        a.expr[0] = { type: a.expr[0].charAt(0), expr: b.parser.parse(a.expr[0].substring(1)) };
        a.expr[1] = a.expr[1].trim();
        a.expr[1] = { type: a.expr[1].charAt(a.expr[1].length - 1), expr: b.parser.parse(a.expr[1].substring(0, a.expr[1].length - 1)) };
        return a
    }

    function e(a, m, c) {
        m = parseFloat(m);
        b = a.expr[0];
        h = a.expr[1];
        d = c.eval(b.expr);
        v = c.eval(h.expr);
        q = "(" == b.type || "[" == b.type;
        u = ")" == h.type || "]" == h.type;
        return q && m > d && u && m <= v ? 1 : 0
    }

    function r(a) {
        return a.toString().replace(/\u00e1/g, "a").replace(/\u00e9/g, "e").replace(/\u00ed/g, "i").replace(/\u00f3/g, "o").replace(/\u00fa/g, "u").replace(/\u00c1/g, "A").replace(/\u00c9/g,
            "E").replace(/\u00cd/g, "I").replace(/\u00d3/g, "O").replace(/\u00da/g, "U").replace(/\u00f1/g, "n").replace(/\u00d1/g, "N")
    }
    if (a.loadLib) return a;
    var p, c, k, l, b, h, d, v, q, u, A;
    a.buildRegularExpressionsPatterns = function(a, b) {
        a = a || "";
        "(" === a.charAt(0) && ")" === a.charAt(a.length - 1) && -1 === a.indexOf(",") && (a = a.substring(1, a.length - 1));
        a = a.replace(/&squot;/g, "'").replace(/&amp;/g, "&").split("|");
        for (var d = 0, m = a.length; d < m; d++) {
            c = a[d].split("&");
            k = [];
            for (var h = 0, e = c.length; h < e; h++) p = c[h], -1 === p.indexOf(",") || "(" !==
                p.charAt(0) && "[" !== p.charAt(0) || ")" !== p.charAt(p.length - 1) && "]" !== p.charAt(p.length - 1) ? k.push(g(p)) : k.push(f(p, b));
            a[d] = k
        }
        return a
    };
    a.escorrecto = function(b, d, h, f) {
        h = h || a.externalEvaluator;
        f = f || a.buildRegularExpressionsPatterns(b, h);
        d = r(d);
        b = 0;
        for (var m = f.length; b < m; b++) {
            c = f[b];
            l = !0;
            for (var k = 0, q = c.length; k < q; k++) l = c[k].regExp ? l && !!d.match(new RegExp(r(c[k].regExp), "i")) : l && e(c[k], d, h);
            if (l) return 1
        }
        return 0
    };
    a.esCorrecto = function(b, d, h, f) {
        h = h || a.externalEvaluator;
        f = f || a.buildRegularExpressionsPatterns(b,
            h);
        b = 0;
        for (var m = f.length; b < m; b++) {
            c = f[b];
            l = !0;
            for (var k = 0, q = c.length; k < q; k++)(p = c[k].regExp) ? (c[k].ignoreAccents && (d = r(d), p = r(p)), c[k].ignoreCaps && (d = d.toLowerCase(), p = r(p).toLowerCase()), l = l && !!d.match(p)) : l = l = l && e(c[k], d, h);
            if (l) return 1
        }
        return 0
    };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    a.loaderImg = new Image;
    a.loaderImg.src = "data:image/svg+xml;base64," + btoa("<svg xmlns='http://www.w3.org/2000/svg' width='880' height='840' viewBox='0 0 880 840'><path d='M440 80c-132.5 0-240 107.5-240 240s107.5 240 240 240 240-107.5 240-240S572.5 80 440 80zm-11.1 462.2c-122.7 0-224.4-99.5-224.4-222.2S306.2 97.8 428.9 97.8 651.1 197.3 651.1 320s-99.5 222.2-222.2 222.2zm-11.1-426.6c-112.9 0-208.9 91.5-208.9 204.4s96 204.4 208.9 204.4S622.2 432.9 622.2 320s-91.5-204.4-204.4-204.4zm-11.1 391.1c-103.1 0-193.3-83.6-193.3-186.7s90.2-186.7 193.3-186.7S593.3 216.9 593.3 320s-83.5 186.7-186.6 186.7zm-11.1-355.6c-93.3 0-177.8 75.6-177.8 168.9s84.5 168.9 177.8 168.9S564.4 413.3 564.4 320c0-93.3-75.6-168.9-168.8-168.9zm-11.2 320c-83.5 0-162.2-67.7-162.2-151.1S301 168.9 384.4 168.9 535.6 236.5 535.6 320s-67.7 151.1-151.2 151.1zm-11.1-284.4c-73.6 0-146.7 59.7-146.7 133.3s73 133.3 146.7 133.3S506.7 393.6 506.7 320 447 186.7 373.3 186.7zm-11.1 248.9c-63.8 0-131.1-51.7-131.1-115.6s67.3-115.6 131.1-115.6S477.8 256.2 477.8 320 426 435.6 362.2 435.6zm-11.1-213.4c-54 0-115.6 43.8-115.6 97.8s61.6 97.8 115.6 97.8c54 0 97.8-43.8 97.8-97.8s-43.8-97.8-97.8-97.8zM340 400c-44.2 0-100-35.8-100-80s55.8-80 100-80 80 35.8 80 80-35.8 80-80 80z' fill='#2daae4'/><path d='M115.8 600.7c32.5 0 48.8 24.8 48.8 49.7 0 24.9-16.2 49.6-48.8 49.6H80.2v-99.3zm0 85c23 0 34.6-17.6 34.6-35.2s-11.6-35.4-34.6-35.4H94.5v70.6zm118.2 0V700h-60.6v-99.3h60.5V615h-46v28h45v14.5h-45l-.05 28.2zm42.2.9c10.6 0 22.3-6 22.3-16.2 0-1-.1-2.1-.4-3.4-1.7-7.5-11.9-8.8-21.9-9.8-15.5-1.6-33.7-5-35.2-25.65-.6-6.65 1.1-13.25 5.4-18.85 6.7-8.7 18.6-13.2 30.1-13.2 15.3 0 31.2 8 33.8 26.1l-14.3.7c-2-8.9-11.6-12.8-20.3-12.6-6.7.1-14.1 2.4-18 7.5-2 2.6-2.7 5.8-2.4 9.2.7 10.2 11.9 11.5 22.6 12.5 13.6 1.7 30.5 5.3 34.4 21.2.4 2.1.7 4.5.7 6.5 0 19.2-19 30.2-36.9 30.2-15.3 0-33.9-9.1-35.8-26.8l-.1-2.7 14.5-.3.1 1.8c1 8.9 12.2 13.8 21.4 13.8zm58-71.7c8.7-8.9 20.9-14.8 34.4-14.8 22.7 0 40.6 14.2 46.3 36.6h-14.2c-5.3-14.9-17.5-22.4-32.1-22.4-9.5 0-18.2 4.1-24.4 10.7-6.2 6.5-10.2 15.3-10.2 25.6 0 9.9 4 18.7 10.2 25.3 6.2 6.6 14.9 10.6 24.4 10.6 15.1 0 27.8-8.7 32.9-23.7h14.1c-5.7 22.6-23.9 37.9-47 37.9-13.5 0-25.7-5.7-34.4-14.8-8.5-9.1-14.2-21.6-14.2-35.4 0-14 5.7-26.5 14.2-35.6zm144.6 55.8h-35.6c-3.8 9.1-8.8 21-11.9 29.3h-15.5l39.9-100.7h10.5L506 700h-15.3zm-30.3-13.4h24.7L461 622.2zm96.9-7.7c12.1 0 18-8.7 18-17.3 0-8.5-6-17.2-18-17.2h-22V700h-14.2v-99.4h36.2c21.6 0 32.4 15.9 32.4 31.7 0 14.1-8.7 27.4-25.7 30.4l31.4 37.3h-18.6l-36.2-43.6-.05-6.8zm64.9 50.8v-85.3h-30.1v-14.5h74.4v14.5h-30v85.3zm112.2-14.7V700H662v-99.3h60.5V615h-46v28h45v14.5h-45l-.05 28.2zm42.3.9c10.6 0 22.3-6 22.3-16.2 0-1-.1-2.1-.4-3.4-1.7-7.5-11.9-8.8-21.9-9.8-15.5-1.6-33.7-5-35.2-25.65-.6-6.65 1.1-13.25 5.4-18.85 6.7-8.7 18.6-13.2 30.1-13.2 15.3 0 31.2 8 33.8 26.1l-14.3.7c-2-8.9-11.6-12.8-20.3-12.6-6.7.1-14.1 2.4-18 7.5-2 2.6-2.7 5.8-2.4 9.2.7 10.2 11.9 11.5 22.6 12.5 13.6 1.7 30.5 5.3 34.4 21.2.4 2.1.7 4.5.7 6.5 0 19.2-19 30.2-36.9 30.2-15.3 0-33.9-9.1-35.8-26.8l-.1-2.7 14.5-.3.1 1.8c1 8.9 12.2 13.8 21.4 13.8z' fill='#868686'/></svg>");
    a.getCCLImg =
        function() {
            var a = new Image;
            a.src = "data:image/svg+xml;base64," + btoa("<svg xmlns='http://www.w3.org/2000/svg' width='88' height='31' viewBox='0 0 120 42'><path fill='#aab2ab' stroke='#000' d='M.5.5h119v41H.5z'/><path d='M0 29.5h120V42H0z'/><circle cx='21' cy='19.5' r='18.25' fill='#aab2ab'/><path d='M49.935 33.105c.364.298.585.806.585 1.284 0 .403-.07.592-.228.833-.158.242-.377.405-.674.547.41.118.715.323.917.617.202.294.303.649.303 1.063 0 .68-.302 1.117-.721 1.465-.432.359-1.067.455-1.622.455H45.28v-6.622h3.122c.579 0 1.127.025 1.533.358zM48.8 35.24c.175-.141.307-.323.307-.6 0-.331-.126-.473-.307-.612-.188-.145-.351-.147-.697-.147H46.74v1.545h1.363c.26 0 .51-.035.697-.186zm-.5 2.996c.288 0 .553-.018.753-.181a.885.885 0 0 0 .325-.691c0-.34-.095-.552-.288-.727-.196-.177-.446-.218-.762-.218h-1.59v1.817zm2.795-5.489h1.633l1.55 2.616 1.543-2.616h1.623l-2.459 4.08v2.542h-1.46v-2.578zm21.34 6.622H71.07v-6.622h1.448l2.774 4.443.008-4.443h1.367v6.622H75.21l-2.765-4.433zm8.48-5.558c-1.07 0-1.893.887-1.893 2.224 0 1.336.91 2.263 1.893 2.263.823 0 1.503-.646 1.503-1.485h1.41c0 1.63-1.022 2.704-2.913 2.704-1.89 0-3.259-1.07-3.259-3.434 0-2.363 1.407-3.499 3.26-3.499 1.853 0 2.857.96 2.857 2.386h-1.41c0-.774-.755-1.159-1.448-1.159zm17.845 4.297c.27.228.68.283 1.023.283.485 0 .93-.072 1.157-.413.157-.235.118-.615-.043-.848-.223-.323-.713-.38-1.078-.474-.498-.129-.996-.18-1.437-.412-.411-.215-.835-.486-1.078-.881-.139-.225-.172-.506-.172-.775 0-.703.348-1.153.788-1.513.453-.371 1.11-.442 1.687-.49.698-.057 1.352.088 1.843.491.472.387.697 1.03.807 1.644h-1.414c.047-.386-.17-.615-.406-.798-.241-.188-.589-.207-.895-.204-.23.002-.486.028-.669.167-.177.135-.328.36-.328.584 0 .238.161.48.352.622.444.333 1.09.218 1.621.38.398.122.854.17 1.167.445.422.371.797.972.797 1.485 0 .672-.279 1.154-.701 1.517-.54.466-1.37.532-2.055.599-.756.021-1.449-.117-1.97-.558-.505-.427-.849-1.13-.849-1.792h1.413c0 .476.176.717.44.941zm7.886-5.361l2.477 6.622h-1.512l-.501-1.475h-2.477l-.52 1.475h-1.465l2.504-6.622zm-1.632 4.06h1.716l-.845-2.427z' fill='#fff'/><g stroke-width='2' fill='#fff' stroke='#000'><circle r='14.25' cy='19.5' cx='21' stroke-width='2.8'/><circle r='10.55' cx='52' cy='15'/><circle r='10.55' cy='15' cx='78'/><circle r='10.55' cx='104' cy='14.981'/></g><circle r='1.625' cy='9' cx='52'/><path d='M18.75 17.979c-.39-.852-.974-1.278-1.755-1.278-1.378 0-2.067.928-2.067 2.784 0 1.856.69 2.783 2.067 2.783.91 0 1.56-.452 1.951-1.357l1.91 1.017c-.91 1.618-2.277 2.428-4.098 2.428-1.406 0-2.531-.43-3.377-1.292-.846-.862-1.27-2.05-1.27-3.564 0-1.487.438-2.668 1.31-3.543.87-.875 1.958-1.312 3.259-1.312 1.926 0 3.304.759 4.14 2.275zm8.99 0c-.39-.852-.964-1.278-1.72-1.278-1.405 0-2.109.928-2.109 2.784 0 1.856.704 2.783 2.11 2.783.912 0 1.55-.452 1.915-1.357l1.953 1.017c-.91 1.618-2.274 2.428-4.092 2.428-1.404 0-2.526-.43-3.372-1.292-.843-.862-1.266-2.05-1.266-3.564 0-1.487.429-2.668 1.287-3.543.857-.875 1.947-1.312 3.273-1.312 1.923 0 3.3.759 4.13 2.275l-2.108 1.059zm27.381-5.862a.75.75 0 0 0-.75-.75h-4.743a.75.75 0 0 0-.749.75v4.742h1.324v5.617h3.594v-5.617h1.324zm13.779-.352l10.343 4.66a.867.867 0 0 1 .312.696c0 .887-.754 1.154-1.435 1.154-1.05 0-1.818-.324-2.588-1.048l-1.598 1.609c.962.84 2.22 1.374 3.52 1.389v1.789h1.332v-1.79c1.584-.115 2.895-1.108 3.191-2.58l4.471 2.048.852-2.129-10.391-4.682a.467.467 0 0 1-.106-.295c0-.723.814-.9 1.39-.9.71 0 1.42.281 1.983.68L81.7 10.8a5.005 5.005 0 0 0-2.914-1.065V7.95h-1.332v1.787c-1.417.083-2.587.83-2.987 2.059l-4.533-2.073zm29.88 1.58c.461-2.918 2.515-4.478 5.09-4.478 3.7 0 5.957 2.686 5.957 6.268 0 3.495-2.4 6.21-6.016 6.21-2.487 0-4.714-1.53-5.12-4.535h2.922c.087 1.56 1.1 2.109 2.546 2.109 1.648 0 2.718-1.53 2.718-3.87 0-2.456-.925-3.755-2.661-3.755-1.272 0-2.371.462-2.603 2.05l.85-.005-2.3 2.3-2.299-2.3.915.006z'/></svg>");
            return a
        };
    a.getSvgArrowUp = function(a, f) { return "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path transform="rotate(' + (a ? 90 : 0) + ',12,12)" fill="#' + (void 0 === f ? "24c" : f) + '" d="m19.5 17.5-7.5-12-7.5 12z"/></svg>') };
    a.getSvgArrowDown = function(a, f) {
        return "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path transform="rotate(' + (a ? 90 : 0) + ',12,12)" d="m19.5 5-7.5 12-7.5-12z" fill="#' +
            (void 0 === f ? "d00018" : f) + '"/></svg>')
    };
    a.getSvgMenu = function() { return "data:image/svg+xml;base64," + btoa("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M6.64 8L12 12.962 17.36 8 19 9.519 12 16 5 9.519z'/></svg>") };
    a.getSvgCheckbox = function() { return "data:image/svg+xml;base64," + btoa("<svg xmlns='http://www.w3.org/2000/svg' width='45' height='45' viewBox='0 0 45 45'><path d='M37.095 6.284L15.473 27.905l-7.568-7.567L2.5 25.743l12.973 12.973L42.5 11.69z' fill='#1e272e'/></svg>") };
    a.getSvgRadio = function() { return "data:image/svg+xml;base64," + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><circle cx="22.5" cy="22.5" r="15" fill="#1e272e"/></svg>') };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f, e, r, p, c, k, l, b, h, d, v, q, u, A, n = function(b, d) {
            this.r = this.g = this.b = 0;
            this.a = 1;
            this.evaluator = d;
            this.getColor = this.getColorStr;
            if (b) {
                if (babel[b] && ("net" === babel[b] && (b = "rojo"), b = babel[b], this.r = a.toHex(b.substring(1, 3)), this.g = a.toHex(b.substring(3, 5)), this.b = a.toHex(b.substring(5, 7)), this.colorStr = b), 6 === b.length && (this.r = a.toHex(b.substring(0, 2)), this.g = a.toHex(b.substring(2, 4)), this.b = a.toHex(b.substring(4, 6)), this.colorStr = "#" + b), 8 ===
                    b.length && (this.r = a.toHex(b.substring(2, 4)), this.g = a.toHex(b.substring(4, 6)), this.b = a.toHex(b.substring(6, 8)), this.a = 1 - a.toHex(b.substring(0, 2)) / 255, this.colorStr = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"), "(" === b[0]) {
                    e = [];
                    r = this.splitComa(b.substring(1, b.length - 1));
                    b = 0;
                    for (d = r.length; b < d; b++) k = r[b], p = parseInt(k, 16), k !== p.toString(16) && k !== "0" + p.toString(16) ? ("[" === k.charAt(0) && "]" === k.charAt(k.length - 1) && (k = k.substring(1, k.length - 1)), e.push(this.evaluator.parser.parse(k))) : e.push(this.evaluator.parser.parse((p /
                        255).toString()));
                    this.rExpr = e[0];
                    this.gExpr = e[1];
                    this.bExpr = e[2];
                    this.aExpr = e[3];
                    this.getColor = this.getColorExp
                }
            } else this.colorStr = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
        };
    n.prototype.splitComa = function(a) {
        c = [];
        for (var m = h = b = l = 0, f = a.length; m < f; m++) d = a.charAt(m), "(" === d ? l++ : ")" === d ? l-- : "[" === d ? b++ : "]" === d ? b-- : "," === d && 0 === l && 0 === b && (c.push(a.substring(h, m)), h = m + 1);
        c.push(a.substring(h));
        return c
    };
    n.prototype.getColorStr = function() { return this.colorStr };
    n.prototype.getColorExp = function() {
        f =
            this.evaluator;
        this.r = g(255 * f.eval(this.rExpr));
        this.g = g(255 * f.eval(this.gExpr));
        this.b = g(255 * f.eval(this.bExpr));
        this.a = 1 - f.eval(this.aExpr);
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    };
    n.prototype.borderColor = function() { return 380 > this.r + this.g + this.b ? "#ffffff" : "#000000" };
    a.toHex = function(a) { return parseInt("0x" + a, 16) };
    a.RGBAToHexColor = function(a) {
        a = a.substring(5, a.length - 1).split(",");
        v = parseInt(a[0]).toString(16);
        q = parseInt(a[1]).toString(16);
        u = parseInt(a[2]).toString(16);
        A = (255 -
            parseInt(255 * parseFloat(a[3]))).toString(16);
        1 === v.length && (v = "0" + v);
        1 === q.length && (q = "0" + q);
        1 === u.length && (u = "0" + u);
        1 === A.length && (A = "0" + A);
        return new n(A + v + q + u)
    };
    a.Color = n;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = document.head,
        f = a.newHTML("meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge,chrome=1" });
    g.appendChild(f);
    f = a.newHTML("meta", { name: "viewport", content: "width=device-width,initial-scale=1.0,user-scalable=yes" });
    document.querySelector("meta[name=viewport]") || g.appendChild(f);
    f = a.newHTML("meta", { name: "mobile-web-app-capable", content: "yes" });
    g.appendChild(f);
    f = a.newHTML("meta", { name: "apple-mobile-web-app-capable", content: "yes" });
    g.appendChild(f);
    f = a.newHTML("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" });
    g.appendChild(f);
    (g = document.getElementById("StyleDescartesApps2")) && g.remove();
    g = a.newHTML("style", { rel: "stylesheet", type: "text/css", id: "StyleDescartesApps2" });
    document.head.insertBefore(g, document.head.firstChild);
    g.innerHTML = "body{-webkit-font-smoothing:antialiased;}\n#descartesJS_north,#descartesJS_south,#descartesJS_east,#descartesJS_west{background:#c0c0c0;position:absolute;z-index:100;}\n.PBL{position:absolute;background-color:#f2f2f2;border:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#2daae4;visibility:hidden;border-radius:100vw;}\n.PBL::-moz-progress-bar{background:#2daae4;border-radius:inherit;}\n.PBL::-webkit-progress-bar{background:#f2f2f2;border-radius:100vw;}\n.PBL::-webkit-progress-value{background:#2daae4;border-radius:inherit;}\n.PBL::-ms-fill{background:#2daae4;border-radius:inherit;}\n.DescartesAppContainer *,.DescartesAppContainer *:before,.DescartesAppContainer *:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;transform:translate3d(0,0,0);}\n.DescartesAppContainer{border:none;overflow:hidden;position:relative;top:0;left:0;}\n.DescartesCatcher{background-color:rgba(0,0,0,0);cursor:pointer;position:absolute;}\n.DescartesLoader{background-color:#fff;overflow:hidden;position:absolute;top:0;left:0;z-index:1000;width:100%;height:100%;display:none;}\n.DescartesLoaderImage{position:absolute;background-repeat:no-repeat;background-position:center;overflow:hidden;top:0;left:0;width:100%;height:100%;}\n.DescartesSpace2DCanvas,.DescartesSpace3DCanvas,.blocker{touch-action:none;position:absolute;overflow:hidden;left:0;top:0;}\n.DescartesSpace2DContainer,.DescartesSpace3DContainer{position:absolute;overflow:hidden;line-height:0;}\n.DescartesCheckboxContainer input[type=checkbox],.DescartesCheckboxContainer input[type=radio]{display: none;}\n.DescartesCheckboxContainer input[type=checkbox]+label::after{position:absolute;left:0px;content:'';padding:0;margin:0;width:100%;height:100%;background:#fff;border:1px solid gray;}\n.DescartesCheckboxContainer input[type=checkbox]:checked+label::after{content:'';background:url(" +
        a.getSvgCheckbox() + ") center center no-repeat;background-size:contain;background-color:#fff;}\n.DescartesCheckboxContainer input[type=radio]+label::after{position:absolute;left:0px;content:'';padding:0;margin:0;width:100%;height:100%;background:#fff;border:1px solid gray;border-radius:50%;}\n.DescartesCheckboxContainer input[type=radio]:checked+label::after{content:'';background:url(" + a.getSvgRadio() + ") center center no-repeat;background-size:contain;background-color:#fff;}\n.DescartesCheckbox{position:absolute;}\n.DescartesButton{position:absolute;cursor:pointer;}\n.DescartesButtonContainer,.DescartesSpinnerContainer,.DescartesCheckboxContainer,.DescartesTextFieldContainer,.DescartesMenuContainer{position:absolute;overflow:hidden;}\n.DescartesSpinnerContainer input,.DescartesCheckboxContainer,.DescartesTextFieldContainer input,.DescartesMenuContainer select{border-radius:0;}\n.DescartesSpinnerField,.DescartesTextFieldField,.DescartesMenuField,.DescartesScrollbarField{font-family:" +
        a.sansserif_font + ";padding:0 2px;border:solid #666 1px;position:absolute;}\ninput[type='text']:disabled,.DescartesMenuSelect:disabled{background-color:#e3e3e3;cursor:not-allowed;opacity:1;}\n.DescartesSpinnerLabel,.DescartesCheckboxLabel,.DescartesMenuLabel,.DescartesScrollbarLabel,.DescartesTextFieldLabel{font-family:" + a.sansserif_font + ";font-weight:normal;text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;position:absolute;left:0;top:0;}\n.DescartesGraphicControl{touch-action:none;border-style:none;position:absolute;}\n.DescartesTextAreaContainer{position:absolute;overflow:hidden;background:#F7F7F7;}\n.DescartesMenuSelect{font-family:" +
        a.sansserif_font + ";padding-top:0;text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;position:absolute;border:1px solid #7a8a99; background:#fff url('" + a.getSvgMenu() + "') 100%/22px no-repeat;padding:0 22px 0 5px;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;}\n.DescartesMenuSelect::-ms-expand{display:none;}\n.DescartesScrollbarContainer{touch-action:none;background:#eee;overflow:hidden;position:absolute;}\n.DJS_Up,.DJS_Down{cursor:pointer;position:absolute;border-width:1px 0 1px 1px;background-size:cover;background-repeat:none;background-position:center;}\n.DJS_Up[horizontal=false]{background-color:#f0f8ff;background-image:" +
        a.createGradient(50, 100) + ", url('" + a.getSvgArrowUp() + "');}\n.DJS_Up[horizontal=true]{background-color:#f0f8ff;background-image:" + a.createGradient(50, 100, 90) + ", url('" + a.getSvgArrowUp(!0) + "');}\n.DJS_Up[active=false]::after{cursor:not-allowed;content:'';position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(255,255,255,0.3);}\n.DJS_Down[horizontal=false]{background-color:#f0f8ff;background-image:" + a.createGradient(0, 50) + ", url('" + a.getSvgArrowDown() + "');}\n.DJS_Down[horizontal=true]{background-color:#f0f8ff;background-image:" +
        a.createGradient(50, 100, -90) + ", url('" + a.getSvgArrowDown(!0) + "');}\n.DJS_Down[active=false]::after{cursor:not-allowed;content:'';position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(255,255,255,0.3);}\n.DJS_Gradient{position:absolute;display:none;}\n" + (a.addSymbolFont ? a.addSymbolFont() : "") + (a.addFonts ? a.addFonts() : "");
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.sin,
        f = Math.floor,
        e = Math.random,
        r = Math.round,
        p = Math.abs,
        c = String.fromCharCode,
        k, l, b, h, d, v, q, u, A, n, m = function(a) { this.key = (void 0 === a ? 0 : a).toString() };
    m.prototype.getKey = function(a) { k = []; for (var b = 0; 256 > b; b++) k[b] = c(this.alfanum(f(p(7.5 * (g(1 * b - a) + g(1.4 * b + a) + g(.6 * b - a) + g(2.2 * b + a)))))); return k.join("") };
    m.prototype.encode = function(a) {
        l = f(31 * e());
        this.key = this.getKey(l);
        return c(this.alfanum(l)) + this.encripta(a)
    };
    m.prototype.decode = function(a) {
        l =
            this.numalfa(a.charCodeAt(0));
        this.key = this.getKey(l);
        return this.desencripta(a.substring(1))
    };
    m.prototype.encripta = function(a) { return this.bytesToString(this.encriptaAux(this.stringToBytes(a))) };
    m.prototype.encriptaAux = function(a) {
        if (null == a || null == this.key) return null;
        v = Array(3 * a.length);
        for (var b = 0, d = a.length; b < d; b++) A = 256 * f(a[b] + 128) + r(255 * e()) + 65536 * r(255 * e()), n = f((A << this.shift(b)) / 256), v[3 * b] = this.alfanum(n % 32), v[3 * b + 1] = this.alfanum(n / 32 % 32), v[3 * b + 2] = this.alfanum(n / 1024 % 32);
        return v
    };
    m.prototype.desencripta =
        function(a) { return this.bytesToString(this.desencriptaAux(this.stringToBytes(a))) };
    m.prototype.desencriptaAux = function(a) {
        if (null == a || null == this.key) return null;
        q = Array(a.length / 3);
        for (var b = 0, d = q.length; b < d; b++) n = this.numalfa(a[3 * b]) + 32 * this.numalfa(a[3 * b + 1]) + 1024 * this.numalfa(a[3 * b + 2]), A = f(256 * n >> this.shift(b)), u = f(A / 256) % 256 - 128, 0 > u && (u += 256), q[b] = u;
        return q
    };
    m.prototype.alfanum = function(a) { return (10 > a ? 48 : 87) + f(a) };
    m.prototype.numalfa = function(a) { return a - (58 > a ? 48 : 87) };
    m.prototype.stringToBytes =
        function(a) { h = []; for (var b = 0, d = a.length; b < d; b++) h.push(a.charCodeAt(b)); return h };
    m.prototype.bytesToString = function(a) { for (var b = 0, d = a.length; b < d; b++) a[b] = c(a[b]); return a.join("") };
    m.prototype.shift = function(a) {
        b = this.key.charCodeAt(a % this.key.length);
        h = this.numalfa(b);
        d = f(h / 2 % 8);
        0 == d && (d = 4);
        return d
    };
    m.prototype.parseByte = function(a) {
        a = parseInt(a);
        a = 0 > a ? 0 : a;
        return 255 < a ? 255 : a
    };
    a.Krypto = m;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        this.parent = f;
        var g = f.evaluator,
            p = g.parser;
        f = new a.Auxiliary(f);
        var c = this;
        c.delay = e.delay ? p.parse(e.delay) : p.parse("60");
        c.loop = e.loop ? e.loop : !1;
        c.auto = void 0 == e.auto ? !0 : e.auto;
        c.controls = e.controls;
        c.init = f.splitInstructions(p, e.init);
        c.doExpr = f.splitInstructions(p, e.doExpr);
        e.whileExpr && (c.whileExpr = p.parse(e.whileExpr));
        var k, l = c.doExpr.length;
        c.animExec = function() {
            for (k = 0; k < l; k++) g.eval(c.doExpr[k]);
            c.parent.update();
            c.playing &&
                (0 < g.eval(c.whileExpr) || c.loop) ? c.timer = a.setTimeout(c.animExec, g.eval(c.delay)) : (c.stop(), c.pause = !1, c.parent.update())
        };
        c.playing = !1;
        c.auto && c.play()
    };
    g.prototype.play = function() { this.playing ? (this.pause = !0, this.stop()) : (this.pause || this.reinit(), this.playing = !0, this.pause = !1, this.timer = a.setTimeout(this.animExec, Math.max(10, this.parent.evaluator.eval(this.delay)))) };
    g.prototype.stop = function() {
        this.playing = !1;
        a.clearTimeout(this.timer)
    };
    g.prototype.reinit = function() {
        for (var a = 0, e = this.init.length; a <
            e; a++) this.parent.evaluator.eval(this.init[a])
    };
    a.Animation = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(a, e) {
        this.parent = a;
        this.evaluator = this.parent.evaluator
    };
    g.prototype.execute = function() {};
    a.Action = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        f = a.Action.call(this, f, e) || this;
        f.parameter = (e || "").replace(/\\n/g, "\n").replace(/&squot;/g, "'");
        return f
    };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() { alert(this.parameter) };
    a.Message = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        f = a.Action.call(this, f, e) || this;
        var g = f.evaluator,
            p = g.parser;
        e = a.splitSeparator((e || "").replace(/&squot;/g, "'"));
        for (var c = [], k, l = 0, b = e.length; l < b; l++)(k = p.parse(e[l], !0)) && c.push(k);
        b = c.length;
        f.execute = function() { for (l = 0; l < b; l++) g.eval(c[l]) };
        return f
    };
    $jscomp.inherits(g, a.Action);
    a.Calculate = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        var g = a.Action.call(this, f, e) || this;
        g.parser = f.evaluator.parser;
        g.evaluator = f.evaluator;
        g.parameter = e;
        g.target = "_blank";
        return g
    };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() {
        var f = this.parameter;
        f.match(/^\[.*\]?/) && (f = this.evaluator.eval(this.parser.parse(f.substring(1, f.length - 1))));
        var e = f.indexOf("target"); - 1 != e && (this.target = f.substring(e), this.target = this.target.substring(this.target.indexOf("=") + 1), f = f.substring(0,
            e - 1));
        if ("javascript" == f.substring(0, 10)) { f = new a.SimpleText(parent, f.substring(11).replace(/&squot;/g, "'")); try { eval(f.toString()) } catch (r) {} } else "http" != f.substring(0, 4) && (e = window.__dirname || window.location.href, f = e.substring(0, e.lastIndexOf("/") + 1) + f), window.open(f, this.target)
    };
    a.OpenURL = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        var g = a.Action.call(this, f, e) || this;
        g.parser = f.evaluator.parser;
        g.evaluator = f.evaluator;
        g.parameter = e.trim();
        g.target = "_blank";
        return g
    };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() {
        var a = this.parameter;
        a.match(/^\[.*\]?/) && (a = this.evaluator.eval(this.parser.parse(a.substring(1, a.length - 1))));
        var e = a.indexOf("target"); - 1 != e && (this.target = a.substring(e), this.target = this.target.substring(this.target.indexOf("=") + 1), a = a.substring(0,
            e - 1));
        if ("javascript" == a.substring(0, 10)) { a = a.substring(11).replace(/&squot;/g, "'"); try { eval(a.toString()) } catch (r) {} } else "http" != a.substring(0, 4) && (e = window.__dirname || window.location.href, a = e.substring(0, e.lastIndexOf("/") + 1) + a), window.open(a, this.target, "width=" + this.parent.width + ",height=" + this.parent.height + ",left=" + (window.screen.width - this.parent.width) / 2 + ", top=" + (window.screen.height - this.parent.height) / 2 + "location=0,menubar=0,scrollbars=0,status=0,titlebar=0,toolbar=0")
    };
    a.OpenScene = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) { return a.Action.call(this, f, e) || this };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() {
        this.parent.editor ? this.parent.editor.show() : window.open("about:blank", "_blank", "width=800px,height=600px,location=no,menubar=no,scrollbars=yes").document.write("<xmp style='width:100%;height:100%;'><script type='text/javascript' src='http://arquimedes.matem.unam.mx/Descartes5/lib/descartes-min.js'>\x3c/script>" + this.parent.applet.outerHTML.replace(/<applet/g, "<ajs").replace(/<\/applet/g,
            "</ajs") + "</xmp>")
    };
    a.Config = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) { return a.Action.call(this, f, e) || this };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() { this.parent.init() };
    a.Init = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) { return a.Action.call(this, f, e) || this };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() { this.parent.clear() };
    a.Clear = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) { return a.Action.call(this, f, e) || this };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() { this.parent.play() };
    a.Animate = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) { return a.Action.call(this, f, e) || this };
    $jscomp.inherits(g, a.Action);
    g.prototype.execute = function() { this.parent.reinitAnimation() };
    a.InitAnimation = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = /[\w\.\-//]*(\.ogg|\.oga|\.mp3|\.wav)/gi,
        f = function(e, f) {
            e = a.Action.call(this, e, f) || this;
            f = f || "";
            f.match(g) ? e.filenameExpr = e.evaluator.parser.parse("'" + f.match(g) + "'") : (f.match(/^\[.*\]?/) && (f = f.substring(1, f.length - 1)), e.filenameExpr = e.evaluator.parser.parse(f));
            return e
        };
    $jscomp.inherits(f, a.Action);
    f.prototype.execute = function() {
        var a = this.theAudio = this.parent.getAudio(this.evaluator.eval(this.filenameExpr));
        a.paused ? a.play() : (a.pause(), a.currentTime =
            0)
    };
    a.PlayAudio = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e = function(a, f) {
        this.parent = a;
        this.evaluator = this.parent.evaluator;
        this.local = this.expresion = this.id = "";
        this.evaluate = "onlyOnce";
        Object.assign(this, f)
    };
    e.prototype.firstRun = function() {};
    e.prototype.update = function() {};
    e.prototype.splitInstructions = function(e, p) {
        f = [];
        p = p ? a.splitSeparator(p) : [""];
        for (var c = 0, k = p.length; c < k; c++) a.DEBUG.lineCount = c, (g = e.parse(p[c], !0)) && f.push(g);
        return f
    };
    e.prototype.getPrivateVariables = function(a, e) {
        f = [];
        e = e ? e.split(/;|,/) : [""];
        for (var c = 0, k = e.length; c < k; c++)(g = a.parse(e[c], !0)) && f.push(g);
        c = 0;
        for (k = f.length; c < k; c++) f[c] = "assign" === f[c].type ? f[c].childs[0].value : "identifier" === f[c].type ? f[c].value : "";
        return f
    };
    e.prototype.parseExpressions = function(f) {
        a.DEBUG.paramName = "inicio";
        this.init = this.splitInstructions(f, this.init);
        a.DEBUG.paramName = "local";
        this.privateVars = this.getPrivateVariables(f, this.local);
        a.DEBUG.paramName = "hacer";
        this.doExpr = this.splitInstructions(f, this.doExpr);
        a.DEBUG.paramName = "mientras";
        this.whileExpr =
            f.parse(this.whileExpr)
    };
    a.Auxiliary = e;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        f = a.Auxiliary.call(this, f, e) || this;
        e = f.evaluator.parser;
        f.expresionString = f.expresion;
        f.expresion = e.parse(f.expresionString);
        f.expresion && e.setVariable(f.id, f.expresion);
        f.editable && (f.registerTextField(), f.parent.editableRegionVisible = !0);
        return f
    };
    $jscomp.inherits(g, a.Auxiliary);
    g.prototype.registerTextField = function() {
        var f = a.newHTML("div"),
            e = a.newHTML("label");
        e.appendChild(document.createTextNode("___" + this.id + "=___"));
        var g = a.newHTML("input");
        g.value = this.expresionString;
        g.disabled = !this.editable;
        f.appendChild(e);
        f.appendChild(g);
        var p = this,
            c = p.evaluator.parser;
        g.onkeydown = function(a) { 13 == a.keyCode && (p.expresion = c.parse(this.value), c.setVariable(p.id, p.expresion), p.parent.update()) };
        this.parent.editableRegion.textFields.push({ container: f, type: "div" })
    };
    a.Variable = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        f = a.Auxiliary.call(this, f, e) || this;
        f.expresion = f.evaluator.parser.parse(f.expresion);
        f.update();
        return f
    };
    $jscomp.inherits(g, a.Auxiliary);
    g.prototype.update = function() { this.evaluator.setVariable(this.id, this.evaluator.eval(this.expresion)) };
    a.Constant = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p = function(c, k) {
        k = a.Auxiliary.call(this, c, k) || this;
        g = c.evaluator;
        f = g.parser;
        k.size = k.size || f.parse("3");
        k.expresion = k.expresion.split(";");
        k.parseFile = f.parse(k.file);
        k.update();
        return k
    };
    $jscomp.inherits(p, a.Auxiliary);
    p.prototype.update = function() {
        var c = this.expresion,
            k;
        g = this.evaluator;
        f = g.parser;
        this.oldFile = this.file;
        if (e = g.eval(this.parseFile)) this.file = e;
        if (this.file) {
            r = (k = document.getElementById(this.file)) && "descartes/vectorFile" ==
                k.type ? k.text : a.openExternalFile(this.file);
            if (null != r) {
                r = r.replace(/\r/g, "").split("\n");
                k = [];
                for (var l = 0, b = r.length; l < b; l++) "" != r[l] && k.push(r[l]);
                r = k
            }
            null == r || 1 == r.length && "" == r[0] ? (r = [], this.size = f.parse("0")) : (c = r, this.size = null);
            null === this.size && (this.size = f.parse(c.length + ""))
        }
        var h;
        k = [];
        l = 0;
        for (b = c.length; l < b; l++)(h = f.parse(c[l], !0)) && "assign" != h.type && (h = f.parse(this.id + "[" + l + "]=" + c[l], !0)), k.push(h);
        c = parseInt(Math.abs(g.eval(this.size)));
        c = Array(c).fill(0);
        c._size_ = c.length;
        g.vectors[this.id] =
            c;
        g.setVariable(this.id + ".long", c._size_);
        l = 0;
        for (b = k.length; l < b; l++) g.eval(k[l])
    };
    a.Vector = p;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c = function(c, l) {
        l = a.Auxiliary.call(this, c, l) || this;
        g = c.evaluator;
        f = g.parser;
        l.rows = l.rows || f.parse("3");
        l.columns = l.columns || f.parse("3");
        l.expresion = l.splitInstructions(f, l.expresion);
        e = g.eval(l.rows);
        r = g.eval(l.columns);
        p = [];
        p.type = "matrix";
        c = 0;
        for (var b = r; c < b; c++) p[c] = Array(e).fill(0);
        g.matrices[l.id] = p;
        l.update();
        return l
    };
    $jscomp.inherits(c, a.Auxiliary);
    c.prototype.update = function() {
        g = this.evaluator;
        e = g.eval(this.rows);
        r = g.eval(this.columns);
        g.setVariable(this.id + ".filas", e);
        g.setVariable(this.id + ".columnas", r);
        p = g.matrices[this.id];
        p.rows = e;
        p.cols = r;
        for (var a = 0, c = this.expresion.length; a < c; a++) g.eval(this.expresion[a])
    };
    a.Matrix = c;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        var g = a.Auxiliary.call(this, f, e) || this;
        var p = g.evaluator;
        f = p.parser;
        e = g.id.indexOf("(");
        g.name = g.id.substring(0, e);
        g.params = g.id.substring(e + 1, g.id.indexOf(")"));
        g.domain = g.range ? f.parse(g.range) : f.parse("1");
        g.params = "" === g.params ? [] : g.params.split(",");
        g.numberOfParams = g.params.length;
        g.algorithm || (g.init = "", g.doExpr = "", g.whileExpr = "");
        g.parseExpressions(f);
        g.expresion = f.parse(g.expresion);
        g.functionExec = function() {
            g.iterations = 0;
            if (g.numberOfParams <= arguments.length) {
                for (var c = [], f = 0, e = g.privateVars.length; f < e; f++) c.push(p.getVariable(g.privateVars[f])), p.setVariable(g.privateVars[f], 0);
                var b = [];
                f = 0;
                for (e = g.params.length; f < e; f++) b[f] = p.getVariable(g.params[f]), p.setVariable(g.params[f], arguments[f]);
                f = 0;
                for (e = g.init.length; f < e; f++) p.eval(g.init[f]);
                do {
                    f = 0;
                    for (e = g.doExpr.length; f < e; f++) p.eval(g.doExpr[f]);
                    if (1E5 < ++g.iterations) return console.warn("se ha excedido el l\u00edmite de 100000 repeticiones en la funci\u00f3n << " +
                        g.name + " >>"), 0
                } while (0 < p.eval(g.whileExpr));
                var h = p.eval(g.expresion);
                a.rangeOK = p.eval(g.domain);
                f = 0;
                for (e = g.params.length; f < e; f++) p.setVariable(g.params[f], b[f]);
                f = 0;
                for (e = g.privateVars.length; f < e; f++) p.setVariable(g.privateVars[f], c[f]);
                return h
            }
            return 0
        };
        p.setFunction(g.name, g.functionExec);
        return g
    };
    $jscomp.inherits(g, a.Auxiliary);
    a.Function = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        var g = a.Auxiliary.call(this, f, e) || this;
        var p = g.evaluator;
        g.parseExpressions(p.parser);
        g.algorithmExec = function() {
            for (var a = g.iterations = 0, f = g.init.length; a < f; a++) p.eval(g.init[a]);
            do { a = 0; for (f = g.doExpr.length; a < f; a++) p.eval(g.doExpr[a]); if (1E5 < ++g.iterations) return console.warn("se ha excedido el l\u00edmite de 100000 repeticiones en el algoritmo << " + g.name + " >>"), 0 } while (0 < p.eval(g.whileExpr))
        };
        return g
    };
    $jscomp.inherits(g, a.Auxiliary);
    g.prototype.update = function() { this.algorithmExec(); "onlyOnce" === this.evaluate && (this.update = function() {}) };
    a.Algorithm = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        f = a.Auxiliary.call(this, f, e) || this;
        e = f.evaluator;
        delete f.evaluate;
        f.condition = e.parser.parse(f.condition);
        f.lastEvaluation = !1;
        f.action = f.parent.lessonParser.parseAction(f);
        "onlyOnce" == f.execution && (f.eventExec = function() { 0 < this.evaluator.eval(this.condition) && !this.lastEvaluation && (this.lastEvaluation = !0, this.action.execute()) });
        "alternate" == f.execution && (f.eventExec = function() {
            var a = 0 < this.evaluator.eval(this.condition);
            a && !this.lastEvaluation ?
                (this.action.execute(), this.lastEvaluation = !0) : !a && this.lastEvaluation && (this.lastEvaluation = !1)
        });
        "always" == f.execution && (f.eventExec = function() { 0 < this.evaluator.eval(this.condition) && this.action.execute() });
        return f
    };
    $jscomp.inherits(g, a.Auxiliary);
    g.prototype.update = function() { this.eventExec() };
    a.Event = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(f, e) {
        var g = a.Auxiliary.call(this, f, e) || this;
        if (e = e.file) {
            var p = document.getElementById(e);
            p = p && "descartes/library" === p.type ? p.text : a.openExternalFile(e)
        }
        if (p) {
            p = a.convertHTMLEntities(p).replace(/\r/g, "").split("\n");
            e = 0;
            for (var c = p.length; e < c; e++) "" !== p[e].trim() && f.lessonParser.parseAuxiliar(p[e])
        }
        return g
    };
    $jscomp.inherits(g, a.Auxiliary);
    a.Library = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b = function(b, d) {
        this.parent = b;
        this.evaluator = b.evaluator;
        var h = this.evaluator.parser;
        this.spaceID = "";
        this.background = !1;
        this.type = "";
        this.drawif = h.parse("1");
        this.abs_coord = d.type && "text" === d.type.toLowerCase() ? !0 : !1;
        this.color = new a.Color("20303a");
        this.trace = "";
        this.expresion = h.parse("(0,0)");
        this.family = "";
        this.family_interval = h.parse("[0,1]");
        this.family_steps = h.parse("8");
        this.editable = this.visible = !1;
        this.font = "SansSerif,PLAIN," +
            (5 <= this.parent.version ? "18" : "12");
        this.fixed = !0;
        this.text = "";
        this.decimals = h.parse("2");
        Object.assign(this, d);
        this.space = this.getSpace();
        this.canvas = this.background ? this.space.backCanvas : this.space.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.trace && (this.traceCtx = this.space.backCtx);
        this.font_str = this.font;
        this.font = a.convertFont(this.font);
        this.fontSize = (this.fontSize = this.font.match(/([\d\.]+)px/)) ? parseFloat(this.fontSize[1]) : 10;
        this.font_style = a.getFontStyle(this.font_str.split(",")[1]);
        if ("boolean" === typeof this.bold || "boolean" === typeof this.italics) this.bold && !this.italics ? this.font_style = "Bold " : !this.bold && this.italics ? this.font_style = "Italic " : this.bold && this.italics ? this.font_style = "Italic Bold " : this.bold || this.italics || (this.font_style = " ");
        this.font_family || (this.font_family = this.font_str.split(",")[0]);
        this.font_family = a.getFontName(this.font_family);
        "undefined" === typeof this.font_size && (this.font_size = b.evaluator.parser.parse(this.fontSize.toString()))
    };
    b.prototype.getSpace =
        function() { var a = this; return this.parent.spaces.find(function(b) { return b.id === a.spaceID }) || this.parent.spaces[0] };
    b.prototype.getFamilyValues = function() {
        g = this.evaluator;
        f = g.eval(this.family_interval);
        this.familyInf = f[0][0];
        this.familySup = f[0][1];
        this.fSteps = Math.round(g.eval(this.family_steps));
        this.family_sep = 0 < this.fSteps ? (this.familySup - this.familyInf) / this.fSteps : 0
    };
    b.prototype.drawFamilyAux = function(a, b, c) {
        g = this.evaluator;
        this.getFamilyValues();
        e = g.getVariable(this.family);
        if (0 <= this.fSteps)
            for (var d =
                    0, h = this.fSteps; d <= h; d++) g.setVariable(this.family, this.familyInf + d * this.family_sep), 0 < g.eval(this.drawif) && (this.update(), a.oldTextNode = null, this.drawAux(a, b, c));
        g.setVariable("_Text_H_", 0);
        g.setVariable(this.family, e)
    };
    b.prototype.draw = function(a, b) {
        "" !== this.family ? this.drawFamilyAux(this.ctx, a, b) : 0 < this.evaluator.eval(this.drawif) && (this.update(), this.drawAux(this.ctx, a, b));
        this.ctx.setLineDash([])
    };
    b.prototype.drawTrace = function(a, b) {
        "" != this.family ? this.drawFamilyAux(this.traceCtx, a, b) : 0 < this.evaluator.eval(this.drawif) &&
            (this.update(), this.drawAux(this.traceCtx, a, b))
    };
    b.prototype.rotate = function(a, b, c) {
        k = Math.cos(c);
        l = Math.sin(c);
        return { x: a * k - b * l, y: a * l + b * k }
    };
    b.prototype.dashStyle = function() { c = this.ctx; "dot" === this.lineDash ? (c.lineCap = "butt", c.setLineDash([c.lineWidth, c.lineWidth])) : "dash" === this.lineDash ? (c.lineCap = "butt", c.setLineDash([4 * c.lineWidth, 3 * c.lineWidth])) : "dash_dot" === this.lineDash ? (c.lineCap = "butt", c.setLineDash([4 * c.lineWidth, 2 * c.lineWidth, c.lineWidth, 2 * c.lineWidth])) : c.setLineDash([]) };
    b.prototype.drawText =
        function(a, b, c, f, e, l, k, m, w, x, y) {
            a.textNode = b;
            if ("rtfNode" === b.type) a.fillStyle = a.strokeStyle = e.getColor(), a.textBaseline = "alphabetic", a.textNode.pos = { x: c, y: f }, b.update(a, c, f, w, x, k, y, e.getColor());
            else
                for ("simpleText" === b.type && (b = b.toString(w, x).split("\\n")), g = this.evaluator, a.fillStyle = e.getColor(), a.font = l, a.textAlign = k, a.textBaseline = m, p = 1.2 * this.fontSize || 0, e = 0, l = b.length; e < l; e++) r = b[e], this.border && (a.strokeStyle = this.border.getColor(), a.lineWidth = 4, a.lineJoin = "round", a.miterLimit = 2, a.strokeText(r,
                    c, f + p * e)), a.fillText(r, c, f + p * e)
        };
    a.Graphic = b;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l = function(a, h) {
        this.text = h = h.replace("&#x2013", "\u2013").replace(/&squot;/g, "'");
        this.textElements = [];
        this.textElementsMacros = [];
        this.parent = a;
        this.evaluator = a.evaluator;
        this.type = "simpleText";
        g = "'";
        r = e = 0;
        for (p = -1; e < h.length;) c = h.charAt(e), k = h.charAt(e - 1), "[" === c && "\\" === k ? (this.textElements.push(h.substring(r, e - 1) + "["), this.textElementsMacros.push("'" + h.substring(r, e - 1) + "['"), r = e + 1) : "]" === c && "\\" === k ? (this.textElements.push(h.substring(r,
            e - 1) + "]"), this.textElementsMacros.push("'" + h.substring(r, e - 1) + "]'"), r = e + 1) : "[" === c && -1 === p ? (this.textElements.push(h.substring(r, e)), this.textElementsMacros.push("'" + h.substring(r, e) + "'"), r = e, p++) : "[" === c ? p++ : "]" === c && 0 === p ? (this.textElements.push(this.evaluator.parser.parse(h.substring(r, e + 1))), this.textElementsMacros.push("[" + h.substring(r, e + 1) + "]"), r = e + 1, p--) : ("]" == h.charAt(e) && (p = 0 > p ? p : p - 1), g += h.charAt(e)), e++;
        this.textElements.push(h.substring(r, e));
        this.textElementsMacros.push("'" + h.substring(r,
            e) + "'")
    };
    l.prototype.toString = function(b, c) { g = ""; for (var d = 0, h = this.textElements.length; d < h; d++) "string" === typeof this.textElements[d] ? g += this.textElements[d] : (f = this.evaluator.eval(this.textElements[d])[0][0], "" !== f && ("string" === typeof f ? g += f : Infinity == f ? g += "Infinity" : -Infinity == f ? g += "-Infinity" : isNaN(f) || "NaN" == f ? g += "NaN" : (f = parseFloat(f), f = c ? f.toFixed(b) : a.removeNeedlessDecimals(f.toFixed(b)), g += f.toString().replace(".", this.parent.decimal_symbol)))); return g };
    a.SimpleText = l;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F, D, B, L, I, M, O, H, P, C, N = function(b, d) {
        d = a.Graphic.call(this, b, d) || this;
        d.width = d.width || b.evaluator.parser.parse("1");
        d.fillP = d.fillP || "";
        d.fillM = d.fillM || "";
        d.parseExpression();
        d.visible = 2 === d.parent.version && void 0 == d.visible ? !0 : d.visible;
        d.visible && d.registerTextField();
        v = new a.R2;
        q = new a.R2;
        u = new a.R2;
        m = new a.R2;
        A = new a.R2;
        d.cInd = 0;
        return d
    };
    $jscomp.inherits(N, a.Graphic);
    N.prototype.parseExpression = function() {
        if ("compOperator" ===
            this.expresion.type) {
            var b = this.expresion.childs[0],
                d = this.expresion.childs[1];
            "identifier" != b.type || "y" != b.value || d.contains("y") ? "identifier" != d.type || "y" != d.value || b.contains("y") ? "identifier" != b.type || "x" != b.value || d.contains("x") ? "identifier" != d.type || "x" != d.value || b.contains("x") || (this.funExpr = d, this.of_y = !0, this.drawAux = this.drawAuxFun) : (this.funExpr = d, this.of_y = !0, this.drawAux = this.drawAuxFun) : (this.funExpr = b, this.of_y = !1, this.drawAux = this.drawAuxFun) : (this.funExpr = d, this.of_y = !1, this.drawAux =
                this.drawAuxFun)
        }
        this.newt = new a.R2Newton(this.evaluator, this.expresion)
    };
    N.prototype.update = function() {};
    N.prototype.draw = function() { "" != this.family ? this.drawFamilyAux(this.ctx, this.fill, this.color) : (this.update(), this.drawAux(this.ctx, this.fill, this.color)) };
    N.prototype.drawFamilyAux = function(a, b, d) {
        f = this.evaluator;
        this.getFamilyValues();
        tempParam = f.getVariable(this.family);
        if (0 <= this.fSteps)
            for (var c = 0, h = this.fSteps; c <= h; c++) f.setVariable(this.family, this.familyInf + c * this.family_sep), this.update(),
                this.drawAux(a, b, d);
        f.setVariable(this.family, tempParam)
    };
    N.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.fill, this.trace) };
    N.prototype.drawAux = function(K, Q, R) {
        if (!(0 >= this.evaluator.eval(this.drawif))) {
            this.cInd = 0;
            f = this.evaluator;
            e = f.parser;
            r = this.space;
            p = f.eval(this.width);
            K.strokeStyle = this.color.getColor();
            K.lineWidth = p;
            c = e.getVariable("x");
            k = e.getVariable("y");
            l = r.w + 24;
            b = r.h + 24;
            h = l / 9;
            3 > h && (h = 3);
            d = b / 7;
            3 > d && (d = 3);
            0 == this.cInd ? (g = [], this.cInd++) : this.cInd = (this.cInd +
                1) % 1E7;
            v.set(0, 0);
            q.set(0, 0);
            u.set(0, 0);
            P = .25;
            C = 8;
            this.abs_coord || (P /= r.scale, C /= r.scale);
            K.beginPath();
            for (B = parseInt(d / 2); B < b; B += d)
                for (D = parseInt(h / 2); D < l; D += h) {
                    if (this.abs_coord) {
                        m.set(D, B);
                        n = this.newt.findZero(m, P);
                        if (null == n) continue;
                        f.setVariable("x", n.x);
                        f.setVariable("y", n.y);
                        A.set(n.x, n.y)
                    } else {
                        m.set(r.getRelativeX(D), r.getRelativeY(B));
                        n = this.newt.findZero(m, P);
                        if (null == n) continue;
                        f.setVariable("x", n.x);
                        f.setVariable("y", n.y);
                        A.set(r.getAbsoluteX(n.x), r.getAbsoluteY(n.y))
                    }
                    w = A.ix();
                    x = A.iy();
                    if (-12 <= w && w < l + 24 && -12 <= x && x < b + 24) {
                        if (g[w + 12 + (x + 12) * r.w] === this.cInd) continue;
                        g[w + 12 + (x + 12) * r.w] = this.cInd
                    }
                    a.rangeOK && (K.moveTo(w, x), K.lineTo(w, x));
                    v.x = n.x;
                    v.y = n.y;
                    q.x = n.x;
                    q.y = n.y;
                    y = this.newt.getUnitNormal();
                    if (0 != y.x || 0 != y.y)
                        for (y.rotL90(), u.x = y.x, u.y = y.y, G = z = 0, J = !1; 2 > G;)
                            if (J && (u.x = -y.x, u.y = -y.y, n.x = v.x, n.y = v.y, q.x = n.x, q.y = n.y, this.abs_coord ? A.set(n.x, n.y) : A.set(r.getAbsoluteX(n.x), r.getAbsoluteY(n.y)), w = A.ix(), x = A.iy(), J = !1, z = 0), n.x += C * u.x, n.y += C * u.y, n = this.newt.findZero(n, P), null != n) {
                                f.setVariable("x",
                                    n.x);
                                f.setVariable("y", n.y);
                                u.x = n.x - q.x;
                                u.y = n.y - q.y;
                                u.normalize();
                                if (0 == u.x && 0 == u.y) break;
                                q.x = n.x;
                                q.y = n.y;
                                this.abs_coord ? A.set(n.x, n.y) : A.set(r.getAbsoluteX(n.x), r.getAbsoluteY(n.y));
                                E = parseInt(A.ix());
                                F = parseInt(A.iy());
                                if (E != w || F != x)
                                    if (L = w, I = x, w = E, x = F, -12 <= w && w < l + 24 && -12 <= x && x < b + 24) {
                                        z = 0;
                                        M = g[w + 12 + (x + 12) * r.w];
                                        g[w + 12 + (x + 12) * r.w] = this.cInd;
                                        for (Q = 1; 8 > Q; Q++) O = L + Math.round((w - L) * Q / 8), H = I + Math.round((x - I) * Q / 8), 0 <= O && O < l && 0 <= H && H < b && (g[O + 12 + (H + 12) * r.w] = this.cInd);
                                        a.rangeOK && (K.moveTo(L, I), K.lineTo(w, x));
                                        if (M === this.cInd) break
                                    } else J = !0, G++;
                                else 4 < ++z && (J = !0, G++)
                            }
                }
            K.stroke()
        }
    };
    N.prototype.X = function(a, b, d) {
        d || (b = this.space.w / 2 + this.space.Ox + this.space.scale * b);
        b < -a && (b = -a);
        b > this.space.w + a && (b = this.space.w + a);
        return b
    };
    N.prototype.Y = function(a, b, d) {
        d || (b = this.space.h / 2 + this.space.Oy - this.space.scale * b);
        b < -a && (b = -a);
        b > this.space.h + a && (b = this.space.h + a);
        return b
    };
    N.prototype.XX = function(a, b, d) { return Math.round(this.X(a, b, d)) };
    N.prototype.YY = function(a, b, d) { return Math.round(this.Y(a, b, d)) };
    N.prototype.extrapolate =
        function(b, d, c, h, m, f) {
            for (var e = this.evaluator.getVariable(d), l = f / 2, q = 0, g, k, n, p, u, v; 1E-15 < Math.abs(l);) {
                g = this.evaluator.getVariable(d);
                k = this.evaluator.getVariable(d) + l;
                this.evaluator.setVariable(d, k);
                n = !0;
                try { p = m, m = this.evaluator.eval(this.funExpr), this.evaluator.setVariable(c, m), 0 < this.evaluator.eval(b) ? (u = new a.R2(Math.min(p, m), Math.max(p, m)), v = 0, v = 0 < f ? this.Singularity(Math.abs(l), d, h, g, p, k, m, u) : this.Singularity(Math.abs(l), d, h, k, m, g, p, u), 0 < v && (n = !1)) : n = !1 } catch (Z) { n = !1 }
                n ? q += l : this.evaluator.setVariable(d,
                    g);
                l /= 2
            }
            this.evaluator.setVariable(d, e);
            return new a.R2(q / Math.abs(f), m)
        };
    N.prototype.extrapolateOnSingularity = function(b, d, c, h, m, f) {
        h = this.evaluator.getVariable(d);
        for (var e = f / 2, l = 0, q = m, g; 1E-15 < Math.abs(e);) {
            this.evaluator.setVariable(d, this.evaluator.getVariable(d) + e);
            g = !0;
            if (0 < this.evaluator.eval(b)) try { q = this.evaluator.eval(this.funExpr), this.evaluator.setVariable(c, q), 0 >= this.evaluator.eval(b) && (g = !1) } catch (X) { g = !1 } else g = !1;
            g ? l += e : this.evaluator.setVariable(d, this.evaluator.getVariable(d) - e);
            e /= 2
        }
        if (0 == l)
            for (e = f / 2, l = f, q = m; 1E-15 < Math.abs(e);) {
                this.evaluator.setVariable(d, this.evaluator.getVariable(d) - e);
                g = !0;
                if (0 < this.evaluator.eval(b)) try { q = this.evaluator.eval(this.funExpr) } catch (X) { g = !1 } else g = !1;
                g ? l += -e : this.evaluator.setVariable(d, this.evaluator.getVariable(d) + e);
                e /= 2
            }
        this.evaluator.setVariable(d, h);
        return new a.R2(l / Math.abs(f), q)
    };
    N.prototype.Singularity = function(a, b, d, c, h, m, f, e) {
        if (isNaN(f) || isNaN(h) || isNaN(e.y) || isNaN(e.x) || c >= m) return 2;
        var l = this.evaluator.getVariable(b),
            q = 0;
        try {
            if (1E-15 > Math.abs(m - c) || 1E-12 > Math.abs(m - c) && Math.abs(f - h) > Math.abs(a)) return this.evaluator.setVariable(b, l), 1;
            var g = (c + m) / 2;
            this.evaluator.setVariable(b, g);
            var k = NaN;
            try { k = this.evaluator.eval(this.funExpr) } catch (Y) { return 2 }
            if (isNaN(k)) return 5;
            if (Math.abs(f - h) > a) {
                this.evaluator.setVariable(b, c - 1E-12);
                var n = this.evaluator.eval(this.funExpr);
                n = (h - n) / 1E-12;
                this.evaluator.setVariable(b, m + 1E-12);
                var p = (this.evaluator.eval(this.funExpr) - f) / 1E-12;
                if ((10 > Math.abs(p) || 10 > Math.abs(n)) && (0 <= p && 0 <= n ||
                        0 >= p && 0 >= n) && 4 * Math.abs(p) < Math.abs((f - h) / (m - c))) return this.evaluator.setVariable(b, l), 2
            }
            if (isNaN(e.x) || isNaN(e.y) || isNaN(k)) return 2;
            if (!(e.x <= k && k <= e.y)) {
                this.evaluator.setVariable(b, g);
                e.x = Math.min(h, k);
                e.y = Math.max(h, k);
                var u = this.Singularity(a / 2, b, d, c, h, g, k, e);
                this.evaluator.setVariable(b, m);
                e.x = Math.min(f, k);
                e.y = Math.max(f, k);
                var v = this.Singularity(a / 2, b, d, g, k, m, f, e);
                q = Math.max(u, v)
            }
        } catch (Y) { q = 1 }
        this.evaluator.setVariable(b, l);
        return q
    };
    N.prototype.drawAuxFun = function(b, d, h) {
        c = this.evaluator.parser.getVariable("x");
        k = this.evaluator.parser.getVariable("y");
        a.rangeOK = 1;
        d = "x";
        var m = "y";
        this.of_y && (d = "y", m = "x");
        var f = this.drawif,
            e = this.evaluator.eval(this.width),
            l = !1,
            q = new a.R2(this.space.w / 2 + this.space.Ox, this.space.h / 2 + this.space.Oy),
            g = this.of_y ? q.ix() : q.iy(),
            n = 0,
            p = 0,
            u = 0,
            v = 0,
            y = 1 / this.space.scale;
        q = y * (this.of_y ? -this.space.h + q.y : -q.x);
        var r = 0;
        this.abs_coord && (q = 0, y = 1);
        for (var A, G, w, B, I, F, x, z, D, R = this.of_y ? this.space.h + 2 : this.space.w + 2; u <= R;) {
            A = !0;
            G = 0;
            this.evaluator.setVariable(d, q);
            try {
                w = this.evaluator.eval(this.funExpr),
                    isNaN(w) || (this.evaluator.setVariable(m, w), 0 < this.evaluator.eval(this.drawif) && a.rangeOK ? (l ? (B = Math.min(r, w), I = Math.max(r, w), F = new a.R2(B, I), G = this.Singularity(y, d, 0, q - y, r, q, w, F), 0 === G ? (r <= w ? (r = F.x, w = F.y) : (w = F.x, r = F.y), x = parseInt(this.of_y ? this.XX(e, r, this.abs_coord) : this.YY(e, r, this.abs_coord)), n = this.abs_coord ? Math.round(w) : parseInt(this.of_y ? this.XX(e, w, this.abs_coord) : this.YY(e, w, this.abs_coord)), this.fillM && n > g && (b.lineWidth = 1, b.strokeStyle = this.fillM.getColor(), b.beginPath(), this.of_y ? (b.moveTo(g +
                        1, this.space.h - u + .5), b.lineTo(n, this.space.h - u + .5)) : (b.moveTo(u + .5, g + 1), b.lineTo(u + .5, n)), b.stroke()), this.fillP && n < g && (b.lineWidth = 1, b.strokeStyle = this.fillP.getColor(), b.beginPath(), this.of_y ? (b.moveTo(g - 1, this.space.h - u + .5), b.lineTo(n, this.space.h - u + .5)) : (b.moveTo(u + .5, g - 1), b.lineTo(u + .5, n)), b.stroke()), b.lineWidth = e, b.strokeStyle = h.getColor(), b.beginPath(), this.of_y ? (b.moveTo(x + .5, this.space.h - v), b.lineTo(n + .5, this.space.h - u)) : (b.moveTo(v + .5, x), b.lineTo(u + .5, n)), b.stroke()) : 1 === G ? (this.evaluator.setVariable(d,
                            q - y), z = this.extrapolate(f, d, m, 0, r, y), n = this.of_y ? this.XX(e, z.y, this.abs_coord) : this.YY(e, z.y, this.abs_coord), b.lineWidth = e, b.strokeStyle = h.getColor(), b.beginPath(), this.of_y ? (b.moveTo(p + .5, this.space.h - v), b.lineTo(n + .5, this.space.h - v + Math.round(z.x))) : (b.moveTo(v + .5, p), b.lineTo(v + Math.round(z.x) + .5, n)), this.evaluator.setVariable(d, q), D = this.extrapolate(f, d, m, 0, w, -y), p = this.of_y ? this.XX(e, D.y, this.abs_coord) : this.YY(e, D.y, this.abs_coord), n = this.of_y ? this.XX(e, w, this.abs_coord) : this.YY(e, w, this.abs_coord),
                        b.lineWidth = e, b.strokeStyle = h.getColor(), b.beginPath(), this.of_y ? (b.moveTo(p + .5, this.space.h - u), b.lineTo(n + .5, this.space.h - u)) : (b.moveTo(u + .5, p), b.lineTo(u + .5, n)), b.stroke()) : 2 === G && (n = this.of_y ? this.XX(e, w, this.abs_coord) : this.YY(e, w, this.abs_coord), b.lineWidth = e, b.strokeStyle = h.getColor(), b.beginPath(), this.of_y ? (b.moveTo(p + .5, this.space.h - u), b.lineTo(n + .5, this.space.h - u)) : (b.moveTo(u + .5, p), b.lineTo(u + .5, n)))) : (D = this.extrapolateOnSingularity(f, d, m, 0, w, -y), p = this.of_y ? this.XX(e, D.y, this.abs_coord) :
                        this.YY(e, D.y, this.abs_coord), n = this.of_y ? this.XX(e, w, this.abs_coord) : this.YY(e, w, this.abs_coord), b.lineWidth = e, b.strokeStyle = h.getColor(), b.beginPath(), this.of_y ? (b.moveTo(p, this.space.h - (u + Math.round(D.x)) + .5), b.lineTo(n, this.space.h - u + .5)) : (b.moveTo(u + Math.round(D.x), p), b.lineTo(u, n)), b.stroke()), r = w) : A = !1)
            } catch (aa) { A = !1 }
            l && !A && (this.evaluator.setVariable(d, q - y), this.evaluator.setVariable(m, r), z = this.extrapolate(f, d, m, 0, r, y), n = parseInt(this.of_y ? this.XX(e, z.y, this.abs_coord) : this.YY(e, z.y, this.abs_coord)),
                0 < this.evaluator.eval(this.drawif) && a.rangeOK && (b.lineWidth = e, b.strokeStyle = h.getColor(), b.beginPath(), this.of_y ? (b.moveTo(p, this.space.h - (v + Math.round(z.x)) + .5), b.lineTo(n, this.space.h - (v + Math.round(z.x)) + .5)) : (b.moveTo(v + Math.round(z.x) + .5, p), b.lineTo(v + Math.round(z.x) + .5, n)), b.stroke()), this.evaluator.setVariable(d, q));
            l = A;
            q += y;
            p = n;
            v = u++
        }
        this.evaluator.parser.setVariable("x", c);
        this.evaluator.parser.setVariable("y", k)
    };
    N.prototype.registerTextField = function() {
        var b = a.newHTML("input");
        b.value = this.expresionString;
        b.disabled = !this.editable;
        var d = this;
        oncontextmenu = function(a) { return !1 };
        b.onkeydown = function(a) { 13 == a.keyCode && (d.expresion = d.evaluator.parser.parse(this.value), d.parseExpression(), d.parent.update()) };
        this.parent.editableRegion.textFields.push(b)
    };
    a.Equation = N;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.round,
        f, e, r, p, c, k, l, b = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.parameter = d.parameter || "t";
            d.parameter_interval = d.parameter_interval || b.evaluator.parser.parse("[0,1]");
            d.parameter_steps = d.parameter_steps || b.evaluator.parser.parse("8");
            d.width = d.width || b.evaluator.parser.parse("1");
            d.fill = d.fill || "";
            d.visible = 2 === d.parent.version && void 0 == d.visible ? !0 : d.visible;
            d.visible && d.registerTextField();
            return d
        };
    $jscomp.inherits(b, a.Graphic);
    b.prototype.update =
        function() {
            f = this.evaluator;
            e = f.eval(this.parameter_interval);
            this.paraInf = e[0][0];
            this.paraSup = e[0][1];
            this.pSteps = f.eval(this.parameter_steps);
            this.paraSep = 0 < this.pSteps ? Math.abs(this.paraSup - this.paraInf) / this.pSteps : 0
        };
    b.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.fill, this.color) };
    b.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.fill, this.trace) };
    b.prototype.drawAux = function(b, d, e) {
        f = this.evaluator;
        r = this.space;
        b.lineWidth = Math.max(1E-6, g(f.eval(this.width)));
        b.lineCap = b.lineJoin = "round";
        b.strokeStyle = e.getColor();
        p = f.getVariable(this.parameter);
        b.beginPath();
        f.setVariable(this.parameter, this.paraInf);
        c = f.eval(this.expresion);
        this.exprX = g(this.abs_coord ? c[0][0] : r.getAbsoluteX(c[0][0]));
        this.exprY = g(this.abs_coord ? c[0][1] : r.getAbsoluteY(c[0][1]));
        this.rotateExp && (k = a.degToRad(f.eval(this.rotateExp)), l = this.rotate(c[0][0], c[0][1], k), this.exprX = g(this.abs_coord ? l.x : r.getAbsoluteX(l.x)), this.exprY = g(this.abs_coord ? l.y : r.getAbsoluteY(l.y)));
        b.moveTo(this.exprX +
            .5, this.exprY + .5);
        for (e = 1; e <= this.pSteps; e++) f.setVariable(this.parameter, this.paraInf + e * this.paraSep), c = f.eval(this.expresion), this.rotateExp && (l = this.rotate(c[0][0], c[0][1], k), c[0][0] = l.x, c[0][1] = l.y), this.exprX = g(this.abs_coord ? c[0][0] : r.getAbsoluteX(c[0][0])), this.exprY = g(this.abs_coord ? c[0][1] : r.getAbsoluteY(c[0][1])), !isNaN(this.exprX) && !isNaN(this.exprY) && -1E6 < this.exprX && 1E6 > this.exprX && -1E6 < this.exprY && 1E6 > this.exprY && b.lineTo(this.exprX + .5, this.exprY + .5);
        this.fill && (b.fillStyle = d.getColor(),
            b.fill("evenodd"));
        this.dashStyle();
        b.stroke();
        b.setLineDash([]);
        f.setVariable(this.parameter, p)
    };
    b.prototype.registerTextField = function() {
        var b = a.newHTML("input");
        b.value = this.expresionString;
        b.disabled = !this.editable;
        var d = this;
        b.oncontextmenu = function() { return !1 };
        b.onkeydown = function(a) { 13 == a.keyCode && (d.expresion = d.evaluator.parser.parse(this.value), d.parent.update()) };
        this.parent.editableRegion.textFields.push(b)
    };
    a.Curve = b;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = 2 * Math.PI,
        f = Math.round,
        e, r, p, c, k, l, b, h, d, v, q = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.size = d.size || b.evaluator.parser.parse("2");
            d.range = d.range || b.evaluator.parser.parse("[1, 100]");
            d.visible = 2 === d.parent.version && void 0 == d.visible ? !0 : d.visible;
            d.visible && d.registerTextField();
            return d
        };
    $jscomp.inherits(q, a.Graphic);
    q.prototype.update = function() {
        e = this.evaluator;
        p = e.eval(this.expresion);
        this.exprX = p[0][0];
        this.exprY = p[0][1];
        this.rotateExp &&
            (c = this.rotate(p[0][0], p[0][1], a.degToRad(e.eval(this.rotateExp))), this.exprX = c.x, this.exprY = c.y);
        b = e.eval(this.range);
        this.rangeInf = b[0][0];
        this.rangeMax = b[0][1]
    };
    q.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.color, this.color) };
    q.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.trace, this.trace) };
    q.prototype.drawAux = function(b, c) {
        e = this.evaluator;
        r = this.space;
        d = h = Math.ceil(e.eval(this.size) - .4);
        b.fillStyle = c.getColor();
        b.beginPath();
        this.rangeInf >
            this.rangeMax && (v = this.rangeInf, this.rangeInf = this.rangeMax, this.rangeMax = v);
        c = e.getVariable("n");
        for (var q = this.rangeInf, m = this.rangeMax; q <= m; q++) e.setVariable("n", q), p = e.eval(this.expresion), this.exprX = p[0][0], this.exprY = p[0][1], k = f(this.abs_coord ? this.exprX : r.getAbsoluteX(this.exprX)), l = f(this.abs_coord ? this.exprY : r.getAbsoluteY(this.exprY)), b.beginPath(), b.arc(k, l, h, 0, g, !0), b.fill();
        b.fill();
        this.text != [""] && (this.fontSize = Math.max(5, e.eval(this.font_size)), this.font = this.font_style + " " + this.fontSize +
            "px " + this.font_family, a.Graphic.prototype.drawText.call(this, b, this.text, k + d, l - d, this.color, this.font, "start", "alphabetic", e.eval(this.decimals), this.fixed, !0));
        e.setVariable("n", c)
    };
    q.prototype.registerTextField = function() {
        var b = a.newHTML("input");
        b.value = this.expresionString;
        b.disabled = !this.editable;
        var d = this;
        oncontextmenu = function(a) { return !1 };
        b.onkeydown = function(a) { 13 == a.keyCode && (d.expresion = d.evaluator.parser.parse(this.value), d.parent.update()) };
        this.parent.editableRegion.textFields.push(b)
    };
    a.Sequence = q;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = 2 * Math.PI,
        f = Math.round,
        e, r, p, c, k, l, b, h = function(b, c) {
            c = a.Graphic.call(this, b, c) || this;
            c.size = c.size || b.evaluator.parser.parse("2");
            c.text = new a.TextObject(c, c.text);
            return c
        };
    $jscomp.inherits(h, a.Graphic);
    h.prototype.update = function() {
        e = this.evaluator;
        p = e.eval(this.expresion);
        this.exprX = p[0][0];
        this.exprY = p[0][1];
        this.rotateExp && (c = this.rotate(p[0][0], p[0][1], a.degToRad(e.eval(this.rotateExp))), this.exprX = c.x, this.exprY = c.y)
    };
    h.prototype.draw = function() {
        a.Graphic.prototype.draw.call(this,
            this.color, this.color)
    };
    h.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.trace, this.trace) };
    h.prototype.drawAux = function(a, c) {
        r = this.space;
        a.fillStyle = c.getColor();
        k = f(this.abs_coord ? this.exprX : r.getAbsoluteX(this.exprX));
        l = f(this.abs_coord ? this.exprY : r.getAbsoluteY(this.exprY));
        b = f(this.evaluator.eval(this.size));
        0 < b && (a.beginPath(), a.arc(k, l, b, 0, g), a.fill());
        this.text.hasContent && this.text.draw(a, c, k, l)
    };
    a.Point = h;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.round,
        f = 2 * Math.PI,
        e, r, p, c, k, l, b, h, d, v, q = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.width = d.width || b.evaluator.parser.parse("1");
            d.size = d.size || b.evaluator.parser.parse("2");
            d.text = new a.TextObject(d, d.text);
            return d
        };
    $jscomp.inherits(q, a.Graphic);
    q.prototype.update = function() {
        e = this.evaluator;
        p = e.eval(this.expresion);
        this.endPoints = [];
        for (var b = 0, d = p.length; b < d; b++) this.endPoints[b] = { x: p[b][0], y: p[b][1] };
        if (this.rotateExp)
            for (c = a.degToRad(e.eval(this.rotateExp)),
                b = 0, d = this.endPoints.length; b < d; b++) this.endPoints[b] = this.rotate(this.endPoints[b].x, this.endPoints[b].y, c)
    };
    q.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.color, this.color) };
    q.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.trace, this.trace) };
    q.prototype.drawAux = function(a, c, q) {
        e = this.evaluator;
        r = this.space;
        a.lineWidth = Math.max(1E-6, g(e.eval(this.width)));
        k = e.eval(this.size);
        a.fillStyle = c.getColor();
        a.strokeStyle = q.getColor();
        a.lineCap = "round";
        l =
            0 == a.lineWidth % 2 ? 0 : .5;
        this.abs_coord ? (b = g(this.endPoints[0].x), h = g(this.endPoints[0].y), d = g(this.endPoints[1].x), v = g(this.endPoints[1].y)) : (b = g(r.getAbsoluteX(this.endPoints[0].x)), h = g(r.getAbsoluteY(this.endPoints[0].y)), d = g(r.getAbsoluteX(this.endPoints[1].x)), v = g(r.getAbsoluteY(this.endPoints[1].y)));
        a.beginPath();
        a.moveTo(b + l, h + l);
        a.lineTo(d + l, v + l);
        this.dashStyle();
        a.stroke();
        0 < k && (a.beginPath(), a.arc(b, h, k, 0, f), a.arc(d, v, k, 0, f), a.fill());
        a.setLineDash([]);
        this.text.hasContent && this.text.draw(a,
            q, parseInt((b + d) / 2) - 3, parseInt((h + v) / 2) + 3)
    };
    a.Segment = q;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f = Math.round,
        e, r, p, c, k, l, b, h, d, v, q, u, A, n = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.width = d.width || b.evaluator.parser.parse("5");
            d.size = d.size || b.evaluator.parser.parse("2");
            d.spear = d.spear || b.evaluator.parser.parse("8");
            d.arrow = d.arrow || new a.Color("ee0022");
            d.text = new a.TextObject(d, d.text);
            d.endPoints = [];
            d.vect = new a.Vector2D(0, 0);
            return d
        };
    $jscomp.inherits(n, a.Graphic);
    n.prototype.update = function() {
        e = this.evaluator;
        r = e.eval(this.expresion);
        for (var b = 0, d = r.length; b < d; b++) this.endPoints[b] = { x: r[b][0], y: r[b][1] };
        if (this.rotateExp)
            for (p = a.degToRad(e.eval(this.rotateExp)), b = 0, d = this.endPoints.length; b < d; b++) this.endPoints[b] = this.rotate(this.endPoints[b].x, this.endPoints[b].y, p)
    };
    n.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.arrow, this.color) };
    n.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.arrow, this.trace) };
    n.prototype.drawAux = function(a, n, p) {
        e = this.evaluator;
        c = this.space;
        k = Math.max(0,
            e.eval(this.width));
        l = Math.ceil(k / 2);
        b = c.scale;
        this.vect.x = this.endPoints[1].x - this.endPoints[0].x;
        this.vect.y = this.endPoints[1].y - this.endPoints[0].y;
        h = this.vect.vectorLength();
        this.angle = Math.atan2(this.vect.y, this.vect.x);
        a.fillStyle = n.getColor();
        a.strokeStyle = p.getColor();
        a.lineWidth = 2;
        this.abs_coord ? (d = f(this.endPoints[0].x), v = f(this.endPoints[0].y), q = f(this.endPoints[1].x), u = f(this.endPoints[1].y)) : (d = f(c.getAbsoluteX(this.endPoints[0].x)), v = f(c.getAbsoluteY(this.endPoints[0].y)), q = f(c.getAbsoluteX(this.endPoints[1].x)),
            u = f(c.getAbsoluteY(this.endPoints[1].y)));
        A = Math.max(0, e.eval(this.spear));
        a.save();
        a.translate(d, v);
        this.abs_coord ? a.rotate(this.angle) : (h *= b, a.rotate(-this.angle));
        a.beginPath();
        a.moveTo(-l, g(-l));
        a.lineTo(g(h - A - k), g(-l));
        a.lineTo(g(h - 2 * A), g(-A - l));
        a.lineTo(g(h), 0);
        a.lineTo(g(h - 2 * A), g(A + l));
        a.lineTo(g(h - A - k), g(l));
        a.lineTo(-l, g(l));
        a.closePath();
        a.stroke();
        a.fill();
        a.restore();
        this.text.hasContent && this.text.draw(a, p, parseInt((d + q) / 2) - 3, parseInt((v + u) / 2) + 3)
    };
    a.Arrow = n;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.round,
        f, e, r, p, c, k, l = function(b, c) {
            c = a.Graphic.call(this, b, c) || this;
            c.width = c.width || b.evaluator.parser.parse("1");
            c.fill = c.fill || "";
            c.endPoints = [];
            return c
        };
    $jscomp.inherits(l, a.Graphic);
    l.prototype.update = function() {
        f = this.evaluator;
        r = f.eval(this.expresion);
        for (var b = 0, c = r.length; b < c; b++) this.endPoints[b] = { x: r[b][0], y: r[b][1] };
        if (this.rotateExp)
            for (p = a.degToRad(f.eval(this.rotateExp)), b = 0, c = this.endPoints.length; b < c; b++) this.endPoints[b] = this.rotate(this.endPoints[b].x,
                this.endPoints[b].y, p)
    };
    l.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.fill, this.color) };
    l.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.trace, this.trace) };
    l.prototype.drawAux = function(a, h, d) {
        f = this.evaluator;
        e = this.space;
        a.lineWidth = Math.max(1E-6, g(f.eval(this.width)));
        a.strokeStyle = d.getColor();
        a.lineCap = a.lineJoin = "round";
        c = g(this.abs_coord ? this.endPoints[0].x : e.getAbsoluteX(this.endPoints[0].x));
        k = g(this.abs_coord ? this.endPoints[0].y : e.getAbsoluteY(this.endPoints[0].y));
        a.beginPath();
        a.moveTo(c + 0, k + 0);
        d = 1;
        for (var b = this.endPoints.length; d < b; d++) c = g(this.abs_coord ? this.endPoints[d].x : e.getAbsoluteX(this.endPoints[d].x)), k = g(this.abs_coord ? this.endPoints[d].y : e.getAbsoluteY(this.endPoints[d].y)), a.lineTo(c + 0, k + 0);
        this.fill && (a.fillStyle = h.getColor(), a.fill());
        this.dashStyle();
        a.stroke();
        a.setLineDash([])
    };
    a.Polygon = l;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.round,
        f = Math.min,
        e = Math.max,
        r = Math.abs,
        p, c, k, l, b, h, d, v, q, u, A = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.width = d.width || b.evaluator.parser.parse("1");
            d.fill = d.fill || "";
            d.border_radius = d.border_radius || b.evaluator.parser.parse("0");
            d.endPoints = [];
            return d
        };
    $jscomp.inherits(A, a.Graphic);
    A.prototype.update = function() {
        p = this.evaluator;
        l = p.eval(this.expresion);
        this.exprX = l[0][0];
        this.exprY = l[0][1];
        this.w = 150;
        this.h = 100;
        this.rotateExp && (k = this.rotate(l[0][0],
            l[0][1], a.degToRad(p.eval(this.rotateExp))), this.exprX = k.x, this.exprY = k.y);
        4 <= l[0].length && (this.w = l[0][2], this.h = l[0][3]);
        l[1] && 2 == l[1].length && (this.w = l[1][0], this.h = l[1][1]);
        this.w = e(0, this.w);
        this.h = e(0, this.h)
    };
    A.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.fill, this.color) };
    A.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.fill, this.trace, "trace") };
    A.prototype.drawAux = function(a, m, l, k) {
        p = this.evaluator;
        c = this.space;
        a.lineWidth = Math.max(1E-6, g(p.eval(this.width)));
        a.strokeStyle = l.getColor();
        a.lineCap = "round";
        a.lineJoin = "miter";
        b = g(this.abs_coord ? this.exprX : c.getAbsoluteX(this.exprX)) + 0;
        h = g(this.abs_coord ? this.exprY : c.getAbsoluteY(this.exprY)) + 0;
        d = this.abs_coord ? this.w : this.w * c.scale;
        v = this.abs_coord ? this.h : -this.h * c.scale;
        q = f(e(0, p.eval(this.border_radius)), .5 * r(d), .5 * r(v));
        u = this.abs_coord ? 1 : -1;
        a.beginPath();
        0 !== q ? (a.moveTo(b + q, h), a.lineTo(b + d - q, h), a.quadraticCurveTo(b + d, h, b + d, h + u * q), a.lineTo(b + d, h + v - u * q), a.quadraticCurveTo(b + d, h + v, b + d - q, h + v), a.lineTo(b + q,
            h + v), a.quadraticCurveTo(b, h + v, b, h + v - u * q), a.lineTo(b, h + u * q), a.quadraticCurveTo(b, h, b + q, h), a.lineTo(b + q, h)) : (a.moveTo(b, h), a.lineTo(b + d, h), a.lineTo(b + d, h + v), a.lineTo(b, h + v), a.lineTo(b, h));
        this.fill && (a.fillStyle = m.getColor(), a.fill());
        this.dashStyle();
        a.stroke();
        a.setLineDash([])
    };
    a.Rectangle = A;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.round,
        f = Math.min,
        e = Math.max,
        r = Math.acos,
        p = Math.sqrt,
        c = Math.PI,
        k = c / 2,
        l = 2 * c,
        b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F, D, B, L, I = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.width = d.width || b.evaluator.parser.parse("1");
            d.fill = d.fill || "";
            d.center = d.center || b.evaluator.parser.parse("(0,0)");
            d.radius = d.radius || b.evaluator.parser.parse("1");
            d.init = d.init || "0";
            d.end = d.end || "90";
            d.init.match(/^_\(/) && (d.initFlag = !0, d.init = d.init.substring(1));
            d.end.match(/^_\(/) &&
                (d.endFlag = !0, d.end = d.end.substring(1));
            d.initExpr = b.evaluator.parser.parse(d.init);
            d.endExpr = b.evaluator.parser.parse(d.end);
            d.text = new a.TextObject(d, d.text);
            return d
        };
    $jscomp.inherits(I, a.Graphic);
    I.prototype.update = function() {
        b = this.evaluator;
        h = b.eval(this.center);
        this.exprX = h[0][0];
        this.exprY = h[0][1];
        d = 0;
        this.rotateExp && (d = a.degToRad(b.eval(this.rotateExp)), v = Math.cos(d), q = Math.sin(d), u = this.exprX * v - this.exprY * q, A = this.exprX * q + this.exprY * v, this.exprX = u, this.exprY = A);
        var g = b.eval(this.initExpr),
            B = b.eval(this.endExpr);
        /^(\(|\[)expr(\)|\])$/i.test(this.initExpr.type) && /^(\(|\[)expr(\)|\])$/i.test(this.endExpr.type) ? (n = g[0][0], m = g[0][1], w = B[0][0], x = B[0][1], this.vectors ? this.abs_coord && (m = -m, x = -x) : (n -= this.exprX, m = -m + this.exprY, w -= this.exprX, x = -x + this.exprY, this.abs_coord || (m = -m, x = -x)), y = 0 == n ? 0 > m ? 3 * k : k : r(1 * n / p(n * n + m * m)), z = 0 == w ? 0 > x ? 3 * k : k : r(1 * w / p(w * w + x * x)), y += d, z += d, 0 < n && 0 < m && this.abs_coord && (y = l - y), 0 < n && 0 > m && !this.abs_coord && (y = l - y), 0 > n && 0 > m && !this.abs_coord && (y = l - y), 0 > n && 0 < m && this.abs_coord &&
            (y = l - y), 0 < w && 0 < x && this.abs_coord && (z = l - z), 0 < w && 0 > x && !this.abs_coord && (z = l - z), 0 > w && 0 > x && !this.abs_coord && (z = l - z), 0 > w && 0 < x && this.abs_coord && (z = l - z), this.initFlag ? (G = y, y = z, z = G) : (G = f(y, z), J = e(y, z), y = G, z = J, z - y > c && this.abs_coord && (y = J, z = G), z - y <= c && !this.abs_coord && (y = J, z = G)), this.iniAng = y, this.endAng = z, this.drawPoints = !0) : (this.iniAng = a.degToRad(g) + d, this.endAng = a.degToRad(B) + d, this.drawAngle = !0)
    };
    I.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.fill, this.color) };
    I.prototype.drawTrace =
        function() { a.Graphic.prototype.drawTrace.call(this, this.fill, this.trace) };
    I.prototype.drawAux = function(a, d, c) {
        b = this.evaluator;
        E = this.space;
        B = Math.max(0, b.eval(this.radius));
        a.lineWidth = Math.max(1E-6, g(b.eval(this.width)));
        a.lineCap = "round";
        a.strokeStyle = c.getColor();
        this.abs_coord ? (F = g(this.exprX), D = g(this.exprY)) : (F = g(E.getAbsoluteX(this.exprX)), D = g(E.getAbsoluteY(this.exprY)), B *= E.scale, this.iniAng = -this.iniAng, this.endAng = -this.endAng);
        this.drawAngle && this.iniAng > this.endAng && (L = this.iniAng, this.iniAng =
            this.endAng, this.endAng = L);
        this.fill && (a.fillStyle = d.getColor(), a.beginPath(), a.moveTo(F, D), a.arc(F, D, B, this.iniAng, this.endAng, void 0), a.fill());
        a.beginPath();
        a.arc(F, D, B, this.iniAng, this.endAng, void 0);
        this.dashStyle();
        a.stroke();
        this.text.hasContent && this.text.draw(a, this.color, F, D)
    };
    a.Arc = I;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c = function(c, e) {
        e = a.Graphic.call(this, c, e) || this;
        e.width = e.width || c.evaluator.parser.parse("0");
        e.align || (e.align = "left");
        e.anchor || (e.anchor = "top_left");
        e.shadowColor = e.shadowColor ? e.shadowColor.getColor() : "transparent";
        e.text = new a.TextObject(e, e.text);
        return e
    };
    $jscomp.inherits(c, a.Graphic);
    c.prototype.update = function() {
        g = this.evaluator;
        f = g.eval(this.expresion);
        this.exprX = f[0][0];
        this.exprY = f[0][1];
        this.rotateExp && (e = this.rotate(f[0][0],
            f[0][1], a.degToRad(g.eval(this.rotateExp))), this.exprX = e.x, this.exprY = e.y)
    };
    c.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.color) };
    c.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this, this.trace) };
    c.prototype.drawAux = function(a, c) {
        this.abs_coord ? (r = parseInt(this.exprX), p = parseInt(this.exprY)) : (r = parseInt(this.space.getAbsoluteX(this.exprX)), p = parseInt(this.space.getAbsoluteY(this.exprY)));
        this.text.draw(a, c, r, p)
    };
    a.Text = c;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.round,
        f, e, r, p, c, k, l, b, h, d, v, q = function(b, d) {
            d = a.Graphic.call(this, b, d) || this;
            d.file = d.file || "";
            d.inirot = d.inirot || b.evaluator.parser.parse("0");
            d.img = new Image;
            d.scaleX = d.scaleY = 1;
            d.ratio = b.ratio;
            b = d.expresion.getChildren();
            d.x_e = b[0];
            d.y_e = b[1];
            2 < b.length && (d.centered = !0, d.s_x_e = b[2], d.s_y_e = 3 < b.length ? b[3] : b[2]);
            d.evaluator.eval(d.clip) && (d.clip = d.clip.getChildren());
            d.update();
            return d
        };
    $jscomp.inherits(q, a.Graphic);
    q.prototype.update = function() {
        f =
            this.evaluator;
        var b = f.eval(this.x_e),
            d = f.eval(this.y_e);
        this.exprX = b;
        this.exprY = d;
        this.rotateExp && (e = this.rotate(b, d, a.degToRad(f.eval(this.rotateExp))), this.exprX = e.x, this.exprY = e.y);
        this.centered && (this.scaleX = f.eval(this.s_x_e), this.scaleY = f.eval(this.s_y_e), 0 == this.scaleX && (this.scaleX = 1E-5), 0 == this.scaleY && (this.scaleY = 1E-5));
        var c = this;
        if ((r = f.eval(this.file)) || "" == r) this.img = this.parent.getImage(r), this.img.addEventListener("load", function(a) { c.space.update(!0) })
    };
    q.prototype.draw = function() { a.Graphic.prototype.draw.call(this) };
    q.prototype.drawTrace = function() { a.Graphic.prototype.drawTrace.call(this) };
    q.prototype.drawAux = function(e) {
        f = this.evaluator;
        p = this.space;
        this.img && this.img.ready && this.img.complete && (this.clip ? (d = f.eval(this.clip[2]), v = f.eval(this.clip[3])) : (d = this.img.width, v = this.img.height), this.img.canvas && (d = g(d / this.ratio), v = g(v / this.ratio)), c = this.centered ? 0 : g(d / 2), k = this.centered ? 0 : g(v / 2), l = g(this.abs_coord ? this.exprX : p.getAbsoluteX(this.exprX)), b = g(this.abs_coord ? this.exprY : p.getAbsoluteY(this.exprY)), h =
            a.degToRad(-f.eval(this.inirot)), e.save(), e.translate(l + c, b + k), e.rotate(h), this.opacity && (e.globalAlpha = f.eval(this.opacity)), e.scale(this.scaleX, this.scaleY), this.clip ? e.drawImage(this.img, f.eval(this.clip[0]), f.eval(this.clip[1]), d, v, -d / 2, -v / 2, d, v) : e.drawImage(this.img, -d / 2, -v / 2, d, v), e.restore())
    };
    a.Image = q;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a, b, c) { l = 4 * (b + c * a.width); return { r: a.data[l], g: a.data[l + 1], b: a.data[l + 2], a: a.data[l + 3] } }
    if (a.loadLib) return a;
    var f, e, r, p, c, k, l, b, h = function(b, c) { return a.Graphic.call(this, b, c) || this };
    $jscomp.inherits(h, a.Graphic);
    h.prototype.update = function() {
        f = this.evaluator.eval(this.expresion);
        this.exprX = f[0][0];
        this.exprY = f[0][1]
    };
    h.prototype.draw = function() { a.Graphic.prototype.draw.call(this, this.color, this.color) };
    h.prototype.drawTrace = function() {
        a.Graphic.prototype.drawTrace.call(this,
            this.trace, this.trace)
    };
    h.prototype.drawAux = function(a, h) {
        h.getColor();
        imageData = a.getImageData(0, 0, this.space.w, this.space.h);
        this.abs_coord ? (e = parseInt(this.exprX), r = parseInt(this.exprY)) : (e = parseInt(this.space.getAbsoluteX(this.exprX)), r = parseInt(this.space.getAbsoluteY(this.exprY)));
        if (!(0 > e || 0 > r || e >= this.space.w || r >= this.space.h)) {
            p = [
                [e, r]
            ];
            k = g(imageData, e, r);
            for (b = 0; 0 < p.length;) {
                b++;
                c = p.pop();
                e = c[0];
                r = c[1];
                var d = g(imageData, e, r);
                if (k.r === d.r && k.g === d.g && k.b === d.b && k.a === d.a) {
                    d = imageData;
                    var f =
                        h;
                    l = 4 * (e + r * d.width);
                    d.data[l + 0] = f.r;
                    d.data[l + 1] = f.g;
                    d.data[l + 2] = f.b;
                    d.data[l + 3] = 255 * f.a;
                    0 < e && p.push([e - 1, r]);
                    e < imageData.width - 1 && p.push([e + 1, r]);
                    p.push([e, r - 1]);
                    p.push([e, r + 1])
                }
                if (b >= this.space.w * this.space.h * 3) break
            }
            a.putImageData(imageData, 0, 0)
        }
    };
    a.Fill = h;
    return a
}(descartesJS || {});
descartesJS = function(a, g) {
    if (a.loadLib) return a;
    var f = new String("-text-image-point-polygon-arc-segment-arrow-macro-curve-equation-sequence-rectangle-fill-"),
        e = /[\w\.\-//]*(\.png|\.jpg|\.gif|\.svg)/gi,
        r, p = function(c, k) {
            var l = a.Graphic.call(this, c, k) || this;
            l.hasExpresion = l.hasExpresion || !1;
            l.inirot = l.inirot || c.evaluator.parser.parse("0");
            l.inipos = l.inipos || c.evaluator.parser.parse("(0,0)");
            Object.assign(l, k);
            l.hasExpresion = void 0 !== l.expresion;
            l.graphics = [];
            c = c.lessonParser;
            var b = new a.Tokenizer;
            if (!l.hasExpresion) return l;
            "'" !== l.expresion.charAt(0) && (l.expresion = "'" + l.expresion + "'");
            l.expresion = l.evaluator.parser.parse(l.expresion);
            k = l.evaluator.eval(l.expresion);
            if (k) var h = (h = document.getElementById(k)) && "descartes/macro" == h.type ? h.text : a.openExternalFile(k);
            if (h) {
                var d = a.convertHTMLEntities(h).replace(/\r/g, "").split("\n");
                h = [];
                k = 0;
                for (var p = d.length; k < p; k++)
                    if (d[k].trim()) {
                        var q = d[k].indexOf("=");
                        if (-1 !== q) {
                            q = c.split(d[k]);
                            for (var u = 0, r = q.length; u < r; u++)
                                if (q[u] && 1 < q.length && ("id" === g[q[u][0]] || "type" === g[q[u][0]])) {
                                    h.push(q);
                                    break
                                }
                        }
                    }
                u = function(d, c) {
                    c = b.tokenize(c.replace(/&squot;/g, "'"));
                    for (var h = 0, m = c.length; h < m; h++)
                        if ("identifier" == c[h].type && !a.reservedIds.match("-" + c[h].value + "-") || "R" === c[h].value || "G" === c[h].value || "B" === c[h].value) c[h].value = l.name + "." + c[h].value;
                    return (d.match(/^\\expr/) ? "\\expr " : "\\decimals ") + b.flatTokens(c)
                };
                k = 0;
                for (p = h.length; k < p; k++) {
                    var n = (r = h[k] || [], r[0]) && "id" === r[0][0];
                    d = 0;
                    for (q = r.length; d < q; d++) {
                        var m = r[d][0].indexOf("."); - 1 === m || n ? m = g[r[d][0]] : (m = g[r[d][0].substring(m + 1)], r[d][0] =
                            l.name + "." + r[d][0]);
                        if (!("font" === m || "font_family" === m || ("fill" === m || "color" === m || "border" === m || "arrow" === m) && "(" !== r[d][1].charAt(0) || "file" === m && r[d][1].match(e) || "id" !== m && void 0 !== g[r[d][1]]) || "radius" === m)
                            if ("text" == m)
                                if (r[d][1].match(/\{\\rtf1/)) m = r[d][1], m = m.replace(/\\expr ([a-zA-Z_0-9\u00C0-\u021B+*/%|&^#!?:()><.'\+\-]*)/gi, u), m = m.replace(/\\decimals ([a-zA-Z_0-9\u00C0-\u021B+*/%|&^#!?:()><.'\+\-]*)/gi, u), r[d][1] = m;
                                else {
                                    var w = c.parseText(r[d][1]).textElementsMacros;
                                    for (var x = 0, y = w.length; x <
                                        y; x++) {
                                        m = b.tokenize(w[x].replace(/&squot;/g, "'"));
                                        for (var z = 0, G = m.length; z < G; z++)
                                            if ("identifier" === m[z].type && !a.reservedIds.match("-" + m[z].value + "-") || "R" === m[z].value || "G" === m[z].value || "B" === m[z].value) m[z].value = l.name + "." + m[z].value;
                                        m = b.flatTokens(m).replace(/&squot;/g, "'").replace(/'\+\(/g, "[").replace(/\)\+'/g, "]");
                                        w[x] = m.substring(1, m.length - 1)
                                    }
                                    r[d][1] = w.join("")
                                }
                        else {
                            w = r[d][1].replace(/&squot;/g, "'").split(";");
                            x = 0;
                            for (y = w.length; x < y; x++) {
                                m = b.tokenize(w[x].replace(/\\n/g, ";"));
                                z = 0;
                                for (G =
                                    m.length; z < G; z++)
                                    if ("identifier" === m[z].type && !a.reservedIds.match("-" + m[z].value + "-") || "R" === m[z].value || "G" === m[z].value || "B" === m[z].value) m[z].value = l.name + "." + m[z].value;
                                w[x] = b.flatTokens(m)
                            }
                            r[d][1] = w.join(";")
                        }
                    }
                }
                k = 0;
                for (p = h.length; k < p; k++)
                    if (h[k][0]) {
                        u = "";
                        r = !1;
                        d = 0;
                        for (q = h[k].length; d < q; d++) "type" === g[h[k][d][0]] && f.match("-" + g[h[k][d][1]] + "-") && (r = !0), u = u + h[k][d][0] + "='" + h[k][d][1] + "' ";
                        h[k] = u + (r ? " space='" + l.spaceID + "'" : "");
                        r ? l.graphics.push(c.parseGraphic(h[k], l.abs_coord, l.background, l.inirot)) :
                            c.parseAuxiliar(h[k])
                    }
            }
            return l
        };
    $jscomp.inherits(p, a.Graphic);
    p.prototype.update = function() {
        r = this.evaluator.eval(this.inipos);
        this.iniPosX = r[0][0];
        this.iniPosY = r[0][1]
    };
    p.prototype.drawAux = function(a) { for (var c = 0, e = this.graphics.length; c < e; c++) this.graphics[c] && (a.save(), this.graphics[c].abs_coord ? a.translate(this.iniPosX, this.iniPosY) : a.translate(this.iniPosX * this.space.scale, -this.iniPosY * this.space.scale), this.graphics[c].draw(), a.restore()) };
    a.Macro = p;
    return a
}(descartesJS || {}, babel);
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.sqrt,
        f = Math.sin,
        e = Math.cos,
        r = Math.abs,
        p, c, k, l, b, h, d, v, q, u, A, n, m, w, x, y = function(a, b, d, c) {
            this.x = a || 0;
            this.y = b || 0;
            this.z = d || 0;
            this.w = c || 0;
            this.adjustDec()
        };
    y.prototype.adjustDec = function() {
        this.x = parseInt(1E9 * this.x) / 1E9;
        this.y = parseInt(1E9 * this.y) / 1E9;
        this.z = parseInt(1E9 * this.z) / 1E9
    };
    var z = function(a, b, d, c, h, m, e, f, q, g, l, k, n, p, u, v) {
        this.a00 = a || 0;
        this.a01 = b || 0;
        this.a02 = d || 0;
        this.a03 = c || 0;
        this.a10 = h || 0;
        this.a11 = m || 0;
        this.a12 = e || 0;
        this.a13 = f || 0;
        this.a20 = q || 0;
        this.a21 = g || 0;
        this.a22 = l || 0;
        this.a23 = k || 0;
        this.a30 = n || 0;
        this.a31 = p || 0;
        this.a32 = u || 0;
        this.a33 = v || 0
    };
    z.prototype.setIdentity = function() {
        this.a00 = 1;
        this.a10 = this.a03 = this.a02 = this.a01 = 0;
        this.a11 = 1;
        this.a21 = this.a20 = this.a13 = this.a12 = 0;
        this.a22 = 1;
        this.a32 = this.a31 = this.a30 = this.a23 = 0;
        this.a33 = 1;
        return this
    };
    z.prototype.multiplyVector4 = function(a) {
        return new y(a.x * this.a00 + a.y * this.a10 + a.z * this.a20 + a.w * this.a30, a.x * this.a01 + a.y * this.a11 + a.z * this.a21 + a.w * this.a31, a.x * this.a02 + a.y * this.a12 +
            a.z * this.a22 + a.w * this.a32, a.x * this.a03 + a.y * this.a13 + a.z * this.a23 + a.w * this.a33)
    };
    z.prototype.translate = function(a) { return new z(this.a00, this.a01, this.a02, this.a03, this.a10, this.a11, this.a12, this.a13, this.a20, this.a21, this.a22, this.a23, this.a00 * a.x + this.a10 * a.y + this.a20 * a.z + this.a30, this.a01 * a.x + this.a11 * a.y + this.a21 * a.z + this.a31, this.a02 * a.x + this.a12 * a.y + this.a22 * a.z + this.a32, this.a03 * a.x + this.a13 * a.y + this.a23 * a.z + this.a33) };
    z.prototype.rotateX = function(a) {
        c = f(a);
        k = e(a);
        v = this.a10;
        q = this.a11;
        u = this.a12;
        A = this.a13;
        n = this.a20;
        m = this.a21;
        w = this.a22;
        x = this.a23;
        return new z(this.a00, this.a01, this.a02, this.a03, v * k + n * c, q * k + m * c, u * k + w * c, A * k + x * c, v * -c + n * k, q * -c + m * k, u * -c + w * k, A * -c + x * k, this.a30, this.a31, this.a32, this.a33)
    };
    z.prototype.rotateY = function(a) {
        c = f(a);
        k = e(a);
        l = this.a00;
        b = this.a01;
        h = this.a02;
        d = this.a03;
        n = this.a20;
        m = this.a21;
        w = this.a22;
        x = this.a23;
        return new z(l * k + n * -c, b * k + m * -c, h * k + w * -c, d * k + x * -c, this.a10, this.a11, this.a12, this.a13, l * c + n * k, b * c + m * k, h * c + w * k, d * c + x * k, this.a30, this.a31, this.a32, this.a33)
    };
    z.prototype.rotateZ =
        function(a) {
            c = f(a);
            k = e(a);
            l = this.a00;
            b = this.a01;
            h = this.a02;
            d = this.a03;
            v = this.a10;
            q = this.a11;
            u = this.a12;
            A = this.a13;
            return new z(l * k + v * c, b * k + q * c, h * k + u * c, d * k + A * c, l * -c + v * k, b * -c + q * k, h * -c + u * k, d * -c + A * k, this.a20, this.a21, this.a22, this.a23, this.a30, this.a31, this.a32, this.a33)
        };
    a.norm3D = function(a) { return g(a.x * a.x + a.y * a.y + a.z * a.z) };
    a.normalize3D = function(b) {
        p = a.norm3D(b);
        if (0 === p) return { x: 0, y: 0, z: 0 };
        if (1 === p) return { x: b.x, y: b.y, z: b.z };
        p = 1 / p;
        return { x: b.x * p, y: b.y * p, z: b.z * p }
    };
    a.dotProduct3D = function(a, b) {
        return a.x *
            b.x + a.y * b.y + a.z * b.z
    };
    a.crossProduct3D = function(a, b) { return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x } };
    a.scalarProduct3D = function(a, b) { return { x: a.x * b, y: a.y * b, z: a.z * b } };
    a.subtract3D = function(a, b) { return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z } };
    a.add3D = function(a, b) { return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z } };
    a.equals3DEpsilon = function(a, b, d) { return r(a.x - b.x) <= d && r(a.y - b.y) <= d && r(a.z - b.z) <= d };
    a.Vector4D = y;
    a.Matrix4x4 = z;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a) {
        a.textNode = null;
        0 !== parseInt(this.size) && (a.lineWidth = 1, a.fillStyle = this.backColor, a.strokeStyle = this.frontColor, a.beginPath(), a.arc(this.projVert[0].x, this.projVert[0].y, this.size, 0, c), a.fill(), a.stroke())
    }

    function f(a, b) {
        a.textNode = null;
        a.lineCap = k;
        a.lineJoin = lineJoin;
        a.lineWidth = .4;
        a.beginPath();
        a.moveTo(this.projVert[0].x, this.projVert[0].y);
        q = 1;
        for (u = this.projVert.length; q < u; q++) a.lineTo(this.projVert[q].x, this.projVert[q].y);
        a.closePath();
        "color" === this.model ?
            (a.fillStyle = 0 > this.direction ? this.backColor : this.frontColor, a.strokeStyle = a.fillStyle, a.stroke(), a.fill()) : "light" === this.model || "metal" === this.model ? (a.fillStyle = b.computeColor(0 > this.direction ? this.backColor : this.frontColor, this, "metal" === this.model), a.strokeStyle = a.fillStyle, a.stroke(), a.fill()) : "wire" === this.model && (a.lineWidth = 1.25, a.strokeStyle = this.frontColor, a.stroke());
        this.edges && "wire" !== this.model && (a.lineWidth = 1, a.strokeStyle = this.edges, a.stroke())
    }

    function e(a) {
        a.textNode = null;
        a.oldTextNode =
            "_a1b2c3_";
        d = this.evaluator.getVariable(this.family);
        this.evaluator.setVariable(this.family, this.familyValue);
        this.fontSize = Math.max(5, this.evaluator.eval(this.font_size));
        this.font = this.font_style + " " + this.fontSize + "px " + this.font_family;
        this.drawText(a, this.text, this.projVert[0].x, this.projVert[0].y, this.frontColor, this.font, "left", "alphabetic", this.decimals, this.fixed, !0);
        this.evaluator.setVariable(this.family, d)
    }

    function r(a) {
        a.textNode = null;
        a.lineCap = k;
        a.lineJoin = lineJoin;
        a.lineWidth = this.lineWidth;
        a.strokeStyle = this.frontColor;
        a.beginPath();
        a.moveTo(this.projVert[0].x, this.projVert[0].y);
        a.lineTo(this.projVert[1].x, this.projVert[1].y);
        "dot" === this.lineDash ? (a.lineCap = "butt", a.setLineDash([a.lineWidth, a.lineWidth])) : "dash" === this.lineDash ? (a.lineCap = "butt", a.setLineDash([4 * a.lineWidth, 3 * a.lineWidth])) : "dash_dot" === this.lineDash ? (a.lineCap = "butt", a.setLineDash([4 * a.lineWidth, 2 * a.lineWidth, a.lineWidth, 2 * a.lineWidth])) : a.setLineDash([]);
        a.stroke()
    }

    function p(b, d, c) {
        return a.normalize3D(a.crossProduct3D(a.subtract3D(b,
            d), a.subtract3D(b, c)))
    }
    if (a.loadLib) return a;
    var c = 2 * Math.PI,
        k = lineJoin = "round",
        l, b, h, d, v, q, u, A, n, m, w, x, y, z = function(a, b) {
            Object.assign(this, a);
            this.space = b;
            this.projVert = [];
            this.spaceVertices = [];
            this.newProjVert = [];
            this.newSpaceVert = [];
            "vertex" === this.type ? this.draw = g : "face" === this.type ? (this.normal = p(this.vertices[0], this.vertices[1], this.vertices[2]), this.draw = f) : "text" === this.type ? this.draw = e : "edge" === this.type && (this.draw = r);
            this.isText && (this.computeDepth = function() {
                this.normal = { x: 0, y: 0, z: 0 };
                this.projVert = this.vertices;
                this.depth = this.vertices[0].z;
                this.average = this.vertices[0]
            })
        };
    z.prototype.computeDepth = function(b) {
        this.space = b;
        this.average = { x: 0, y: 0, z: 0 };
        this.removeDoubles();
        this.normal = { x: 0, y: 1, z: 0 };
        this.direction = { x: 1, y: 0, z: 0 };
        q = 0;
        for (u = this.vertices.length; q < u; q++) this.spaceVertices[q] = b.rotateVertex(this.vertices[q]), this.average.x += this.spaceVertices[q].x, this.average.y += this.spaceVertices[q].y, this.average.z += this.spaceVertices[q].z;
        this.average = a.scalarProduct3D(this.average,
            1 / u);
        this.average_proy = b.project(this.average);
        this.depth = a.norm3D(a.subtract3D(b.eye, this.average));
        2 < this.vertices.length && (this.normal = p(this.spaceVertices[0], this.spaceVertices[1], this.spaceVertices[2]));
        q = 0;
        for (u = this.vertices.length; q < u; q++) this.newSpaceVert[q] = this.spaceVertices[q], this.projVert[q] = this.newProjVert[q] = b.project(this.spaceVertices[q]);
        2 < this.vertices.length && (this.direction = p(this.projVert[0], this.projVert[1], this.projVert[2]).z);
        this.minDistanceToEye = Infinity;
        this.maxDistanceToEye = -Infinity;
        this.minx = Infinity;
        this.maxx = -Infinity;
        this.miny = Infinity;
        this.maxy = -Infinity;
        q = 0;
        for (u = this.vertices.length; q < u; q++) A = a.norm3D(a.subtract3D(this.spaceVertices[q], b.eye)), this.minDistanceToEye = Math.min(this.minDistanceToEye, A), this.maxDistanceToEye = Math.max(this.maxDistanceToEye, A);
        q = 0;
        for (u = this.vertices.length; q < u; q++) this.minx > this.projVert[q].x && (this.minx = this.projVert[q].x), this.maxx < this.projVert[q].x && (this.maxx = this.projVert[q].x), this.miny > this.projVert[q].y && (this.miny = this.projVert[q].y),
            this.maxy < this.projVert[q].y && (this.maxy = this.projVert[q].y)
    };
    z.prototype.removeDoubles = function() {
        if ("edge" !== this.type) {
            v = [];
            q = 0;
            for (u = this.vertices.length; q < u; q++)(1E-8 < Math.abs(this.vertices[q].x - this.vertices[(q + 1) % u].x) || 1E-8 < Math.abs(this.vertices[q].y - this.vertices[(q + 1) % u].y) || 1E-8 < Math.abs(this.vertices[q].z - this.vertices[(q + 1) % u].z) || 1E-8 < Math.abs(this.vertices[q].w - this.vertices[(q + 1) % u].w)) && v.push(this.vertices[q]);
            0 === v.length && v.push(this.vertices[0]);
            this.vertices = v
        }
    };
    z.prototype.drawText =
        function(d, c, m, e, f, q, g, k, n, p, u) {
            l = this.evaluator;
            d.textNode = c;
            q = l.eval(this.offset_dist);
            g = -a.degToRad(l.eval(this.offset_angle));
            m += q * Math.cos(g);
            e += q * Math.sin(g);
            d.textNode.pos = { x: m, y: e };
            c.hasContent && (c.draw(d, f, m, e, !0), h = this.fromPoint ? c.textNodes.metrics.w / 2 : 0, b = this.fromPoint ? c.textNodes.metrics.h / 2 : 0, c.draw(d, f, m - h, e - b))
        };
    z.prototype.splitFace = function(b) {
        if (this.intersects(b)) {
            var d = i2 = null,
                c = ix2 = 0,
                h, m;
            var e = this.vertices;
            var f = b.vertices;
            var q = 0;
            for (m = f.length; q < m; q++) {
                var g = this.intersection(f[q],
                    f[(q + 1) % m]);
                if (null !== g)
                    if (null === d) { if (d = g, c = q, 2 === f.length) { i2 = d; break } } else if (!a.equals3DEpsilon(g, d, 1E-8)) {
                    i2 = g;
                    ix2 = q;
                    break
                }
            }
            if (null !== d && null !== i2) {
                q = this.isInterior(d) || this.isInterior(i2);
                var l = h = null;
                if (!q && 3 <= f.length)
                    for (m = 0, e = e.length; m < e; m++)
                        if (g = b.intersection(this.vertices[m], this.vertices[(m + 1) % e]), null !== g)
                            if (null === h) h = g;
                            else if (!a.equals3DEpsilon(g, h, 1E-8)) { l = g; break }
                if (q || null !== h && null !== l && b.isInterior(h) && b.isInterior(l)) {
                    l = !0;
                    e = g = null;
                    if (2 === f.length) a.equals3DEpsilon(d, f[0],
                        1E-8) || a.equals3DEpsilon(d, f[1], 1E-8) ? l = !1 : (g = [], g[0] = f[0], g[1] = d, e = [], e[0] = d, e[1] = f[1]);
                    else
                        for (g = [], e = [], q = m = h = 0; q < f.length; q++) q < c ? g[h++] = f[q] : q == c ? (g[h++] = f[q], g[h++] = d, e[m++] = d) : q < ix2 ? e[m++] = f[q] : q == ix2 ? (e[m++] = f[q], e[m++] = i2, g[h++] = i2) : g[h++] = f[q];
                    if (l) {
                        d = [];
                        d[0] = new z({ vertices: g, type: "face", frontColor: b.frontColor, backColor: b.backColor, edges: b.edges, model: b.model }, this.space);
                        d[0].removeDoubles();
                        d[0].normal = b.normal;
                        d[1] = new z({
                            vertices: e,
                            type: "face",
                            frontColor: b.frontColor,
                            backColor: b.backColor,
                            edges: b.edges,
                            model: b.model
                        }, this.space);
                        d[1].removeDoubles();
                        d[1].normal = b.normal;
                        if (2 < d[0].vertices.length) return 2 < d[1].vertices.length ? d : [d[0]];
                        if (2 < d[1].vertices.length) return [d[1]]
                    }
                }
            }
        }
        return [b]
    };
    z.prototype.intersects = function(a) { return this.intersectsPlane(a) && a.intersectsPlane(this) };
    z.prototype.intersectsPlane = function(b) {
        var d = this.vertices;
        var c = b.vertices;
        if (0 < d.length) {
            var h = a.dotProduct3D(c[0], b.normal);
            var m = a.dotProduct3D(d[0], b.normal);
            if (1E-8 > Math.abs(h - m)) return !0;
            for (var e = 1, f =
                    d.length; e < f; e++)
                if (c = a.dotProduct3D(d[e], b.normal), 1E-8 > Math.abs(h - c) || c > h && m < h || c < h && m > h) return !0
        }
        return !1
    };
    z.prototype.intersection = function(b, d) { var c = this.vertices; if (0 < c.length) { d = a.subtract3D(d, b); var h = a.dotProduct3D(d, this.normal); if (0 !== h && (c = a.dotProduct3D(a.subtract3D(c[0], b), this.normal) / h, -1E-8 < c && 1.00000001 > c)) return a.add3D(b, a.scalarProduct3D(d, c)) } return null };
    z.prototype.isInterior = function(b) {
        var d = this.vertices;
        if (0 < d.length)
            for (var c = 0, h = a.subtract3D(d[0], b), m = 0, e = d.length; m <
                e; m++) {
                var f = a.subtract3D(d[(m + 1) % e], b),
                    q = a.dotProduct3D(a.crossProduct3D(h, f), this.normal);
                if (1E-8 > Math.abs(q)) { if (0 > a.dotProduct3D(h, f)) break } else {
                    if (0 > c && 0 < q || 0 < c && 0 > q) return !1;
                    h = f;
                    c = q
                }
            }
        return !0
    };
    z.prototype.inFrontOf = function(a, b, d) {
        if (this.minDistanceToEye >= b.maxDistanceToEye || this.maxx <= b.minx || this.minx >= b.maxx || this.maxy <= b.miny || this.miny >= b.maxy) return !1;
        for (x = 0; 3 > x; x++)
            if (n = null, n = 0 === x ? this.intersections(b) : 1 === x ? b.verticesContainedIn(this) : this.verticesContainedIn(b), null != n && 0 < n.length) {
                for (y =
                    0; y < n.length; y++) a.push(n[y]);
                q = 0;
                for (u = n.length; q < u; q++) {
                    m = n[q];
                    w = this.space.rayFromEye(m.x, m.y);
                    try { t = this.distanceToEyeAlong(w) - b.distanceToEyeAlong(w); if (t <= -d) return !0; if (t >= d) return !1 } catch (F) {}
                }
            }
        return !1
    };
    z.prototype.intersections = function(b) {
        for (var d = [], c, h, m, e = new a.R2, f = this.newSpaceVert, q = b.newSpaceVert, g = this.newProjVert, l = b.newProjVert, k = 0, n = f.length; k < n; k++) {
            b = f[k];
            c = f[(k + 1) % n];
            for (var p = 0, u = q.length; p < u; p++) h = q[p], m = q[(p + 1) % u], b != h && b != m && c != h && c != m && (h = e.intersection(g[k], g[(k + 1) %
                n], l[p], l[(p + 1) % u]), null != h && d.push(h))
        }
        return d
    };
    z.prototype.distanceToEyeAlong = function(b) { b = a.dotProduct3D(this.normal, b); if (1E-6 < Math.abs(b)) return a.dotProduct3D(a.subtract3D(this.average, this.space.eye), this.normal) / b; throw new Exception("Face is invisible"); };
    z.prototype.verticesContainedIn = function(a) { for (var b = [], d = this.newSpaceVert, c = this.newProjVert, h = 0, m = d.length; h < m; h++) !a.isVertex(d[h]) && a.appearsToContain(c[h]) && b.push(c[h]); return b };
    z.prototype.appearsToContain = function(a) {
        for (var b =
                0, d, c = this.newProjVert, h = 0, m = this.newSpaceVert.length; h < m; h++) {
            d = (c[h].x - a.x) * (c[(h + 1) % m].y - a.y) - (c[(h + 1) % m].x - a.x) * (c[h].y - a.y);
            if (0 != b)
                if (1E-8 > Math.abs(d)) { if (1E-8 < Math.abs(c[h].x - c[(h + 1) % m].x)) return Math.min(c[h].x, c[(h + 1) % m].x) <= a.x + 1E-8 && a.x <= Math.max(c[h].x, c[(h + 1) % m].x) + 1E-8; if (1E-8 < Math.abs(c[h].y - c[(h + 1) % m].y)) return Math.min(c[h].y, c[(h + 1) % m].y) <= a.y + 1E-8 && a.y <= Math.max(c[h].y, c[(h + 1) % m].y) + 1E-8 } else if (0 < b && 0 > d || 0 > b && 0 < d) return !1;
            b = d
        }
        return !0
    };
    z.prototype.isVertex = function(b) {
        for (var d =
                this.newSpaceVert, c = 0, h = d.length; c < h; c++)
            if (a.equals3DEpsilon(b, d[c], 1E-8)) return !0;
        return !1
    };
    a.Primitive3D = z;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a) {
        for (var b = [], d = 0, c, h = a.length, e = a.length - 1; - 1 < e; e--) c = a.charAt(e), 0 == d ? "=" == c && (d = 1) : 1 == d ? " " != c && (d = "<" === c || ">" === c ? 0 : 2) : 2 == d && " " == c && (b.unshift(a.substring(e + 1, h)), h = e, d = 0);
        b.unshift(a.substring(0, h));
        return b
    }
    if (a.loadLib) return a;
    var f = { x: 0, y: 0, z: 0 },
        e, r, p, c, k, l = a.degToRad,
        b, h = function(b, c) {
            this.parent = b;
            this.evaluator = b.evaluator;
            var d = b.evaluator.parser;
            this.spaceID = "E0";
            this.background = !1;
            this.type = "";
            this.color = new a.Color("eeffaa");
            this.backcolor = new a.Color("6090a0");
            this.Nu = this.evaluator.parser.parse("7");
            this.Nv = this.evaluator.parser.parse("7");
            this.drawif = d.parse("1");
            this.abs_coord = !1;
            this.family = "";
            this.family_interval = d.parse("[0,1]");
            this.family_steps = d.parse("8");
            this.font = "SansSerif,PLAIN,18";
            this.fixed = !0;
            this.text = "";
            this.decimals = d.parse("2");
            this.inirot = "(0,0,0)";
            this.inirotEuler = !1;
            this.inipos = d.parse("(0,0,0)");
            this.endrot = "(0,0,0)";
            this.endrotEuler = !1;
            this.endpos = d.parse("(0,0,0)");
            this.model = "color";
            Object.assign(this, c);
            void 0 == this.expresion &&
                "macro" != this.type && (this.expresion = d.parse("(0,0)"));
            this.space = this.getSpace();
            this.canvas = this.background ? this.space.backCanvas : this.space.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.font_str = this.font;
            this.font = a.convertFont(this.font);
            this.fontSize = (this.fontSize = this.font.match(/([\d\.]+)px/)) ? parseFloat(this.fontSize[1]) : 10;
            this.font_style = a.getFontStyle(this.font_str.split(",")[1]);
            if ("boolean" === typeof this.bold || "boolean" === typeof this.italics) this.bold && !this.italics ? this.font_style =
                "Bold " : !this.bold && this.italics ? this.font_style = "Italic " : this.bold && this.italics ? this.font_style = "Italic Bold " : this.bold || this.italics || (this.font_style = " ");
            this.font_family || (this.font_family = this.font_str.split(",")[0]);
            this.font_family = a.getFontName(this.font_family);
            "undefined" === typeof this.font_size && (this.font_size = b.evaluator.parser.parse(this.fontSize.toString()));
            this.inirot.match("Euler") && (this.inirot = this.inirot.replace("Euler", ""), this.inirotEuler = !0);
            this.endrot.match("Euler") &&
                (this.endrot = this.endrot.replace("Euler", ""), this.endrotEuler = !0);
            this.inirot = d.parse(this.inirot);
            this.endrot = d.parse(this.endrot);
            this.inirotM = new a.Matrix4x4;
            this.inirotM_X = new a.Matrix4x4;
            this.inirotM_Y = new a.Matrix4x4;
            this.inirotM_Z = new a.Matrix4x4;
            this.iniposM = new a.Matrix4x4;
            this.endrotM = new a.Matrix4x4;
            this.endrotM_X = new a.Matrix4x4;
            this.endrotM_Y = new a.Matrix4x4;
            this.endrotM_Z = new a.Matrix4x4;
            this.endposM = new a.Matrix4x4
        };
    h.prototype.getSpace = function() {
        for (var a = this.parent.spaces, b, c = 0,
                h = a.length; c < h; c++)
            if (b = a[c], b.id == this.spaceID) return b;
        return a[0]
    };
    h.prototype.getFamilyValues = function() {
        e = this.evaluator;
        r = e.eval(this.family_interval);
        this.familyInf = r[0][0];
        this.familySup = r[0][1];
        this.fSteps = Math.round(e.eval(this.family_steps));
        this.family_sep = 0 < this.fSteps ? (this.familySup - this.familyInf) / this.fSteps : 0
    };
    h.prototype.buildFamilyPrimitives = function() {
        e = this.evaluator;
        this.getFamilyValues();
        p = e.getVariable(this.family);
        if (0 <= this.fSteps)
            for (var a = 0, b = this.fSteps; a <= b; a++) e.setVariable(this.family,
                this.familyInf + a * this.family_sep), this.familyValue = this.familyInf + a * this.family_sep, e.eval(this.drawif) && this.buildPrimitives();
        e.setVariable(this.family, p)
    };
    h.prototype.update = function() {
        this.primitives = [];
        this.evaluator.eval(this.drawif) && (this.family || this.buildPrimitives());
        this.family && this.buildFamilyPrimitives()
    };
    h.prototype.updateMVMatrix = function() {
        c = this.evaluator.eval(this.inirot);
        this.inirotEuler ? (this.inirotM = this.inirotM.setIdentity(), this.inirotM = this.inirotM.rotateZ(l(c[0][0])), this.inirotM =
            this.inirotM.rotateX(l(c[0][1])), this.inirotM = this.inirotM.rotateZ(l(c[0][2]))) : (this.inirotM_X = this.inirotM_X.setIdentity().rotateX(l(c[0][0])), this.inirotM_Y = this.inirotM_Y.setIdentity().rotateY(l(c[0][1])), this.inirotM_Z = this.inirotM_Z.setIdentity().rotateZ(l(c[0][2])));
        c = this.evaluator.eval(this.inipos);
        f = { x: c[0][0], y: c[0][1], z: c[0][2] };
        this.iniposM = this.iniposM.setIdentity().translate(f);
        c = this.evaluator.eval(this.endrot);
        this.endrotEuler ? (this.endrotM = this.endrotM.setIdentity(), this.endrotM =
            this.endrotM.rotateZ(l(c[0][0])), this.endrotM = this.endrotM.rotateX(l(c[0][1])), this.endrotM = this.endrotM.rotateZ(l(c[0][2]))) : (this.endrotM_X = this.endrotM_X.setIdentity().rotateX(l(c[0][0])), this.endrotM_Y = this.endrotM_Y.setIdentity().rotateY(l(c[0][1])), this.endrotM_Z = this.endrotM_Z.setIdentity().rotateZ(l(c[0][2])));
        c = this.evaluator.eval(this.endpos);
        f = { x: c[0][0], y: c[0][1], z: c[0][2] };
        this.endposM = this.endposM.setIdentity().translate(f)
    };
    h.prototype.transformVertex = function(a) {
        this.inirotEuler ? k =
            this.inirotM.multiplyVector4(a) : (k = this.inirotM_X.multiplyVector4(a), k = this.inirotM_Y.multiplyVector4(k), k = this.inirotM_Z.multiplyVector4(k));
        k = this.iniposM.multiplyVector4(k);
        this.endrotEuler ? k = this.endrotM.multiplyVector4(k) : (k = this.endrotM_X.multiplyVector4(k), k = this.endrotM_Y.multiplyVector4(k), k = this.endrotM_Z.multiplyVector4(k));
        k = this.endposM.multiplyVector4(k);
        this.macroChildren && (k = this.applyMacroTransform(k));
        k.adjustDec();
        return k
    };
    h.prototype.applyMacroTransform = function(a) {
        this.macro_inirotEuler ?
            k = this.macro_inirotM.multiplyVector4(a) : (k = this.macro_inirotM_X.multiplyVector4(a), k = this.macro_inirotM_Y.multiplyVector4(k), k = this.macro_inirotM_Z.multiplyVector4(k));
        k = this.macro_iniposM.multiplyVector4(k);
        this.macro_endrotEuler ? k = this.macro_endrotM.multiplyVector4(k) : (k = this.macro_endrotM_X.multiplyVector4(k), k = this.macro_endrotM_Y.multiplyVector4(k), k = this.macro_endrotM_Z.multiplyVector4(k));
        return k = this.macro_endposM.multiplyVector4(k)
    };
    h.prototype.parseExpression = function() {
        for (var a = this.expresion.split(";"),
                b = [], c = 0, h = a.length; c < h; c++) "" !== a[c].trim() && (b = b.concat(g(a[c])));
        c = 0;
        for (h = b.length; c < h; c++) b[c] = this.evaluator.parser.parse(b[c], !0);
        return b
    };
    h.prototype.splitFace = function(a) {
        for (var d = 0, c = this.primitives.length; d < c; d++)
            if (b = [], "face" === this.primitives[d].type) {
                for (var h = 0, e = a.primitives.length; h < e; h++) "face" === a.primitives[h].type ? b = b.concat(this.primitives[d].splitFace(a.primitives[h])) : b.push(a.primitives[h]);
                a.primitives = b
            }
    };
    a.Graphic3D = h;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c = function(c, e) { return a.Graphic3D.call(this, c, e) || this };
    $jscomp.inherits(c, a.Graphic3D);
    c.prototype.buildPrimitives = function() {
        g = this.evaluator;
        this.updateMVMatrix();
        f = g.eval(this.expresion);
        e = f[0][0];
        r = f[0][1];
        p = f[0][2];
        this.primitives.push(new a.Primitive3D({ vertices: [this.transformVertex(new a.Vector4D(e, r, p, 1))], type: "vertex", backColor: this.backcolor.getColor(), frontColor: this.color.getColor(), size: g.eval(this.width) }));
        "" !== this.text &&
            (this.offset_dist = this.offset_dist || g.parser.parse("10"), this.offset_angle = this.offset_angle || g.parser.parse("270"), this.primitives.push(new a.Primitive3D({
                vertices: [this.transformVertex(new a.Vector4D(e, r, p, 1))],
                type: "text",
                fromPoint: !0,
                frontColor: this.color.getColor(),
                font_size: this.font_size,
                font_style: this.font_style,
                font_family: this.font_family,
                decimals: g.eval(this.decimals),
                fixed: this.fixed,
                evaluator: g,
                text: new a.TextObject(this, this.text),
                family: this.family,
                familyValue: this.familyValue,
                offset_dist: this.offset_dist,
                offset_angle: this.offset_angle
            }, this.space)))
    };
    a.Point3D = c;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h = function(b, c) {
        c = a.Graphic3D.call(this, b, c) || this;
        c.width = c.width || b.evaluator.parser.parse("1");
        return c
    };
    $jscomp.inherits(h, a.Graphic3D);
    h.prototype.buildPrimitives = function() {
        l = this.evaluator;
        this.updateMVMatrix();
        k = l.getVariable("u");
        l.setVariable("u", this.Nu);
        b = l.eval(this.expresion);
        g = b[0][0];
        f = b[0][1];
        e = b[0][2];
        r = b[1][0];
        p = b[1][1];
        c = b[1][2];
        this.primitives.push(new a.Primitive3D({
            vertices: [this.transformVertex(new a.Vector4D(g,
                f, e, 1)), this.transformVertex(new a.Vector4D(r, p, c, 1))],
            type: "edge",
            lineDash: this.lineDash,
            frontColor: this.color.getColor(),
            lineWidth: l.eval(this.width)
        }, this.space));
        l.setVariable("u", k)
    };
    a.Segment3D = h;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h, d, v, q, u, A = function(b, d) {
        d = a.Graphic3D.call(this, b, d) || this;
        d.parameter = d.parameter || "t";
        d.parameter_interval = d.parameter_interval || b.evaluator.parser.parse("[0,1]");
        d.parameter_steps = d.parameter_steps || b.evaluator.parser.parse("8");
        d.expresion = d.parseExpression();
        return d
    };
    $jscomp.inherits(A, a.Graphic3D);
    A.prototype.buildPrimitives = function() {
        g = this.evaluator;
        this.updateMVMatrix();
        r = g.getVariable("x");
        p = g.getVariable("y");
        c = g.getVariable("z");
        f = g.getVariable("u");
        e = g.getVariable("v");
        g.setVariable("u", 0);
        g.setVariable("v", 0);
        k = parseInt(g.eval(this.Nu));
        l = parseInt(g.eval(this.Nv));
        b = [];
        for (d = 0; d <= k; d++)
            for (g.setVariable("u", d / k), v = 0; v <= l; v++) {
                g.setVariable("v", v / l);
                q = 0;
                for (u = this.expresion.length; q < u; q++) g.eval(this.expresion[q]);
                b.push(this.transformVertex(new a.Vector4D(g.getVariable("x"), g.getVariable("y"), g.getVariable("z"), 1)))
            }
        var n = this.color.getColor(),
            m = this.backcolor.getColor(),
            w = this.edges ? this.edges.getColor() : "";
        for (d = 0; d <
            k; d++)
            for (v = 0; v < l; v++) h = [], h.push(b[v + d * l + d]), h.push(b[v + 1 + d * l + d]), h.push(b[v + 2 + (d + 1) * l + d]), h.push(b[v + 1 + (d + 1) * l + d]), this.primitives.push(new a.Primitive3D({ vertices: h, type: "face", frontColor: n, backColor: m, edges: w, model: this.model }, this.space));
        g.setVariable("x", r);
        g.setVariable("y", p);
        g.setVariable("z", c);
        g.setVariable("u", f);
        g.setVariable("v", e)
    };
    a.Surface3D = A;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b = function(b, d) {
        d = a.Graphic3D.call(this, b, d) || this;
        d.width = d.width || b.evaluator.parser.parse("1");
        return d
    };
    $jscomp.inherits(b, a.Graphic3D);
    b.prototype.buildPrimitives = function() {
        k = this.evaluator;
        this.updateMVMatrix();
        l = k.eval(this.expresion);
        for (var b = this.color.getColor(), d = 0, v = l.length - 1; d < v; d++) g = l[d][0], f = l[d][1], e = l[d][2], r = l[d + 1][0], p = l[d + 1][1], c = l[d + 1][2], this.primitives.push(new a.Primitive3D({
            vertices: [this.transformVertex(new a.Vector4D(g,
                f, e, 1)), this.transformVertex(new a.Vector4D(r, p, c, 1))],
            type: "edge",
            frontColor: b,
            lineWidth: k.eval(this.width)
        }, this.space))
    };
    a.Polygon3D = b;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l = function(b, c) {
        c = a.Graphic3D.call(this, b, c) || this;
        c.width = c.width || b.evaluator.parser.parse("1");
        c.expresion = c.parseExpression();
        return c
    };
    $jscomp.inherits(l, a.Graphic3D);
    l.prototype.buildPrimitives = function() {
        k = this.evaluator;
        this.updateMVMatrix();
        r = k.getVariable("x");
        p = k.getVariable("y");
        c = k.getVariable("z");
        e = k.getVariable("u");
        k.setVariable("u", 0);
        f = k.eval(this.Nu);
        g = [];
        for (var b = 0; b <= f; b++) {
            k.setVariable("u", b / f);
            for (var h = 0, d =
                    this.expresion.length; h < d; h++) k.eval(this.expresion[h]);
            g.push(this.transformVertex(new a.Vector4D(k.getVariable("x"), k.getVariable("y"), k.getVariable("z"), 1)))
        }
        b = 0;
        for (h = g.length - 1; b < h; b++) this.primitives.push(new a.Primitive3D({ vertices: [g[b], g[b + 1]], type: "edge", frontColor: this.color.getColor(), lineWidth: k.eval(this.width) }, this.space));
        this.fill && 2 < g.length && this.primitives.push(new a.Primitive3D({ vertices: g, type: "face", frontColor: this.fill.getColor(), backColor: this.fill.getColor(), edges: "", model: this.model },
            this.space));
        k.setVariable("x", r);
        k.setVariable("y", c);
        k.setVariable("z", p);
        k.setVariable("u", e)
    };
    a.Curve3D = l;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h, d, v = function(b, d) { return a.Graphic3D.call(this, b, d) || this };
    $jscomp.inherits(v, a.Graphic3D);
    v.prototype.buildPrimitives = function() {
        h = this.evaluator;
        this.updateMVMatrix();
        d = h.eval(this.expresion);
        g = d[0][0];
        f = d[0][1];
        e = d[0][2];
        r = d[1][0];
        p = d[1][1];
        c = d[1][2];
        k = d[2][0];
        l = d[2][1];
        b = d[2][2];
        var q = this.edges ? this.edges.getColor() : "";
        this.primitives.push(new a.Primitive3D({
            vertices: [this.transformVertex(new a.Vector4D(g, f, e, 1)), this.transformVertex(new a.Vector4D(k,
                l, b, 1)), this.transformVertex(new a.Vector4D(r, p, c, 1))],
            type: "face",
            frontColor: this.color.getColor(),
            backColor: this.backcolor.getColor(),
            edges: q,
            model: this.model
        }, this.space))
    };
    a.Triangle3D = v;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r = function(e, c) { return a.Graphic3D.call(this, e, c) || this };
    $jscomp.inherits(r, a.Graphic3D);
    r.prototype.buildPrimitives = function() {
        f = this.evaluator;
        this.updateMVMatrix();
        e = f.eval(this.expresion);
        g = [];
        for (var p = e.length - 1; 0 <= p; p--) g.push(this.transformVertex(new a.Vector4D(e[p][0], e[p][1], e[p][2], 1)));
        p = this.edges ? this.edges.getColor() : "";
        this.primitives.push(new a.Primitive3D({
            vertices: g,
            type: "face",
            frontColor: this.color.getColor(),
            backColor: this.backcolor.getColor(),
            edges: p,
            model: this.model
        }, this.space))
    };
    a.Face3D = r;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k = function(c, b) {
        b = a.Graphic3D.call(this, c, b) || this;
        b.width = b.width || c.evaluator.parser.parse("2");
        b.length = b.length || c.evaluator.parser.parse("2");
        return b
    };
    $jscomp.inherits(k, a.Graphic3D);
    k.prototype.buildPrimitives = function() {
        c = this.evaluator;
        this.updateMVMatrix();
        g = c.eval(this.Nu);
        f = [this.transformVertex(new a.Vector4D(0, 0, 0, 1))];
        e = c.eval(this.width) / 2;
        r = c.eval(this.length) / 2;
        p = 2 * Math.PI / g;
        for (var l = 0; l < g; l++) f.push(this.transformVertex(new a.Vector4D(e *
            Math.cos(p * l), r * Math.sin(p * l), 0, 1)));
        var b = this.color.getColor(),
            h = this.backcolor.getColor(),
            d = this.edges ? this.edges.getColor() : "";
        for (l = 0; l < g; l++) this.primitives.push(new a.Primitive3D({ vertices: [f[0], l + 2 <= g ? f[l + 2] : f[1], f[l + 1]], type: "face", frontColor: b, backColor: h, edges: d, model: this.model }, this.space))
    };
    a.Polireg3D = k;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p = function(c, e) {
        c = a.Graphic3D.call(this, c, e) || this;
        c.shadowColor = c.shadowColor ? c.shadowColor.getColor() : "transparent";
        return c
    };
    $jscomp.inherits(p, a.Graphic3D);
    p.prototype.buildPrimitives = function() {
        g = this.evaluator;
        f = g.eval(this.expresion);
        e = f[0][0];
        r = f[0][1];
        this.primitives.push(new a.Primitive3D({
            vertices: [new a.Vector4D(e, r, 0, 1)],
            type: "text",
            frontColor: this.color.getColor(),
            font_size: this.font_size,
            font_style: this.font_style,
            font_family: this.font_family,
            decimals: g.eval(this.decimals),
            fixed: this.fixed,
            displace: 0,
            isText: !0,
            evaluator: g,
            text: new a.TextObject(this, this.text),
            family: this.family,
            familyValue: this.familyValue
        }, this.space))
    };
    a.Text3D = p;
    return a
}(descartesJS || {});
descartesJS = function(a, g) {
    if (a.loadLib) return a;
    var f = new String("-point-segment-polygon-curve-triangle-face-polireg-surface-text-cube-box-tetrahedron-octahedron-sphere-dodecahedron-icosahedron-ellipsoid-cone-cylinder-torus-mesh-macro-"),
        e = /[\w\.\-//]*(\.png|\.jpg|\.gif|\.svg)/gi,
        r, p, c = 0,
        k = function(l, b) {
            var h = a.Graphic.call(this, l, b) || this;
            h.expresion = h.expresion || void 0;
            h.inirot = h.inirot || "(0,0,0)";
            h.inirotEuler = h.inirotEuler || !1;
            h.inipos = h.inipos || l.evaluator.parser.parse("(0,0,0)");
            h.endrot = h.endrot ||
                "(0,0,0)";
            h.endrotEuler = h.endrotEuler || !1;
            h.endpos = h.endpos || l.evaluator.parser.parse("(0,0,0)");
            h.name = h.name || "_descartes_empty_name_" + c++;
            Object.assign(h, b);
            h.inirot.match("Euler") && (h.inirot = h.inirot.replace("Euler", ""), h.inirotEuler = !0);
            h.endrot.match("Euler") && (h.endrot = h.endrot.replace("Euler", ""), h.endrotEuler = !0);
            h.inirot = h.evaluator.parser.parse(h.inirot);
            h.endrot = h.evaluator.parser.parse(h.endrot);
            h.inirotM = new a.Matrix4x4;
            h.inirotM_X = new a.Matrix4x4;
            h.inirotM_Y = new a.Matrix4x4;
            h.inirotM_Z =
                new a.Matrix4x4;
            h.iniposM = new a.Matrix4x4;
            h.endrotM = new a.Matrix4x4;
            h.endrotM_X = new a.Matrix4x4;
            h.endrotM_Y = new a.Matrix4x4;
            h.endrotM_Z = new a.Matrix4x4;
            h.endposM = new a.Matrix4x4;
            h.graphics = [];
            l = l.lessonParser;
            var d = new a.Tokenizer;
            if (void 0 == h.expresion) return h;
            "'" !== h.expresion.charAt(0) && (h.expresion = "'" + h.expresion + "'");
            h.expresion = h.evaluator.parser.parse(h.expresion);
            b = h.evaluator.eval(h.expresion);
            if (b) var k = (k = document.getElementById(b)) && "descartes/macro" == k.type ? k.text : a.openExternalFile(b);
            if (k) {
                var q = a.convertHTMLEntities(k).replace(/\r/g, "").split("\n");
                k = [];
                b = 0;
                for (var p = q.length; b < p; b++) {
                    var r = q[b].indexOf("=");
                    if (-1 !== r) {
                        r = l.split(q[b]);
                        for (var n = 0, m = r.length; n < m; n++)
                            if (r[n] && 1 < r.length && ("id" === g[r[n][0]] || "type" === g[r[n][0]])) { k.push(r); break }
                    }
                }
                b = 0;
                for (p = k.length; b < p; b++) {
                    m = (n = k[b] || [], n[0]) && "id" === n[0][0];
                    var w = !1;
                    q = 0;
                    for (r = n.length; q < r; q++) {
                        var x = n[q][0].indexOf("."); - 1 === x || m ? x = g[n[q][0]] : (x = g[n[q][0].substring(x + 1)], n[q][0] = h.name + "." + n[q][0]);
                        "type" === x && "surface" === g[n[q][1]] &&
                            (w = !0);
                        if (!("font" === x || "font_family" === x || ("fill" === x || "color" === x || "backcolor" === x || "arrow" === x) && "(" !== n[q][1].charAt(0) || "file" === x && n[q][1].match(e) || "id" !== x && void 0 !== g[n[q][1]] || w && "expresion" === x) || "width" === x || "height" === x || "length" === x)
                            if ("text" == x)
                                if (n[q][1].match(/\{\\rtf1/)) {
                                    x = n[q][1];
                                    var y = h;
                                    var z = function(b, c) {
                                        c = d.tokenize(c.replace(/&squot;/g, "'"));
                                        for (var h = 0, m = c.length; h < m; h++)
                                            if ("identifier" == c[h].type && !a.reservedIds.match("-" + c[h].value + "-") || "R" === c[h].value || "G" === c[h].value ||
                                                "B" === c[h].value) c[h].value = y.name + "." + c[h].value;
                                        return (b.match(/^\\expr/) ? "\\expr " : "\\decimals ") + d.flatTokens(c)
                                    };
                                    x = x.replace(/\\expr ([a-zA-Z_0-9\u00C0-\u021B+*/%|&^#!?:()><.'\+\-]*)/gi, z);
                                    x = x.replace(/\\decimals ([a-zA-Z_0-9\u00C0-\u021B+*/%|&^#!?:()><.'\+\-]*)/gi, z);
                                    n[q][1] = x
                                } else {
                                    z = l.parseText(n[q][1]).textElementsMacros;
                                    for (var G = 0, J = z.length; G < J; G++) {
                                        x = d.tokenize(z[G].replace(/&squot;/g, "'"));
                                        for (var E = 0, F = x.length; E < F; E++)
                                            if ("identifier" === x[E].type && !a.reservedIds.match("-" + x[E].value +
                                                    "-") || "R" === x[E].value || "G" === x[E].value || "B" === x[E].value) x[E].value = h.name + "." + x[E].value;
                                        x = d.flatTokens(x).replace(/&squot;/g, "'").replace(/'\+\(/g, "[").replace(/\)\+'/g, "]");
                                        z[G] = x.substring(1, x.length - 1)
                                    }
                                    n[q][1] = z.join("")
                                }
                        else {
                            z = n[q][1].replace(/&squot;/g, "'").split(";");
                            G = 0;
                            for (J = z.length; G < J; G++) {
                                x = d.tokenize(z[G].replace(/\\n/g, ";"));
                                E = 0;
                                for (F = x.length; E < F; E++)
                                    if ("identifier" === x[E].type && !a.reservedIds.match("-" + x[E].value + "-") || "R" === x[E].value || "G" === x[E].value || "B" === x[E].value) x[E].value =
                                        h.name + "." + x[E].value;
                                z[G] = d.flatTokens(x)
                            }
                            n[q][1] = z.join(";")
                        }
                    }
                }
                b = 0;
                for (p = k.length; b < p; b++)
                    if (k[b][0]) {
                        n = "";
                        m = !1;
                        q = 0;
                        for (r = k[b].length; q < r; q++) "type" === g[k[b][q][0]] && f.match("-" + g[k[b][q][1]] + "-") && (m = !0), n = n + k[b][q][0] + "='" + k[b][q][1] + "' ";
                        k[b] = n + (m ? " space='" + h.spaceID + "'" : "");
                        m ? h.graphics.push(l.parse3DGraphic(k[b], h.abs_coord, h.background, h.inirot)) : l.parseAuxiliar(k[b])
                    }
            }
            b = 0;
            for (p = h.graphics.length; b < p; b++) h.graphics[b].macroChildren = !0;
            return h
        };
    $jscomp.inherits(k, a.Graphic);
    k.prototype.buildFamilyPrimitives =
        function() {
            evaluator = this.evaluator;
            this.getFamilyValues();
            var a = evaluator.getVariable(this.family);
            if (0 <= this.fSteps)
                for (var b = 0, c = this.fSteps; b <= c; b++) evaluator.setVariable(this.family, this.familyInf + b * this.family_sep), this.familyValue = this.familyInf + b * this.family_sep, evaluator.eval(this.drawif) && this.updateMacro();
            evaluator.setVariable(this.family, a)
        };
    k.prototype.update = function() {
        this.primitives = [];
        this.evaluator.eval(this.drawif) && (this.family || this.updateMacro());
        this.family && this.buildFamilyPrimitives()
    };
    k.prototype.updateMacro = function() {
        this.updateTransformation();
        if (this.inipos) {
            var a = this.evaluator.eval(this.inipos);
            this.iniPosX = a[0][0];
            this.iniPosY = a[0][1]
        }
        a = 0;
        for (var b = this.graphics.length; a < b; a++) r = this.graphics[a], r.macro_inirotEuler = this.inirotEuler, r.macro_inirotM = this.inirotM, r.macro_inirotM_X = this.inirotM_X, r.macro_inirotM_Y = this.inirotM_Y, r.macro_inirotM_Z = this.inirotM_Z, r.macro_iniposM = this.iniposM, r.macro_endrotEuler = this.endrotEuler, r.macro_endrotM = this.endrotM, r.macro_endrotM_X = this.endrotM_X,
            r.macro_endrotM_Y = this.endrotM_Y, r.macro_endrotM_Z = this.endrotM_Z, r.macro_endposM = this.endposM, r.update();
        a = 0;
        for (b = this.graphics.length; a < b; a++) {
            r = this.graphics[a];
            if (r.split || this.split)
                for (var c = a + 1; c < b; c++) p = this.graphics[c], (p.split || this.split) && r.splitFace(p);
            this.primitives = this.primitives.concat(r.primitives || [])
        }
    };
    k.prototype.updateTransformation = function() {
        tmpExpr = this.evaluator.eval(this.inirot);
        this.inirotEuler ? (this.inirotM = this.inirotM.setIdentity(), this.inirotM = this.inirotM.rotateZ(a.degToRad(tmpExpr[0][0])),
            this.inirotM = this.inirotM.rotateX(a.degToRad(tmpExpr[0][1])), this.inirotM = this.inirotM.rotateZ(a.degToRad(tmpExpr[0][2]))) : (this.inirotM_X = this.inirotM_X.setIdentity().rotateX(a.degToRad(tmpExpr[0][0])), this.inirotM_Y = this.inirotM_Y.setIdentity().rotateY(a.degToRad(tmpExpr[0][1])), this.inirotM_Z = this.inirotM_Z.setIdentity().rotateZ(a.degToRad(tmpExpr[0][2])));
        tmpExpr = this.evaluator.eval(this.inipos);
        translate = { x: tmpExpr[0][0], y: tmpExpr[0][1], z: tmpExpr[0][2] };
        this.iniposM = this.iniposM.setIdentity().translate(translate);
        tmpExpr = this.evaluator.eval(this.endrot);
        this.endrotEuler ? (this.endrotM = this.endrotM.setIdentity(), this.endrotM = this.endrotM.rotateZ(a.degToRad(tmpExpr[0][0])), this.endrotM = this.endrotM.rotateX(a.degToRad(tmpExpr[0][1])), this.endrotM = this.endrotM.rotateZ(a.degToRad(tmpExpr[0][2]))) : (this.endrotM_X = this.endrotM_X.setIdentity().rotateX(a.degToRad(tmpExpr[0][0])), this.endrotM_Y = this.endrotM_Y.setIdentity().rotateY(a.degToRad(tmpExpr[0][1])), this.endrotM_Z = this.endrotM_Z.setIdentity().rotateZ(a.degToRad(tmpExpr[0][2])));
        tmpExpr = this.evaluator.eval(this.endpos);
        translate = { x: tmpExpr[0][0], y: tmpExpr[0][1], z: tmpExpr[0][2] };
        this.endposM = this.endposM.setIdentity().translate(translate)
    };
    k.prototype.drawAux = function(a) {};
    a.Macro3D = k;
    return a
}(descartesJS || {}, babel);
descartesJS = function(a) {
    function g(a, b, d, c, h) { f.call(this, a / n, a / n, a / n, c, h) }

    function f(a, b, d, c, h) {
        a /= 2;
        b /= 2;
        d /= 2;
        this.changeGeometry(a, b, d, c, h) || (this.vertices = [new m(a, d, b, 1), new m(a, -d, b, 1), new m(a, d, -b, 1), new m(a, -d, -b, 1), new m(-a, d, b, 1), new m(-a, -d, b, 1), new m(-a, d, -b, 1), new m(-a, -d, -b, 1)], this.faces = [
            [2, 3, 1, 0],
            [1, 5, 4, 0],
            [5, 7, 6, 4],
            [6, 7, 3, 2],
            [4, 6, 2, 0],
            [3, 7, 5, 1]
        ], this.updateValues(a, b, d, c, h))
    }

    function e(a, b, d, c, h) {
        a /= 2;
        if (!this.changeGeometry(a, b, d, c, h)) {
            var e = 2 * Math.PI / 3,
                f = 2 * a * Math.sqrt(2) / 3,
                g = -a /
                3,
                q = f * Math.cos(e) + 0 * Math.sin(e);
            e = -f * Math.sin(e) + 0 * Math.cos(e);
            this.vertices = [new m(0, 0, a, 1), new m(q, e, g, 1), new m(q, -e, g, 1), new m(f, 0, g, 1)];
            this.faces = [
                [1, 3, 2],
                [0, 1, 2],
                [0, 2, 3],
                [0, 3, 1]
            ];
            this.updateValues(a, b, d, c, h)
        }
    }

    function r(a, b, d, c, h) {
        a /= 2;
        this.changeGeometry(a, b, d, c, h) || (this.vertices = [new m(0, 0, a, 1), new m(a, 0, 0, 1), new m(-a, 0, 0, 1), new m(0, a, 0, 1), new m(0, -a, 0, 1), new m(0, 0, -a, 1)], this.faces = [
            [3, 1, 0],
            [2, 3, 0],
            [1, 4, 0],
            [4, 2, 0],
            [1, 3, 5],
            [3, 2, 5],
            [4, 1, 5],
            [2, 4, 5]
        ], this.updateValues(a, b, d, c, h))
    }

    function p(b,
        d, c, h, e) {
        b /= Math.PI;
        if (!this.changeGeometry(b, d, c, h, e)) {
            B = b / 1.6180339887;
            L = 1.6180339887 * b;
            this.vertices = [new m(b, b, b, 1), new m(b, b, -b, 1), new m(b, -b, b, 1), new m(b, -b, -b, 1), new m(-b, b, b, 1), new m(-b, b, -b, 1), new m(-b, -b, b, 1), new m(-b, -b, -b, 1), new m(0, B, L, 1), new m(0, B, -L, 1), new m(0, -B, L, 1), new m(0, -B, -L, 1), new m(B, L, 0, 1), new m(B, -L, 0, 1), new m(-B, L, 0, 1), new m(-B, -L, 0, 1), new m(L, 0, B, 1), new m(L, 0, -B, 1), new m(-L, 0, B, 1), new m(-L, 0, -B, 1)];
            I = (new a.Matrix4x4).setIdentity().rotateY(-u / 6);
            H = 0;
            for (P = this.vertices.length; H <
                P; H++) this.vertices[H] = I.multiplyVector4(this.vertices[H]);
            this.faces = [
                [0, 16, 2, 10, 8],
                [12, 1, 17, 16, 0],
                [8, 4, 14, 12, 0],
                [2, 16, 17, 3, 13],
                [13, 15, 6, 10, 2],
                [6, 18, 4, 8, 10],
                [3, 17, 1, 9, 11],
                [13, 3, 11, 7, 15],
                [1, 12, 14, 5, 9],
                [11, 9, 5, 19, 7],
                [5, 14, 4, 18, 19],
                [6, 15, 7, 19, 18]
            ];
            this.updateValues(b, d, c, h, e)
        }
    }

    function c(b, d, c, h, e) {
        b /= 3.8;
        if (!this.changeGeometry(b, d, c, h, e)) {
            L = 1.6180339887 * b;
            this.vertices = [new m(0, b, L, 1), new m(0, b, -L, 1), new m(0, -b, L, 1), new m(0, -b, -L, 1), new m(b, L, 0, 1), new m(b, -L, 0, 1), new m(-b, L, 0, 1), new m(-b, -L, 0, 1),
                new m(L, 0, b, 1), new m(L, 0, -b, 1), new m(-L, 0, b, 1), new m(-L, 0, -b, 1)
            ];
            this.faces = [
                [10, 0, 2],
                [0, 8, 2],
                [8, 5, 2],
                [5, 7, 2],
                [7, 10, 2],
                [6, 0, 10],
                [11, 6, 10],
                [7, 11, 10],
                [7, 3, 11],
                [5, 3, 7],
                [9, 3, 5],
                [8, 9, 5],
                [4, 9, 8],
                [0, 4, 8],
                [6, 4, 0],
                [11, 3, 1],
                [6, 11, 1],
                [4, 6, 1],
                [9, 4, 1],
                [3, 9, 1]
            ];
            I = (new a.Matrix4x4).setIdentity().rotateY(-1.0285);
            H = 0;
            for (P = this.vertices.length; H < P; H++) this.vertices[H] = I.multiplyVector4(this.vertices[H]);
            this.updateValues(b, d, c, h, e)
        }
    }

    function k(a, b, d, c, h) {
        a /= 2;
        this.isSphere ? d = b = a : (b /= 2, d /= 2);
        if (!this.changeGeometry(a,
                b, d, c, h)) {
            this.vertices = [new m(0, 0, b, 1)];
            for (H = 1; H < c; H++)
                for (E = H * u / c, C = 0; C < h; C++) J = C * A / h, y = a * v(E) * q(J), z = d * v(E) * v(J), G = b * q(E), this.vertices.push(new m(y, z, G, 1));
            this.vertices.push(new m(0, 0, -b, 1));
            this.faces = [];
            for (H = 0; H < h; H++) this.faces.push([0, (H + 1) % h + 1, H % h + 1]);
            for (H = 1; H < c - 1; H++)
                for (C = 0; C < h; C++) this.faces.push([C + 1 + (H - 1) * h, (C + 1) % h + 1 + (H - 1) * h, (C + 1) % h + 1 + H * h, C + 1 + H * h]);
            for (H = 0; H < h; H++) this.faces.push([this.vertices.length - 1, this.vertices.length - 1 - h + H, this.vertices.length - 1 - h + (H + 1) % h]);
            this.updateValues(a,
                b, d, c, h)
        }
    }

    function l(a, b, d, c, h) {
        a /= 2;
        b /= 2;
        d /= 2;
        if (!this.changeGeometry(a, b, d, c, h)) {
            this.vertices = [];
            for (H = 0; H < h; H++)
                for (C = 0; C < c; C++) y = a * (h - H) / h * q(C * A / c), z = d * (h - H) / h * v(C * A / c), G = b - 2 * H * b / h, this.vertices.push(new m(y, z, G, 1));
            this.vertices.push(new m(0, 0, -b, 1));
            this.faces = [];
            for (H = 0; H < h - 1; H++)
                for (C = 0; C < c; C++) this.faces.push([C + H * c, (C + 1) % c + H * c, (C + 1) % c + (H + 1) * c, C + (H + 1) * c]);
            for (H = 0; H < c; H++) this.faces.push([this.vertices.length - 1, this.vertices.length - 1 - c + H, this.vertices.length - 1 - c + (H + 1) % c]);
            this.updateValues(a,
                b, d, c, h)
        }
    }

    function b(a, b, d, c, h) {
        a /= 2;
        b /= 2;
        d /= 2;
        if (!this.changeGeometry(a, b, d, c, h)) {
            this.vertices = [];
            for (H = 0; H < h + 1; H++)
                for (C = 0; C < c; C++) y = a * q(C * A / c), z = d * v(C * A / c), G = b - 2 * H * b / h, this.vertices.push(new m(y, z, G, 1));
            this.faces = [];
            for (H = 0; H < h; H++)
                for (C = 0; C < c; C++) this.faces.push([C + H * c, (C + 1) % c + H * c, (C + 1) % c + (H + 1) * c, C + (H + 1) * c]);
            this.updateValues(a, b, d, c, h)
        }
    }

    function h(a, b, d, c, h) {
        a /= 2;
        b /= 2;
        d /= 2;
        F = w.eval(this.R);
        D = w.eval(this.r);
        if (!this.changeGeometry(a, b, d, c, h)) {
            this.vertices = [];
            for (H = 0; H < h + 1; H++)
                for (C = 0; C < c; C++) y = -(F + D * v(A * C / c)) * v(A * H / h), z = (F + D * v(A * C / c)) * q(A * H / h), G = D * q(A * C / c), this.vertices.push(new m(y, z, G, 1));
            this.faces = [];
            for (H = 0; H < h; H++)
                for (C = 0; C < c; C++) this.faces.push([C + H * c, C + (H + 1) * c, (C + 1) % c + (H + 1) * c, (C + 1) % c + H * c]);
            this.updateValues(a, b, d, c, h)
        }
    }

    function d() {
        this.vertices = [];
        this.faces = [];
        H = 0;
        for (P = this.fileData.length; H < P; H++) M = this.fileData[H], M.match(/^V\(/) ? (O = M.substring(2, M.length - 1).split(",").map(parseFloats), this.vertices.push(new m(O[0] || 0, O[1] || 0, O[2] || 0, 1))) : M.match(/^F\(/) && (O = M.substring(2,
            M.length - 1).split(",").map(parseInt), this.faces.push(O.reverse()))
    }
    if (a.loadLib) return a;
    var v = Math.sin,
        q = Math.cos,
        u = Math.PI,
        A = 2 * u,
        n = Math.sqrt(3),
        m, w, x, y, z, G, J, E, F, D, B, L, I, M, O, H, P, C, N, K = function(q, n) {
            n = a.Graphic3D.call(this, q, n) || this;
            n.width = n.width || q.evaluator.parser.parse("2");
            n.height = n.height || q.evaluator.parser.parse("2");
            n.length = n.length || q.evaluator.parser.parse("2");
            n.R = n.R || q.evaluator.parser.parse("2");
            n.r = n.r || q.evaluator.parser.parse("1");
            m = a.Vector4D;
            switch (n.subType) {
                case "cube":
                    n.buildGeometry =
                        g;
                    break;
                case "box":
                    n.buildGeometry = f;
                    break;
                case "tetrahedron":
                    n.buildGeometry = e;
                    break;
                case "octahedron":
                    n.buildGeometry = r;
                    break;
                case "sphere":
                    n.isSphere = !0;
                case "ellipsoid":
                    n.buildGeometry = k;
                    break;
                case "dodecahedron":
                    n.buildGeometry = p;
                    break;
                case "icosahedron":
                    n.buildGeometry = c;
                    break;
                case "cone":
                    n.buildGeometry = l;
                    break;
                case "cylinder":
                    n.buildGeometry = b;
                    break;
                case "torus":
                    n.buildGeometry = h;
                    break;
                case "mesh":
                    n.fileData = a.openExternalFile(n.evaluator.eval(n.file)).split(/\r/), n.buildGeometry = d
            }
            return n
        };
    $jscomp.inherits(K, a.Graphic3D);
    K.prototype.buildPrimitives = function() {
        w = this.evaluator;
        this.updateMVMatrix();
        this.buildGeometry(w.eval(this.width), w.eval(this.height), w.eval(this.length), w.eval(this.Nu), w.eval(this.Nv));
        var b = this.color.getColor(),
            d = this.backcolor.getColor(),
            c = this.edges ? this.edges.getColor() : "";
        H = 0;
        for (P = this.faces.length; H < P; H++) {
            x = [];
            C = 0;
            for (N = this.faces[H].length; C < N; C++) x.push(this.transformVertex(this.vertices[this.faces[H][C]]));
            this.primitives.push(new a.Primitive3D({
                vertices: x,
                type: "face",
                frontColor: b,
                backColor: d,
                edges: c,
                model: this.model
            }, this.space))
        }
    };
    K.prototype.changeGeometry = function(a, b, d, c, h) { return this.oldWidth === a && this.oldHeight === b && this.oldLength === d && this.oldNu === c && this.oldNv === h };
    K.prototype.updateValues = function(a, b, d, c, h) {
        this.oldWidth = a;
        this.oldHeight = b;
        this.oldLength = d;
        this.oldNv = h;
        this.oldNu = c
    };
    a.OtherGeometry3D = K;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.max,
        f = Math.min,
        e = Math.PI,
        r = Math.cos,
        p = Math.sin,
        c = Math.abs,
        k = Math.round,
        l, b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F, D = function(a, b) {
            this.x = void 0 === a ? 0 : a;
            this.y = void 0 === b ? 0 : b
        };
    D.prototype.set = function(a, b) {
        this.x = void 0 === a ? 0 : a;
        this.y = void 0 === b ? 0 : b;
        return this
    };
    D.prototype.copy = function() { return new D(this.x, this.y) };
    D.prototype.ix = function() { return k(g(f(this.x, 32E3), -32E3)) };
    D.prototype.iy = function() { return k(g(f(this.y, 32E3), -32E3)) };
    D.prototype.equals =
        function(a) { return this.x === a.x && this.y === a.y };
    D.prototype.norm2 = function() { return this.x * this.x + this.y * this.y };
    D.prototype.norm = function() { return Math.sqrt(this.norm2()) };
    D.prototype.distance = function(a) {
        b = this.copy();
        b.sub(a);
        return b.norm()
    };
    D.prototype.dot = function(a) { return this.x * a.x + this.y * a.y };
    D.prototype.det = function(a) { return this.x * a.y - this.y * a.x };
    D.prototype.mul = function(a) {
        this.x *= a;
        this.y *= a
    };
    D.prototype.div = function(a) {
        this.x /= a;
        this.y /= a
    };
    D.prototype.add = function(a) {
        this.x += a.x;
        this.y +=
            a.y
    };
    D.prototype.sub = function(a) {
        this.x -= a.x;
        this.y -= a.y
    };
    D.prototype.normalize = function() {
        l = this.norm();
        0 != l && this.div(l)
    };
    D.prototype.rotR90 = function() {
        l = this.x;
        this.x = this.y;
        this.y = -l
    };
    D.prototype.rotL90 = function() {
        l = this.x;
        this.x = -this.y;
        this.y = l
    };
    D.prototype.rot = function(a) {
        h = this.copy();
        q = r(a);
        u = p(a);
        this.x = h.x * q - h.y * u;
        this.y = h.x * u + h.y * q
    };
    D.prototype.rot2 = function(a) { this.rot(a * e / 180) };
    D.prototype.intersection = function(a, b, h, e) {
        A = b.x - a.x;
        n = h.x - e.x;
        m = h.x - a.x;
        w = b.y - a.y;
        x = h.y - e.y;
        y = h.y - a.y;
        F = A *
            x - n * w;
        return 1E-6 < c(F) ? (d = (m * x - y * n) / F, v = (-m * w + y * A) / F, 0 <= d && 1 >= d && 0 <= v && 1 >= v ? new D(a.x + A * d, a.y + w * d) : null) : (b.x - h.x) * y != (b.y - h.y) * m ? null : a.x != b.x ? (z = f(a.x, b.x), G = g(a.x, b.x), z <= h.x && h.x <= G ? h : z <= e.x && e.x <= G ? e : null) : h.x != e.x ? (J = f(h.x, e.x), E = g(h.x, e.x), J <= a.x && a.x <= E ? a : J <= b.x && b.x <= E ? b : null) : a.y != b.y ? (z = f(a.y, b.y), G = g(a.y, b.y), z <= h.y && h.y <= G ? h : z <= e.y && e.y <= G ? e : null) : h.y != e.y ? (J = f(h.y, e.y), E = g(h.y, e.y), J <= a.y && a.y <= E ? a : J <= b.y && b.y <= E ? b : null) : a.x == h.x && a.y == h.y ? a : null
    };
    a.R2 = D;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h = function(d, h) {
        this.evaluator = d;
        this.constraint = h;
        if ("==" == this.constraint.value || "<" == this.constraint.value || "<=" == this.constraint.value || ">" == this.constraint.value || ">=" == this.constraint.value) this.sign = "<" == this.constraint.value || "<=" == this.constraint.value ? "menor" : ">" == this.constraint.value || ">=" == this.constraint.value ? "mayor" : "igual", this.constraint = this.constraint.equalToMinus(), this.constraint = this.constraint.childs[0];
        c =
            new a.R2(0, 0);
        p = new a.R2(0, 0);
        b = new a.R2(0, 0)
    };
    h.prototype.getUnitNormal = function() { this.normal.normalize(); return b.set(this.normal.x, this.normal.y) };
    h.prototype.gradient = function(a) {
        g = this.evaluator;
        c.x = 0;
        c.y = 0;
        k = g.getVariable("x");
        l = g.getVariable("y");
        g.setVariable("x", a.x);
        g.setVariable("y", a.y);
        this.f0 = g.eval(this.constraint);
        g.setVariable("x", g.getVariable("x") + 1E-6);
        f = g.eval(this.constraint);
        c.x = (f - this.f0) / 1E-6;
        c.x = isNaN(c.x) ? Infinity : c.x;
        g.setVariable("x", g.getVariable("x") - 1E-6);
        g.setVariable("y",
            g.getVariable("y") + 1E-6);
        f = g.eval(this.constraint);
        c.y = (f - this.f0) / 1E-6;
        c.y = isNaN(c.y) ? Infinity : c.y;
        g.setVariable("x", k);
        g.setVariable("y", l);
        return c
    };
    h.prototype.findZero = function(a, b, c) {
        g = this.evaluator;
        p.x = a.x;
        p.y = a.y;
        k = g.getVariable("x");
        l = g.getVariable("y");
        g.setVariable("x", a.x);
        g.setVariable("y", a.y);
        this.f0 = g.eval(this.constraint);
        if ("menor" === this.sign && 0 >= this.f0 || "mayor" === this.sign && 0 <= this.f0) return p;
        g.setVariable("x", k);
        g.setVariable("y", l);
        for (var d = 0; 16 > d; d++)
            if (e = p.x, r = p.y, this.normal =
                this.gradient(p), 0 != this.normal.norm2() && this.normal.mul(-this.f0 / this.normal.norm2()), p.x = e + this.normal.x, p.y = r + this.normal.y, this.normal.norm() < b) return 0 === this.normal.x && 0 === this.normal.y && (this.normal.x = p.x - a.x, this.normal.y = p.y - a.y), p;
        return c ? p : null
    };
    a.R2Newton = h;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function(a, e) {
        this.x = a;
        this.y = e
    };
    g.prototype.vectorLength = function() { return Math.sqrt(this.x * this.x + this.y * this.y) };
    g.prototype.dotProduct = function(a) { return this.x * a.x + this.y * a.y };
    g.prototype.angleBetweenVectors = function(a) { return Math.acos(this.dotProduct(a) / (this.vectorLength() * a.vectorLength())) };
    g.AXIS_X = new g(1, 0);
    g.AXIS_Y = new g(0, 1);
    a.Vector2D = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f = Math.round,
        e, r, p, c, k, l, b, h, d, v, q, u, A, n = function(b, d) {
            this.parent = b;
            this.evaluator = b.evaluator;
            var c = this.parser = b.evaluator.parser;
            this.id = "GraphicControl" !== d.type ? "C" : "G";
            this.gui = this.type = "";
            this.region = "south";
            this.y = this.x = 0;
            this.w = "Video" !== d.type ? 100 : 350;
            this.h = "Video" !== d.type ? 23 : 120;
            "GraphicControl" !== d.type && "Audio" !== d.type && "Video" !== d.type ? "TextArea" !== d.type ? this.expresion = c.parse("(0,0,100,23)") : (this.expresion = c.parse("(0,0,300,200)"),
                this.w = 300, this.h = 200) : this.expresion = c.parse("(0,0)");
            this.visible = this.fixed = !0;
            this.color = new a.Color("222222");
            this.colorInt = new a.Color("GraphicControl" !== d.type ? "f0f8ff" : "cc0022");
            this.font_size = c.parse("0");
            this.cID = this.msg_pos = this.Explanation = this.tooltip = this.parameter = this.action = this.underlined = this.italics = this.bold = "";
            this.parameterFont = this.tooltipFont = this.ExplanationFont = "Monospace 12px";
            this.drawif = c.parse("1");
            this.activeif = c.parse("1");
            this.valueExpr = c.parse("0");
            this.decimals =
                c.parse("2");
            this.min = c.parse("-Infinity");
            this.max = c.parse("Infinity");
            this.incr = c.parse("0.1");
            this.exponentialif = this.discrete = !1;
            this.zIndex = -1;
            Object.assign(this, d);
            "Video" !== this.type && "Audio" !== this.type || "interior" === this.region || (this.region = "interior");
            void 0 == this.name && (this.name = 2 == this.parent.version ? this.id : "_nada_");
            this.name = "_._" == this.name || "_nada_" == this.name || "_void_" == this.name ? "" : this.name;
            d = this.evaluator.eval(this.expresion);
            this.x = f(d[0][0]);
            this.y = f(d[0][1]);
            4 == d[0].length &&
                (this.w = f(d[0][2]), this.h = f(d[0][3]));
            this.actionExec = b.lessonParser.parseAction(this)
        };
    n.prototype.init = function() {};
    n.prototype.update = function() {};
    n.prototype.draw = function() {};
    n.prototype.getContainer = function() {
        var a = this.parent.spaces;
        if ("interior" === this.region)
            for (var b = 0, d = a.length; b < d; b++) { var c = a[b]; if (c.id === this.spaceID) return c.addCtr(this), this.zIndex = c.zIndex, this.space = c, c.numericalControlContainer } else {
                if ("external" === this.region) return this.parent.externalSpace.addCtr(this), this.parent.externalSpace.container;
                if ("scenario" === this.region) return this.cID ? (this.expresion = this.evaluator.parser.parse("(0,-1000," + this.w + "," + this.h + ")"), this.parent.stage.stageSpace.addCtr(this), this.zIndex = this.parent.stage.stageSpace.zIndex, this.parent.stage.stageSpace.numericalControlContainer) : this.parent.externalSpace.container;
                if (/north|south|east|west/.test(this.region)) return this.parent[this.region + "Space"].controls.push(this), this.parent[this.region + "Space"].container
            }
        a[0].addCtr(this);
        this.zIndex = a[0].zIndex;
        return a[0].numericalControlContainer
    };
    n.prototype.addControlContainer = function(a) {
        var b = this.getContainer();
        b.childNodes[0] ? b.insertBefore(a, b.childNodes[0]) : b.appendChild(a)
    };
    n.prototype.updatePositionAndSize = function() {
        p = c = k = l = !1;
        b = this.evaluator.eval(this.expresion);
        h = f(b[0][0]);
        p = f(this.x) !== h;
        this.x = h;
        h = f(b[0][1]);
        c = f(this.y) !== h;
        this.y = h;
        4 === b[0].length && (h = f(b[0][2]), k = f(this.w) !== h, this.w = h, h = f(b[0][3]), l = f(this.h) !== h, this.h = h);
        if (k || l || p || c) this.init(!0, !0), this.draw()
    };
    n.prototype.formatOutputValue = function(a) {
        A = this.parent;
        d = a + "";
        v = this.evaluator.eval(this.decimals);
        q = d.indexOf("."); - 1 != q && (u = d.substring(q + 1), u.length > v && (d = parseFloat(d).toFixed(v)));
        this.fixed && (2 !== A.version || 2 === A.version && !this.exponentialif) && (d = parseFloat(a).toFixed(v));
        this.exponentialif && 0 != parseFloat(d) && (d = this.fixed && 2 !== A.version ? parseFloat(d).toExponential(v) : parseFloat(d).toExponential(), d = d.toUpperCase().replace("+", ""));
        return d.replace(".", A.decimal_symbol)
    };
    n.prototype.updateAndExecAction = function() {
        this.parent.updateControls();
        "init" ===
        this.action && (this.click = !1);
        this.actionExec.execute();
        this.parent.updateControls();
        "animate" !== this.action && this.parent.update();
        this.parent.updateControls()
    };
    n.prototype.createGradient = function(a, b) {
        this.linearGradient = this.ctx.createLinearGradient(0, 0, 0, b);
        e = b * b;
        for (a = 0; a < b; a++) r = g(a - 35 * b / 100), this.linearGradient.addColorStop(a / b, "rgba(0,0,0," + r * r * 192 / e / 255 + ")")
    };
    a.Control = n;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f = Math.abs,
        e = /[\w\.\-//]*(\.gif)/gi,
        r, p, c, k, l, b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F, D, B, L, I, M, O, H, P, C, N, K = function(b, d) {
            var c = a.Control.call(this, b, d) || this;
            c.imageSrc = d.imageSrc || "";
            c.image = d.image || new Image;
            c.imageOver = d.imageOver || new Image;
            c.imageDown = d.imageDown || new Image;
            c.flat = d.flat || !1;
            c.borderColor = d.borderColor || !1;
            c.text_align = d.text_align || "center_center";
            c.image_align = d.image_align || "center_center";
            c.font_family = a.getFontName(d.font_family ||
                "arial");
            c.ratio = b.ratio; - 1 === c.font_size && (c.fontSizeNotSet = !0);
            c.borderColor && (c.borderColor = new a.Color(c.borderColor));
            c.text_align = c.text_align.split("_");
            c.image_align = c.image_align.split("_");
            c.old_name = c.name;
            c.name.match(/^\[.*\]?/) ? c.name = c.parser.parse(c.name.substring(1, c.name.length - 1)) : c.name = c.parser.parse("'" + c.name + "'");
            c.classContainer = c.cssClass ? " " + c.cssClass + " " : "";
            c.extra_style = c.imageSrc.trim().match("^_STYLE_") ? c.imageSrc.trim().substring(8) : c.extra_style || "";
            c.imageSrc.trim().match("^_STYLE_") &&
                (c.imageSrc = "vacio.gif");
            if (c.extra_style) {
                c.customStyle = !0;
                c.btnStyle = [];
                c.conStyle = [];
                c.conStyle.textBorder = 3;
                b = c.extra_style.split("|");
                for (var h, m = 0, e = b.length; m < e; m++) d = b[m], h = d.match(/rgb/g), d.match("class=") ? c.classContainer = " " + d.substring(6) : d.match("border=") ? (c.btnStyle.push({ type: "border-style", value: "solid" }), c.btnStyle.push({ type: "border-width", value: d.substring(7).trim() + "px" })) : d.match("borderRadius=") ? (c.btnStyle.push({ type: "border-radius", value: d.substring(13).trim() + "px" }), c.conStyle.push({
                        type: "border-radius",
                        value: d.substring(13).trim() + "px"
                    })) : d.match("borderColor=") ? c.btnStyle.push({ type: "border-color", value: (h ? "" : "#") + d.substring(12).trim() }) : d.match("overColor=") ? c.conStyle.overColor = (h ? "" : "#") + d.substring(10).trim() : d.match("downColor=") ? c.conStyle.downColor = (h ? "" : "#") + d.substring(10).trim() : d.match("font=") ? c.conStyle.font = d.substring(5).trim().toLowerCase() : d.match("inactiveColor=") ? c.conStyle.inactiveColor = (h ? "" : "#") + d.substring(14).trim() : d.match("inactiveColorBorder=") ? c.conStyle.inactiveColorBorder =
                    (h ? "" : "#") + d.substring(20).trim() : d.match("shadowTextBlur=") ? c.conStyle.shadowTextBlur = parseFloat(d.substring(15).trim()) : d.match("shadowTextOffsetX=") ? c.conStyle.shadowTextOffsetX = parseFloat(d.substring(18).trim()) : d.match("shadowTextOffsetY=") ? c.conStyle.shadowTextOffsetY = parseFloat(d.substring(18).trim()) : d.match("shadowTextColor=") ? c.conStyle.shadowTextColor = (h ? "" : "#") + d.substring(16).trim() : d.match("shadowBoxBlur=") ? c.conStyle.shadowBoxBlur = parseFloat(d.substring(14).trim()) : d.match("shadowBoxOffsetX=") ?
                    c.conStyle.shadowBoxOffsetX = parseFloat(d.substring(17).trim()) : d.match("shadowBoxOffsetY=") ? c.conStyle.shadowBoxOffsetY = parseFloat(d.substring(17).trim()) : d.match("shadowBoxColor=") ? c.conStyle.shadowBoxColor = (h ? "" : "#") + d.substring(15).trim() : d.match("shadowInsetBoxBlur=") ? c.conStyle.shadowInsetBoxBlur = parseFloat(d.substring(19).trim()) : d.match("shadowInsetBoxOffsetX=") ? c.conStyle.shadowInsetBoxOffsetX = parseFloat(d.substring(22).trim()) : d.match("shadowInsetBoxOffsetY=") ? c.conStyle.shadowInsetBoxOffsetY =
                    parseFloat(d.substring(22).trim()) : d.match("shadowInsetBoxColor=") ? c.conStyle.shadowInsetBoxColor = (h ? "" : "#") + d.substring(20).trim() : d.match("textBorder=") ? c.conStyle.textBorder = parseFloat(d.substring(11).trim()) : d.match("flat=") && (c.flat = 1 == parseInt(d.substring(5).trim()))
            }
            c.imageSrc.match("_COLORES_") && (b = c.imageSrc.split("_"), c.colorInt = new a.Color(b[2]), c.color = new a.Color(b[3]), c.font_size = c.parser.parse(b[5]), c.imageSrc = "");
            c.imageSrc.match(/^\[.*\]?/) ? c.imageSrc = c.parser.parse(c.imageSrc.substring(1,
                c.imageSrc.length - 1)) : c.imageSrc = c.parser.parse("'" + c.imageSrc + "'");
            b = c.evaluator.eval(c.imageSrc).toString().trim();
            if ("" != b)
                if (d = b.substr(0, b.lastIndexOf(".")), h = b.substr(b.lastIndexOf(".")), b.match(/vacio.gif$/i)) c.imageSrc = c.parser.parse("'vacio.gif'"), c.image.ready = 1, 3 === c.parent.version && (c.name = c.parser.parse("")), c.emptyImage = { ready: !0 }, c.parser.parse("'vacio.gif'");
                else if (c.image = c.parent.getImage(b), d) try {
                c.imageOver = c.parent.getImage(d + "_over" + h), c.imageDown = c.parent.getImage(d + "_down" +
                    h)
            } catch (S) {}
            c.container = a.newHTML("div", { class: "DescartesButtonContainer" + c.classContainer, id: c.id, style: "width:" + c.w + "px;height:" + c.h + "px;left:" + c.x + "px;top:" + c.y + "px;z-index:" + c.zIndex + ";" });
            c.btn = a.newHTML("canvas", { width: c.w * c.ratio, height: c.h * c.ratio, style: "position:absolute;left:0;top:0;width:" + c.w + "px;height:" + c.h + "px;" });
            c.ctx = c.btn.getContext("2d");
            c.ctx.imageSmoothingEnabled = !1;
            c.tooltip && (c.btn.title = c.tooltip);
            c.container.appendChild(c.btn);
            c.addControlContainer(c.container);
            c.addEvents();
            c.init();
            return c
        };
    $jscomp.inherits(K, a.Control);
    K.prototype.init = function(b) {
        r = this.evaluator;
        y = this.container;
        p = this.btn;
        c = this.ctx;
        k = r.eval(this.expresion);
        this.x = k[0][0];
        this.y = k[0][1];
        4 == k[0].length && (this.w = parseInt(k[0][2]), this.h = parseInt(k[0][3]));
        p.width = this.w * this.ratio;
        p.height = this.h * this.ratio;
        p.setAttribute("style", "position:absolute;left:0;top:0;width:" + this.w + "px;height:" + this.h + "px;box-sizing:border-box;");
        y.setAttribute("style", "width:" + this.w + "px;height:" + this.h + "px;left:" + this.x +
            "px;top:" + this.y + "px;z-index:" + this.zIndex + ";display:block;");
        if (this.btnStyle)
            for (var d = 0, h = this.btnStyle.length; d < h; d++) p.style[this.btnStyle[d].type] = this.btnStyle[d].value;
        if (this.conStyle) {
            d = 0;
            for (h = this.conStyle.length; d < h; d++) y.style[this.conStyle[d].type] = this.conStyle[d].value;
            if (this.conStyle.shadowBoxColor) {
                d = this.conStyle.shadowBoxOffsetX || 0;
                h = this.conStyle.shadowBoxOffsetY || 2;
                var m = this.conStyle.shadowBoxBlur || 2;
                y.style.boxShadow = d + "px " + h + "px " + m + "px 1px " + this.conStyle.shadowBoxColor
            }
            this.conStyle.shadowInsetBoxColor &&
                (d = this.conStyle.shadowInsetBoxOffsetX || 0, h = this.conStyle.shadowInsetBoxOffsetY || -2, m = this.conStyle.shadowInsetBoxBlur || 1, p.style.boxShadow = d + "px " + h + "px " + m + "px 1px " + this.conStyle.shadowInsetBoxColor + " inset")
        }
        this.fontSizeNotSet && (this.font_size = r.parser.parse(a.getFieldFontSize(this.h) + ""));
        this.fs_evaluated = r.eval(this.font_size);
        this.createGradient(this.w, this.h);
        y.style.display = 0 < r.eval(this.drawif) ? "block" : "none";
        c.lineJoin = "round";
        c.font = this.italics + " " + this.bold + " " + this.fs_evaluated + "px " +
            this.font_family;
        this.text_object = new a.TextObject({
            parent: { decimal_symbol: this.parent.decimal_symbol },
            evaluator: this.evaluator,
            decimals: this.decimals,
            fixed: !1,
            align: "left",
            anchor: "center_center",
            width: this.parser.parse("0"),
            font_size: this.font_size,
            font_family: this.font_family,
            italics: this.italics,
            bold: this.bold,
            border: this.borderColor,
            border_size: this.conStyle ? this.conStyle.textBorder : void 0,
            shadowBlur: this.conStyle && this.conStyle.shadowTextColor ? this.conStyle.shadowTextBlur || 1 : void 0,
            shadowOffsetX: this.conStyle &&
                this.conStyle.shadowTextColor ? this.conStyle.shadowTextOffsetX || 0 : void 0,
            shadowOffsetY: this.conStyle && this.conStyle.shadowTextColor ? this.conStyle.shadowTextOffsetY || 2 : void 0,
            shadowColor: this.conStyle && this.conStyle.shadowTextColor ? this.conStyle.shadowTextColor : void 0
        }, this.old_name);
        this.draw(b)
    };
    K.prototype.update = function() {
        r = this.evaluator;
        y = this.container;
        p = this.btn;
        this.activeIfValue = 0 < r.eval(this.activeif);
        this.drawIfValue = 0 < r.eval(this.drawif);
        (this.space ? this.space.drawIfValue : 1) && this.drawIfValue ?
            (y.style.display = "block", this.draw(), y.style.cursor = p.style.cursor = this.activeIfValue ? "pointer" : "not-allowed", y.setAttribute("active", this.activeIfValue), this.updatePositionAndSize()) : (y.style.display = "none", this.buttonClick = !1)
    };
    K.prototype.draw = function(f) {
        y = this.container;
        r = this.evaluator;
        p = this.btn;
        c = this.ctx;
        b = r.eval(this.name);
        this.text_object.draw(a.ctx, "#000000", 0, 0);
        b = this.text_object.textNodes.toStr();
        h = this.evaluator.eval(this.imageSrc).toString().trim();
        if (!f && (z = this.over === this.oldOver,
                G = this.buttonClick === this.oldButtonClick, J = this.activeIfValue === this.oldActiveIfValue, E = this.drawIfValue === this.oldDrawIfValue, F = b === this.oldName, D = h === this.oldImageSrc, B = this.colorInt.getColor() === this.oldBackColor, L = this.color.getColor() === this.oldTextColor, I = this.image.ready === this.oldImageReady, this.oldOver = this.over, this.oldButtonClick = this.buttonClick, this.oldActiveIfValue = this.activeIfValue, this.oldDrawIfValue = this.drawIfValue, this.oldName = b, this.oldImageSrc = h, this.oldBackColor = this.colorInt.getColor(),
                this.oldTextColor = this.color.getColor(), this.oldImageReady = this.image.ready, z && G && J && E && F && D && B && L && I)) return;
        c.save();
        c.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        l = this.fs_evaluated;
        y.setAttribute("data-name", b);
        h ? (d = "vacio.gif" === h ? this.emptyImage : this.parent.getImage(h), M = h.substr(0, h.lastIndexOf(".")), O = h.substr(h.lastIndexOf(".")), H = M + "_over" + O, P = M + "_down" + O, C = "vacio.gif" === h ? this.emptyImage : this.parent.getImage(H), N = "vacio.gif" === h ? this.emptyImage : this.parent.getImage(P)) : N = C = d = this.emptyImage;
        c.clearRect(0, 0, this.w, this.h);
        v = q = 0;
        this.buttonClick && (v = q = 1);
        this.text_object.draw(c, this.color.getColor(), 0, 0, !0);
        u = this.text_object.textNodes.metrics.w;
        A = this.text_object.textNodes.metrics.h;
        "center" == this.text_align[1] ? w = g(this.w / 2 + v) - .5 : "left" == this.text_align[1] ? w = u / 2 + 5 + v : "right" == this.text_align[1] && (w = this.w - u / 2 + v - 5);
        "center" == this.text_align[0] ? x = g(this.h / 2 + q) - .5 : "top" == this.text_align[0] ? x = A / 2 + q + 4 : "bottom" == this.text_align[0] && (x = this.h - A / 2 + q - 3);
        d && ("center" == this.image_align[1] ? n = parseInt((this.w -
            d.width) / 2) + v : "left" == this.image_align[1] ? n = v : "right" == this.image_align[1] && (n = this.w - d.width + v), "center" == this.image_align[0] ? m = parseInt((this.h - d.height) / 2) + q : "top" == this.image_align[0] ? m = q : "bottom" == this.image_align[0] && (m = this.h - d.height + q));
        if (d && d.ready)
            if (d !== this.emptyImage && d.complete)
                if (h.match(e)) this.btn.style.backgroundRepeat = "no-repeat", this.btn.style.backgroundImage = "url('" + h + "')", this.btn.style.backgroundPosition = n + "px " + m + "px";
                else {
                    if ("center" != this.image_align[0] || "center" != this.image_align[1]) y.style.backgroundColor =
                        this.colorInt.getColor();
                    c.drawImage(d, n, m)
                }
        else this.emptyImage && this.customStyle && (y.style.backgroundColor = this.colorInt.getColor());
        else y.style.backgroundColor = this.colorInt.getColor(), this.flat || (this.buttonClick || (a.drawLine(c, this.w - 1, 0, this.w - 1, this.h, "rgba(0,0,0,0.5)"), a.drawLine(c, 0, 0, 0, this.h, "rgba(0,0,0,0.09)"), a.drawLine(c, 1, 0, 1, this.h, "rgba(0,0,0,0.03)")), c.fillStyle = this.linearGradient, c.fillRect(0, 0, this.w, this.h));
        this.activeIfValue && (C !== this.emptyImage && this.over && C.ready && C.complete ?
            H.match(e) ? (this.btn.style.backgroundImage = "url('" + H + "')", this.btn.style.backgroundPosition = n + "px " + m + "px") : c.drawImage(C, n, m) : this.customStyle && this.conStyle.overColor && this.over && (y.style.backgroundColor = this.conStyle.overColor));
        this.activeIfValue ? N !== this.emptyImage && this.buttonClick && N.ready && N.complete ? P.match(e) ? (this.btn.style.backgroundImage = "url('" + P + "')", this.btn.style.backgroundPosition = n + "px " + m + "px") : c.drawImage(N, n, m) : this.customStyle && this.conStyle.downColor && this.buttonClick && (y.style.backgroundColor =
            this.conStyle.downColor) : this.buttonClick && !d && (c.fillStyle = "rgba(0,0,0,0.09)", c.fillRect(0, 0, this.w, this.h));
        c.fillStyle = this.color.getColor();
        this.customStyle && this.conStyle.shadowTextColor && 0 < this.conStyle.textBorder && (c.lineWidth = this.conStyle.textBorder, c.strokeStyle = this.conStyle.shadowTextColor);
        this.borderColor && (c.lineWidth = parseInt(l / 6), c.strokeStyle = this.borderColor.getColor());
        this.text_object.draw(c, this.color.getColor(), w, x);
        this.underlined && (c.strokeStyle = this.color.getColor(), c.lineWidth =
            g(l / 10) || 2, c.lineCap = "round", c.beginPath(), c.moveTo(w - u / 2 + v, x + g(l / 2) + g(l / 5) - 1.5), c.lineTo(w + u / 2 + v, x + g(l / 2) + g(l / 5) - 1.5), c.stroke());
        this.activeIfValue || (this.customStyle && this.conStyle.inactiveColor ? y.style.backgroundColor = this.conStyle.inactiveColor : (c.fillStyle = "rgba(240,240,240,0.6)", c.fillRect(0, 0, this.w, this.h)));
        c.restore();
        this._image_pos_x = n;
        this._image_pos_y = m
    };
    K.prototype.drawTextBorder = function() {
        this.colorInt.getColor();
        this.color.getColor();
        return !(.5 > (f(this.colorInt.r - this.color.r) +
            f(this.colorInt.g - this.color.g) + f(this.colorInt.b - this.color.b)) / 255)
    };
    K.prototype.buttonPressed = function() { this.updateAndExecAction() };
    K.prototype.addEvents = function() {
        function b(d, c, e) {
            a.clearTimeout(m);
            h.buttonClick && h.drawIfValue && h.activeIfValue && (c.call(h), d = e ? d : 100, m = a.setTimeout(function() { b(d, c, !1) }, d))
        }

        function d(d) {
            this.focus();
            d.preventDefault();
            d.stopPropagation();
            document.activeElement != document.body && document.activeElement.blur();
            h.whichBtn = a.whichBtn(d);
            "L" == h.whichBtn && h.activeIfValue &&
                (h.buttonClick = !0, h.draw(), "calculate" == h.action && (h.evaluator.setVariable(h.id, h.evaluator.eval(h.valueExpr)), b(1E3, h.buttonPressed, !0)), h.btn.removeEventListener("touchend", c), h.btn.addEventListener("touchend", c), h.btn.removeEventListener("mouseup", c), h.btn.addEventListener("mouseup", c))
        }

        function c(b) {
            a.newBlobContent = null;
            this.focus();
            b.preventDefault();
            b.stopPropagation();
            if (h.activeIfValue || h.buttonClick) h.buttonClick = !1, h.draw(), "calculate" != h.action && (h.evaluator.setVariable(h.id, h.evaluator.eval(h.valueExpr)),
                h.buttonPressed()), h.btn.removeEventListener("touchend", c), h.btn.removeEventListener("mouseup", c);
            h.parent.update()
        }
        var h = this,
            m;
        h.btn.oncontextmenu = function() { return !1 };
        this.over = this.buttonClick = !1;
        this.btn.addEventListener("touchstart", d);
        this.btn.addEventListener("mousedown", d);
        this.btn.addEventListener("mouseover", function(a) {
            a.preventDefault();
            a.stopPropagation();
            h.over = !0;
            h.draw()
        });
        this.btn.addEventListener("mouseout", function(b) {
            a.newBlobContent = null;
            b.preventDefault();
            b.stopPropagation();
            h.over = !1;
            h.buttonClick = !1;
            h.draw()
        });
        document.addEventListener("visibilitychange", function(b) {
            a.newBlobContent = null;
            h.buttonClick = !1
        })
    };
    a.Button = K;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h, d, v, q, u = function(b, c) {
        c = a.Control.call(this, b, c) || this;
        c.flat = c.image_dec_src && c.image_inc_src;
        c.btn_pos = c.btn_pos || "v_left";
        c.horizontal = "h_left" === c.btn_pos || "h_right" === c.btn_pos || "h_left_right" === c.btn_pos;
        c.label_color = c.label_color || new a.Color("e0e4e8", b.evaluator);
        c.label_text_color = c.label_text_color || new a.Color("000000", b.evaluator);
        c.tabindex = ++c.parent.tabindex;
        c.name_str = c.name;
        c.name.match(/^\[.*\]?/) ? c.name = c.parser.parse(c.name.substring(1,
            c.name.length - 1)) : c.name = c.parser.parse("'" + c.name + "'");
        c.container = a.newHTML("div", { class: "DescartesSpinnerContainer", id: c.id });
        c.divUp = a.newHTML("div", { class: "DJS_Up" });
        c.divDown = a.newHTML("div", { class: "DJS_Down" });
        c.field = a.newHTML("input", { type: "text", id: c.id + "_spinner", class: "DescartesSpinnerField", tabindex: c.tabindex });
        c.label = a.newHTML("canvas", { class: "DescartesSpinnerLabel" });
        c.label_ctx = c.label.getContext("2d");
        c.ratio = b.ratio;
        c.container.appendChild(c.label);
        c.container.appendChild(c.field);
        c.container.appendChild(c.divUp);
        c.container.appendChild(c.divDown);
        c.addControlContainer(c.container);
        d = c.evaluator.parser.parse("1");
        c.originalIncr = c.incr;
        if (0 > c.evaluator.eval(c.decimals) || 0 === c.evaluator.eval(c.incr)) b = c.evaluator.eval(c.incr), 0 < b ? (c.incr = c.evaluator.parser.parse(parseInt(b).toString()), c.originalIncr = c.incr) : c.incr = d;
        c.image_dec_src && (c.image_dec_src.match(/^\[.*\]?/) ? c.image_dec_src = c.parser.parse(c.image_dec_src.substring(1, c.image_dec_src.length - 1)) : c.image_dec_src = c.parser.parse("'" +
            c.image_dec_src + "'"), c.old_image_dec_src = c.evaluator.eval(c.image_dec_src).toString().trim(), c.image_dec = c.parent.getImage(c.old_image_dec_src));
        c.image_inc_src && (c.image_inc_src.match(/^\[.*\]?/) ? c.image_inc_src = c.parser.parse(c.image_inc_src.substring(1, c.image_inc_src.length - 1)) : c.image_inc_src = c.parser.parse("'" + c.image_inc_src + "'"), c.old_image_inc_src = c.evaluator.eval(c.image_inc_src).toString().trim(), c.image_inc = c.parent.getImage(c.old_image_inc_src));
        c.addEvents();
        c.init();
        return c
    };
    $jscomp.inherits(u,
        a.Control);
    u.prototype.init = function(b, d) {
        g = this.evaluator;
        this.label.innerHTML = g.eval(this.name).toString();
        var c = this.label.textContent;
        d || (this.value = this.validateValue(g.eval(this.valueExpr)));
        d = this.formatOutputValue(this.value);
        this.fieldFontSize = 0 < g.eval(this.font_size) ? g.eval(this.font_size) : a.getFieldFontSize(this.h);
        this.text_object = new a.TextObject({
            parent: { decimal_symbol: this.parent.decimal_symbol },
            evaluator: this.evaluator,
            decimals: this.decimals,
            fixed: !1,
            align: "left",
            anchor: "center_center",
            width: this.parser.parse("0"),
            font_size: this.parser.parse("" + this.fieldFontSize),
            font_family: this.font_family,
            italics: this.italics,
            bold: this.bold
        }, this.name_str);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0, !0);
        var h = 2 !== this.parent.version ? "__" : "_____",
            e = a.getTextWidth(d + "_", this.fieldFontSize + "px " + a.sansserif_font);
        if (this.horizontal) {
            b = parseInt(this.h);
            var f = parseInt(this.w / 2 - b);
            h = this.text_object.textNodes.metrics.w + parseInt(this.fieldFontSize);
            this.visible || (f = this.w -
                2 * b, e = 0);
            f < h && (f = h);
            "" == c && (f = 0);
            this.w - f - b < e && (f = this.w - b - e);
            0 > f && (f = 0);
            c = this.w - (f + 2 * b);
            this.container.setAttribute("style", "width:" + this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" + this.y + "px;z-index:" + this.zIndex + ";background-color:transparent;");
            this.divUp.setAttribute("style", "width:" + b + "px;height:" + b + "px;" + ("h_left" === this.btn_pos ? "left:" + (f + b) : "right:0") + "px;top:0;" + (this.flat ? "border-width:0;" : ""));
            this.divDown.setAttribute("style", "width:" + b + "px;height:" + b + "px;left:" + (f + ("h_right" ===
                this.btn_pos ? c : 0)) + "px;top:0;" + (this.flat ? "border-width:0;" : ""));
            this.field.setAttribute("style", "font-family:" + a.sansserif_font + ";font-size:" + this.fieldFontSize + "px;width:" + c + "px;height:" + this.h + "px;left:" + (b + f + ("h_left" === this.btn_pos ? b : "h_right" === this.btn_pos ? -b : 0)) + "px;text-align:center;")
        } else b = 2 + parseInt(this.h / 2), f = parseInt(this.w / 2 - b / 2), h = a.getTextWidth(c + h, this.fieldFontSize + "px " + a.sansserif_font), this.visible || (f = this.w - b, e = 0), f < h && (f = h), "" == c && (f = 0), this.w - f - b < e && (f = this.w - b - e), 0 > f &&
            (f = 0), c = this.w - (f + b), this.container.setAttribute("style", "width:" + this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" + this.y + "px;z-index:" + this.zIndex + ";background-color:transparent;"), h = "width:" + b + "px;left:" + (f + ("v_right" === this.btn_pos ? c : 0)) + "px;", this.divUp.setAttribute("style", h + ";height:" + (this.h / 2 + 1) + "px;top:0;" + (this.flat ? "border-width:0;" : "")), this.divDown.setAttribute("style", h + ";height:" + (this.h / 2 - 1) + "px;top:" + (this.h / 2 + 1) + "px;" + (this.flat ? "border-width:0;" : "")), this.field.setAttribute("style",
                "font-family:" + a.sansserif_font + ";font-size:" + this.fieldFontSize + "px;width:" + c + "px;height:" + this.h + "px;left:" + (("v_left" === this.btn_pos ? b : 0) + f) + "px;");
        this.field.value = d;
        this.visible || (this.field.style.display = "none");
        this.label.setAttribute("style", "font-size:" + this.fieldFontSize + "px;width:" + f + "px;height:" + this.h + "px;line-height:" + this.h + "px;background-color:" + this.label_color.getColor() + ";color:" + this.label_text_color.getColor() + ";");
        this.label.width = f * this.ratio;
        this.label.height = this.h * this.ratio;
        this.image_dec && this.image_dec.ready && (this.divDown.style["background-image"] = "url(" + this.image_dec.src + ")");
        this.image_inc && this.image_inc.ready && (this.divUp.style["background-image"] = "url(" + this.image_inc.src + ")");
        this.divUp.setAttribute("horizontal", this.horizontal ? !0 : !1);
        this.divDown.setAttribute("horizontal", this.horizontal ? !0 : !1);
        g.setVariable(this.id, this.value)
    };
    u.prototype.update = function() {
        g = this.evaluator;
        0 > g.eval(this.decimals) ? (f = g.eval(this.incr), 0 < f ? this.originalIncr = this.incr = g.parser.parse(parseInt(f).toString()) :
            this.incr = d) : this.incr = 0 !== g.eval(this.originalIncr) ? this.originalIncr : d;
        this.activeIfValue = 0 < g.eval(this.activeif);
        this.drawIfValue = 0 < g.eval(this.drawif);
        this.field.disabled = !this.activeIfValue;
        this.divUp.setAttribute("active", !this.field.disabled);
        this.divDown.setAttribute("active", !this.field.disabled);
        this.drawIfValue ? (this.updateStyle(), this.container.style.display = "block") : (this.click = !1, this.container.style.display = "none");
        this.image_dec && (v = this.evaluator.eval(this.image_dec_src).toString().trim(),
            this.old_image_dec_src !== v && (this.divDown.style["background-image"] = "url(" + this.image_dec.src + ")", this.old_image_dec_src = v));
        this.image_inc && (q = this.evaluator.eval(this.image_inc_src).toString().trim(), this.old_image_inc_src !== q && (this.divUp.style["background-image"] = "url(" + this.image_inc.src + ")", this.image_inc_src = q));
        this.updatePositionAndSize();
        this.parent.animation.playing && document.activeElement == this.field || (e = this.field.value, r = this.value, this.value = this.validateValue(g.getVariable(this.id)),
            this.field.value = this.formatOutputValue(this.value), this.value == r && this.field.value != e && (this.value = this.validateValue(e), this.field.value = this.formatOutputValue(this.value)), g.setVariable(this.id, this.value));
        this.label_ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0);
        this.label_ctx.clearRect(0, 0, this.label.width, this.label.height);
        this.text_object.textNodes.metrics.w > this.label.width / this.ratio ? (this.text_object.anchor = "center_left",
            this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 5, this.label.height / this.ratio / 2)) : (this.text_object.anchor = "center_center", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), this.label.width / this.ratio / 2, this.label.height / this.ratio / 2));
        this.label_ctx.setTransform(1, 0, 0, 1, 0, 0)
    };
    u.prototype.updateStyle = function() {
        this.divUp.style.borderStyle = this.up ? "inset" : "outset";
        this.divUp.style.borderColor = this.up ? "gray" : "#f0f8ff";
        this.divUp.style.backgroundColor = this.up ?
            "#bfbfbf" : "";
        this.divUp.style.backgroundColor = this.flat ? "transparent" : this.divUp.style.backgroundColor;
        this.divUp.style.backgroundPosition = this.up ? "calc(50% + 1px) calc(50% + 1px)" : "center";
        this.divDown.style.borderStyle = this.down ? "inset" : "outset";
        this.divDown.style.borderColor = this.down ? "gray" : "#f0f8ff";
        this.divDown.style.backgroundColor = this.down ? "#bfbfbf" : "";
        this.divDown.style.backgroundColor = this.flat ? "transparent" : this.divDown.style.backgroundColor;
        this.divDown.style.backgroundPosition = this.down ?
            "calc(50% + 1px) calc(50% + 1px)" : "center"
    };
    u.prototype.validateValue = function(a) {
        g = this.evaluator;
        isNaN(parseFloat(a)) || a.toString().match("e") && (a = parseFloat(a).toFixed(20));
        a = void 0 != a ? a.toString() : "0";
        a = a.replace(this.parent.decimal_symbol, ".");
        p = a == parseFloat(a) ? parseFloat(a) : parseFloat(g.eval(g.parser.parse(a)));
        isNaN(p) && (p = 0);
        l = g.eval(this.min);
        b = g.eval(this.max);
        "" === l && (l = -Infinity);
        "" === b && (b = Infinity);
        p = Math.min(Math.max(p, l), b);
        this.discrete && (c = g.eval(this.incr), p = 0 == c ? 0 : c * Math.round(p /
            c));
        k = g.eval(this.decimals);
        0 >= k && (k = 0);
        return p = parseFloat(parseFloat(p).toFixed(k))
    };
    u.prototype.increase = function() { this.changeValue(parseFloat(this.value) + this.evaluator.eval(this.incr)) };
    u.prototype.decrease = function() { this.changeValue(parseFloat(this.value) - this.evaluator.eval(this.incr)) };
    u.prototype.changeValue = function(a) { this.activeIfValue && (this.value = this.validateValue(a), this.field.value = this.formatOutputValue(this.value), this.evaluator.setVariable(this.id, this.value), this.updateAndExecAction()) };
    u.prototype.addEvents = function() {
        function b(c, d, h) { a.clearTimeout(k); if (g.up || g.down) d.call(g), c = h ? c : 10, k = a.setTimeout(function() { b(c, d) }, c) }

        function c(c) {
            c.preventDefault();
            g.whichBtn = a.whichBtn(c);
            "L" == g.whichBtn && g.activeIfValue && (g.up = !0, b(q, g.increase, !0))
        }

        function d(c) {
            c.preventDefault();
            g.whichBtn = a.whichBtn(c);
            "L" == g.whichBtn && g.activeIfValue && (g.down = !0, b(q, g.decrease, !0))
        }

        function e(b) {
            g.up = !1;
            a.clearTimeout(k);
            g.updateStyle()
        }

        function f(b) {
            g.down = !1;
            a.clearTimeout(k);
            g.updateStyle()
        }
        h =
            a.hasTouchSupport;
        var g = this,
            q = h ? 500 : 200,
            k;
        g.divUp.oncontextmenu = g.divDown.oncontextmenu = g.field.oncontextmenu = g.label.oncontextmenu = function() { return !1 };
        this.label.addEventListener("touchstart", a.preventDefault);
        this.label.addEventListener("mousedown", a.preventDefault);
        this.field.addEventListener("keydown", function(a) { 13 == a.keyCode && g.changeValue(g.field.value) });
        this.divUp.addEventListener("touchstart", c);
        this.divUp.addEventListener("mousedown", c);
        this.divDown.addEventListener("touchstart", d);
        this.divDown.addEventListener("mousedown",
            d);
        this.divUp.addEventListener("mouseout", function(b) {
            g.up = !1;
            a.clearTimeout(k);
            b.preventDefault();
            g.updateStyle()
        });
        this.divDown.addEventListener("mouseout", function(b) {
            g.down = !1;
            a.clearTimeout(k);
            b.preventDefault();
            g.updateStyle()
        });
        this.divUp.addEventListener("touchend", e);
        window.addEventListener("touchend", e);
        this.divUp.addEventListener("mouseup", e);
        window.addEventListener("mouseup", e);
        this.divDown.addEventListener("touchend", f);
        window.addEventListener("touchend", f);
        this.divDown.addEventListener("mouseup",
            f);
        window.addEventListener("mouseup", f);
        document.addEventListener("visibilitychange", function(b) {
            g.up = !1;
            g.down = !1;
            a.clearTimeout(k);
            g.updateStyle()
        });
        this.field.addEventListener("blur", function(a) { g.drawIfValue && g.changeValue(g.field.value, !0) });
        g.field.addEventListener("click", function(a) { this.focus() })
    };
    a.Spinner = u;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f = function(e, f) {
        var g = a.Control.call(this, e, f) || this;
        g.label_color = g.label_color || new a.Color("e0e4e8", e.evaluator);
        g.label_text_color = g.label_text_color || new a.Color("000000", e.evaluator);
        g.typeCtr = "checkbox";
        g.pressed = f.pressed || !1;
        g.radio_group = (f.radio_group || "").trim();
        "" !== g.radio_group && (g.typeCtr = "radio");
        g.name_str = g.name;
        g.name.match(/^\[.*\]?/) ? g.name = g.parser.parse(g.name.substring(1, g.name.length - 1)) : g.name = g.parser.parse("'" + g.name.trim() +
            "'");
        g.tabindex = ++g.parent.tabindex;
        g.containerControl = a.newHTML("div", { class: "DescartesCheckboxContainer", id: g.id });
        g.checkbox = a.newHTML("input", { type: g.typeCtr, id: g.id + g.typeCtr, class: "DescartesCheckbox", tabindex: g.tabindex });
        "" !== g.radio_group && g.checkbox.setAttribute("name", g.radio_group);
        g.checkbox.internalID = g.id;
        g.label = a.newHTML("canvas", { class: "DescartesCheckboxLabel" });
        g.label_ctx = g.label.getContext("2d");
        g.ratio = e.ratio;
        g.dummyLabel = a.newHTML("label", { "for": g.id + g.typeCtr });
        g.value = g.evaluator.eval(g.valueExpr);
        g.evaluator.setVariable(g.id, g.value);
        g.containerControl.appendChild(g.label);
        g.containerControl.appendChild(g.checkbox);
        g.containerControl.appendChild(g.dummyLabel);
        g.addControlContainer(g.containerControl);
        g.addEvents();
        g.init();
        return g
    };
    $jscomp.inherits(f, a.Control);
    f.prototype.init = function(e) {
        g = this.evaluator;
        this.label.innerHTML = g.eval(this.name).toString();
        this.labelFontSize = 0 < g.eval(this.font_size) ? g.eval(this.font_size) : a.getFieldFontSize(this.h);
        e = Math.max(this.w - this.h, 0);
        this.text_object =
            new a.TextObject({ parent: { decimal_symbol: this.parent.decimal_symbol }, evaluator: this.evaluator, decimals: this.decimals, fixed: !1, align: "left", anchor: "center_center", width: this.parser.parse("0"), font_size: this.parser.parse("" + this.labelFontSize), font_family: this.font_family, italics: this.italics, bold: this.bold }, this.name_str);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0, !0);
        this.containerControl.setAttribute("style", "width:" + this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" +
            this.y + "px;z-index:" + this.zIndex + ";");
        "right" == this.position ? (this.dummyLabel.setAttribute("style", "position:absolute;width:" + this.h + "px;height:" + this.h + "px;left:" + e + "px;"), this.checkbox.setAttribute("style", "width:" + this.h + "px;height:" + this.h + "px;left:" + e + "px;"), this.label.setAttribute("style", "font-size:" + this.labelFontSize + "px;width:" + e + "px;height:" + this.h + "px;line-height:" + this.h + "px;background-color:" + this.label_color.getColor() + ";color:" + this.label_text_color.getColor() + ";")) : (this.dummyLabel.setAttribute("style",
            "position:absolute;width:" + this.h + "px;height:" + this.h + "px;left:0;"), this.checkbox.setAttribute("style", "width:" + this.h + "px;height:" + this.h + "px;left:0;"), this.label.setAttribute("style", "font-size:" + this.labelFontSize + "px;width:" + e + "px;height:" + this.h + "px;line-height:" + this.h + "px;background-color:" + this.label_color.getColor() + ";color:" + this.label_text_color.getColor() + ";left:" + this.h + "px"));
        this.checkbox.checked = 0 != this.evaluator.getVariable(this.id);
        this.label.width = e * this.ratio;
        this.label.height =
            this.h * this.ratio;
        this.update()
    };
    f.prototype.update = function() {
        g = this.evaluator;
        this.activeIfValue = 0 < g.eval(this.activeif);
        this.drawIfValue = 0 < g.eval(this.drawif);
        this.checkbox.disabled = !this.activeIfValue;
        this.containerControl.style.display = this.drawIfValue ? "block" : "none";
        if (!this.parent.animation.playing || document.activeElement != this.checkbox) {
            var a = 0 !== g.getVariable(this.id) ? 1 : 0;
            if ("" === this.radio_group) this.pressed ? (this.value = this.checkbox.checked ? 1 : 0, this.pressed = !1) : (this.value = a, this.checkbox.checked =
                0 !== this.value), g.setVariable(this.id, this.value);
            else {
                this.value = g.getVariable(this.id);
                g.setVariable(this.radio_group, 0);
                a = document.querySelectorAll("[name=" + this.radio_group + "]");
                var f = -1;
                if (this.pressed) {
                    for (var p = a.length - 1; 0 <= p; p--) g.setVariable(a[p].internalID, 0), a[p].checked = !1;
                    g.setVariable(this.id, 1);
                    this.checkbox.checked = !0;
                    this.value = 1;
                    g.setVariable(this.radio_group, this.id);
                    this.pressed = 0
                } else {
                    for (p = a.length - 1; 0 <= p; p--) f = 0 != g.getVariable(a[p].internalID) ? p : f, g.setVariable(a[p].internalID,
                        0), a[p].checked = !1;
                    0 <= f && (g.setVariable(a[f].internalID, 1), a[f].checked = !0, g.setVariable(this.radio_group, a[f].internalID));
                    this.value = this.checkbox.checked ? 1 : 0
                }
            }
        }
        this.updatePositionAndSize();
        this.label_ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0);
        this.label_ctx.clearRect(0, 0, this.label.width, this.label.height);
        this.text_object.textNodes.metrics.w > this.label.width / this.ratio ? (this.text_object.anchor = "center_left", this.text_object.draw(this.label_ctx,
            this.label_text_color.getColor(), 5, this.label.height / this.ratio / 2)) : (this.text_object.anchor = "center_center", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), this.label.width / this.ratio / 2, this.label.height / this.ratio / 2));
        this.label_ctx.setTransform(1, 0, 0, 1, 0, 0)
    };
    f.prototype.addEvents = function() {
        var e = this;
        e.checkbox.oncontextmenu = e.label.oncontextmenu = e.dummyLabel.oncontextmenu = function() { return !1 };
        e.label.addEventListener("touchstart", a.preventDefault);
        e.label.addEventListener("mousedown",
            a.preventDefault);
        e.dummyLabel.addEventListener("mousedown", a.preventDefault);
        e.checkbox.addEventListener("click", function(a) {
            e.pressed = !0;
            e.updateAndExecAction()
        })
    };
    a.Checkbox = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k = function(c, b) {
        b = a.Control.call(this, c, b) || this;
        b.label_color = b.label_color || new a.Color("e0e4e8", c.evaluator);
        b.label_text_color = b.label_text_color || new a.Color("000000", c.evaluator);
        b.name_str = b.name;
        b.name.match(/^\[.*\]?/) ? b.name = b.parser.parse(b.name.substring(1, b.name.length - 1)) : b.name = b.parser.parse("'" + b.name.trim() + "'");
        void 0 === b.valueExprString && (b.valueExprString = b.onlyText ? "0" : "");
        b.emptyString = !1;
        b.ok = 0;
        b.tabindex = ++b.parent.tabindex;
        b.regExpDecimalSymbol = new RegExp("\\" + b.parent.decimal_symbol, "g");
        if (b.answer)
            if (b.answer.match("krypto_") && (b.answer = (new a.Krypto).decode(b.answer.substring(7))), b.answerPattern = b.answer, b.answer = a.buildRegularExpressionsPatterns(b.answer, b.evaluator), b.onlyText) {
                var h = b.answerPattern.indexOf("|");
                b.firstAnswer = -1 == h ? b.answerPattern : b.answerPattern.substring(0, h)
            } else b.firstAnswer = b.parser.parse(b.answerPattern.substring(1, b.answerPattern.indexOf(",")));
        b.onlyText && (b.valueExprString.match(/^'/) &&
            b.valueExprString.match(/'$/) || (b.valueExpr = b.evaluator.parser.parse("'" + b.valueExprString + "'")), b.validateValue = function(a) { a = a.toString(); return "''" == a || "'" == a ? "" : a && a.match(/^'/) && a.match(/'$/) ? a.substring(1, a.length - 1) : a }, b.formatOutputValue = function(a) { return a.toString() });
        b.containerControl = a.newHTML("div", { class: "DescartesTextFieldContainer", id: b.id });
        b.field = a.newHTML("input", { type: "text", id: b.id + "TextField", class: "DescartesTextFieldField", tabindex: b.tabindex });
        b.label = a.newHTML("canvas", { class: "DescartesTextFieldLabel" });
        b.label_ctx = b.label.getContext("2d");
        b.ratio = c.ratio;
        b.containerControl.appendChild(b.label);
        b.containerControl.appendChild(b.field);
        b.addControlContainer(b.containerControl);
        b.addEvents();
        b.init();
        return b
    };
    $jscomp.inherits(k, a.Control);
    k.prototype.init = function(c) {
        g = this.evaluator;
        this.label.innerHTML = g.eval(this.name).toString();
        var b = this.label.textContent;
        c || (this.value = this.validateValue(g.eval(this.valueExpr)));
        c = this.formatOutputValue(this.value);
        this.fieldFontSize =
            0 < g.eval(this.font_size) ? g.eval(this.font_size) : a.getFieldFontSize(this.h);
        this.text_object = new a.TextObject({ parent: { decimal_symbol: this.parent.decimal_symbol }, evaluator: this.evaluator, decimals: this.decimals, fixed: !1, align: "left", anchor: "center_center", width: this.parser.parse("0"), font_size: this.parser.parse("" + this.fieldFontSize), font_family: this.font_family, italics: this.italics, bold: this.bold }, this.name_str);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0, !0);
        var h = a.getTextWidth(c +
                "_", this.fieldFontSize + "px " + a.sansserif_font),
            d = parseInt(this.w / 2),
            e = this.text_object.textNodes.metrics.w + parseInt(this.fieldFontSize);
        this.visible || (d = this.w, h = 0);
        d < e && (d = e);
        "" == b && (d = 0);
        this.w - d < h && (d = this.w - h);
        0 > d && (d = 0);
        b = this.w - d;
        this.containerControl.setAttribute("style", "width:" + this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" + this.y + "px;z-index:" + this.zIndex + ";");
        this.field.setAttribute("style", "font-size:" + this.fieldFontSize + "px;width:" + b + "px;height:" + this.h + "px;left:" + d + "px;");
        this.field.value =
            c;
        this.label.setAttribute("style", "font-size:" + this.fieldFontSize + "px;width:" + d + "px;height:" + this.h + "px;line-height:" + this.h + "px;background-color:" + this.label_color.getColor() + ";color:" + this.label_text_color.getColor() + ";");
        this.label.width = d * this.ratio;
        this.label.height = this.h * this.ratio;
        this.evaluate && (this.ok = this.evaluateAnswer());
        this.evaluator.setVariable(this.id, this.value);
        this.evaluator.setVariable(this.id + ".ok", this.ok);
        this.oldValue = this.value;
        this.update()
    };
    k.prototype.update = function() {
        g =
            this.evaluator;
        this.activeIfValue = 0 < g.eval(this.activeif);
        this.drawIfValue = 0 < g.eval(this.drawif);
        this.field.disabled = !this.activeIfValue;
        this.containerControl.style.display = this.drawIfValue ? "block" : "none";
        this.parent.animation.playing && document.activeElement == this.field || (f = this.field.value, e = this.value, this.value = this.validateValue(g.getVariable(this.id)), this.field.value = this.formatOutputValue(this.value), this.value === e && this.field.value != f && (this.value = this.validateValue(f), this.field.value = this.formatOutputValue(this.value)),
            g.setVariable(this.id, this.value));
        this.updatePositionAndSize();
        this.label_ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0);
        this.label_ctx.clearRect(0, 0, this.label.width, this.label.height);
        this.text_object.textNodes.metrics.w > this.label.width / this.ratio ? (this.text_object.anchor = "center_left", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 5, this.label.height / this.ratio / 2)) : (this.text_object.anchor = "center_center",
            this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), this.label.width / this.ratio / 2, this.label.height / this.ratio / 2));
        this.label_ctx.setTransform(1, 0, 0, 1, 0, 0)
    };
    k.prototype.validateValue = function(a) {
        if ("" === a || "''" == a) return "";
        g = this.evaluator;
        a = a.toString().replace(this.regExpDecimalSymbol, ".", "g");
        r = a == parseFloat(a) ? parseFloat(a) : parseFloat(g.eval(g.parser.parse(a)));
        isNaN(r) && (r = 0);
        p = g.eval(this.min);
        c = g.eval(this.max);
        "" === p && (p = -Infinity);
        "" === c && (c = Infinity);
        r < p && (r = p);
        r > c && (r =
            c);
        this.discrete && (a = g.eval(this.incr), r = 0 === a ? 0 : a * Math.round(r / a));
        return r = parseFloat(parseFloat(r).toFixed(g.eval(this.decimals)))
    };
    k.prototype.formatOutputValue = function(c) { return "" === c ? "" : a.Control.prototype.formatOutputValue.call(this, c) };
    k.prototype.changeValue = function(a) {
        this.activeIfValue && (this.value = this.validateValue(a), this.field.value = this.formatOutputValue(this.value), this.evaluate && (this.ok = this.evaluateAnswer()), this.evaluator.setVariable(this.id, this.value), this.evaluator.setVariable(this.id +
            ".ok", this.ok), this.updateAndExecAction())
    };
    k.prototype.evaluateAnswer = function() { return a.esCorrecto(this.answer, this.value, this.evaluator, this.answer) };
    k.prototype.getFirstAnswer = function() { return this.answer ? this.onlyText ? this.firstAnswer : this.evaluator.eval(this.firstAnswer) : "" };
    k.prototype.addEvents = function() {
        var c = this;
        c.field.oncontextmenu = c.label.oncontextmenu = function() { return !1 };
        c.label.addEventListener("touchstart", a.preventDefault);
        c.label.addEventListener("mousedown", a.preventDefault);
        this.field.addEventListener("blur", function(a) { c.drawIfValue && c.changeValue(c.field.value, !0) });
        this.field.addEventListener("keydown", function(a) { c.activeIfValue && 13 == a.keyCode && c.changeValue(c.field.value, !0) });
        c.field.addEventListener("click", function(a) { this.focus() })
    };
    a.TextField = k;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.abs,
        f, e, r, p, c, k, l, b, h, d, v = function(b, c) {
            function d(b) {
                m.options = b.split(",");
                m.menuOptions = [];
                m.strValue = [];
                b = 0;
                for (var c = m.options.length; b < c; b++) {
                    var d = m.customSplit(m.options[b]);
                    1 == d.length ? (m.menuOptions.push(d[0]), m.strValue.push(b.toString())) : 2 == d.length && (m.menuOptions.push(d[0]), "" == d[1] ? m.strValue.push(b.toString()) : m.strValue.push(d[1]))
                }
                b = 0;
                for (c = m.menuOptions.length; b < c; b++) m.menuOptions[b].match(/^\[/) && m.menuOptions[b].match(/\]$/) ?
                    m.menuOptions[b] = f.parse(m.menuOptions[b].substring(1, m.menuOptions[b].length - 1)) : m.menuOptions[b] = f.parse("'" + m.menuOptions[b] + "'");
                b = 0;
                for (c = m.strValue.length; b < c; b++) m.strValue[b].match(/^\[/) && m.strValue[b].match(/\]$/) ? m.strValue[b] = f.parse(m.strValue[b].substring(1, m.strValue[b].length - 1)) : m.strValue[b] = f.parse(m.strValue[b]);
                m.select.innerHTML = "";
                b = 0;
                for (c = m.menuOptions.length; b < c; b++) d = a.newHTML("option"), d.innerHTML = e.eval(m.menuOptions[b]), m.select.appendChild(d);
                return 0
            }
            var h = a.Control.call(this,
                b, c) || this;
            h.label_color = h.label_color || new a.Color("e0e4e8", b.evaluator);
            h.label_text_color = h.label_text_color || new a.Color("000000", b.evaluator);
            h.options = c.options || "";
            f = h.parser;
            e = h.evaluator;
            h.ok = 0;
            h.tabindex = ++h.parent.tabindex;
            h.answer && (h.answer.match("krypto_") && (h.answer = (new a.Krypto).decode(h.answer.substring(7))), h.answer = parseInt(h.answer.split(",")[0].replace("[", "")) || 0);
            h.name_str = h.name;
            h.name.match(/^\[.*\]?/) ? h.name = h.parser.parse(h.name.substring(1, h.name.length - 1)) : h.name = h.parser.parse("'" +
                h.name + "'");
            var m = h;
            h.evaluator.setFunction(h.id + ".setOptions", d);
            h.containerControl = a.newHTML("div", { class: "DescartesMenuContainer", id: h.id });
            h.label = a.newHTML("canvas", { class: "DescartesMenuLabel" });
            h.label_ctx = h.label.getContext("2d");
            h.ratio = b.ratio;
            h.select = a.newHTML("select", { id: h.id + "_menuSelect", class: "DescartesMenuSelect", tabindex: h.tabindex });
            h.field = a.newHTML("input", { type: "text", id: h.id + "_menuField", class: "DescartesMenuField", tabindex: h.tabindex });
            d(h.options);
            h.containerControl.appendChild(h.label);
            h.containerControl.appendChild(h.select);
            h.visible && h.containerControl.appendChild(h.field);
            h.addControlContainer(h.containerControl);
            h.addEvents();
            h.init();
            return h
        };
    $jscomp.inherits(v, a.Control);
    v.prototype.init = function(b) {
        e = this.evaluator;
        this.label.innerHTML = e.eval(this.name).toString();
        var c = this.label.textContent;
        this.fieldFontSize = 0 < e.eval(this.font_size) ? e.eval(this.font_size) : a.getFieldFontSize(this.h);
        this.text_object = new a.TextObject({
            parent: { decimal_symbol: this.parent.decimal_symbol },
            evaluator: this.evaluator,
            decimals: this.decimals,
            fixed: !1,
            align: "left",
            anchor: "center_center",
            width: this.parser.parse("0"),
            font_size: this.parser.parse("" + this.fieldFontSize),
            font_family: this.font_family,
            italics: this.italics,
            bold: this.bold
        }, this.name_str);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0, !0);
        var d = 0,
            h = 0;
        this.value = b ? this.value : e.eval(this.valueExpr);
        this.indexValue = this.getIndex(this.value);
        for (var m = 0, f = this.menuOptions.length; m < f; m++) b = a.getTextWidth(e.eval(this.menuOptions[m]).toString(),
            this.fieldFontSize + "px " + a.sansserif_font), b > d && (d = b, h = m);
        d += 25;
        b = a.getTextWidth(this.formatOutputValue(e.eval(this.strValue[h])), this.fieldFontSize + "px " + a.sansserif_font) + 7;
        h = this.text_object.textNodes.metrics.w + parseInt(this.fieldFontSize);
        "" == c && (h = 0);
        this.visible || (b = 0);
        for (c = this.w - b - h; c < d && 0 < h;) h--, c++;
        for (; c < d && 0 < b;) b--, c++;
        for (; h + c + b + 1 < this.w;) c++, b++;
        d = h;
        m = d + c;
        b = this.w - m;
        f = this.formatOutputValue(e.eval(this.strValue[this.indexValue]));
        this.containerControl.setAttribute("style", "width:" +
            this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" + this.y + "px;z-index:" + this.zIndex + ";");
        this.label.setAttribute("style", "font-size:" + this.fieldFontSize + "px;width:" + h + "px;height:" + this.h + "px;line-height:" + this.h + "px;background-color:" + this.label_color.getColor() + ";color:" + this.label_text_color.getColor() + ";");
        this.label.width = h * this.ratio;
        this.label.height = this.h * this.ratio;
        this.field.value = f;
        this.field.setAttribute("style", "font-size:" + this.fieldFontSize + "px;width:" + b + "px;height:" + this.h + "px;left:" +
            m + "px;");
        this.select.setAttribute("style", "text-align:left;font-size:" + this.fieldFontSize + "px;width:" + c + "px;height:" + this.h + "px;left:" + d + "px;");
        this.select.selectedIndex = this.indexValue;
        e.setVariable(this.id, parseFloat(f.replace(this.parent.decimal_symbol, ".")));
        this.update()
    };
    v.prototype.update = function() {
        e = this.evaluator;
        this.activeIfValue = 0 < e.eval(this.activeif);
        this.drawIfValue = 0 < e.eval(this.drawif);
        this.field.disabled = this.activeIfValue ? !1 : !0;
        this.select.disabled = this.activeIfValue ? !1 : !0;
        this.drawIfValue ?
            this.containerControl.style.display = "block" : (this.click = !1, this.containerControl.style.display = "none");
        if (!this.parent.animation.playing || document.activeElement != this.select) {
            for (var a = 0, b = this.menuOptions.length; a < b; a++) this.select.options[a].innerHTML = e.eval(this.menuOptions[a]);
            this.value = e.getVariable(this.id);
            isNaN(this.value) && (this.value = 0);
            this.field.value = this.formatOutputValue(this.value);
            e.setVariable(this.id, parseFloat(this.value));
            this.select.selectedIndex = parseFloat(this.getIndex(this.value))
        }
        this.ok =
            this.value == this.answer ? 1 : 0;
        this.evaluator.setVariable(this.id + ".ok", this.ok);
        this.updatePositionAndSize();
        this.label_ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0);
        this.label_ctx.clearRect(0, 0, this.label.width, this.label.height);
        this.text_object.textNodes.metrics.w > this.label.width / this.ratio ? (this.text_object.anchor = "center_left", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 5, this.label.height / this.ratio /
            2)) : (this.text_object.anchor = "center_center", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), this.label.width / this.ratio / 2, this.label.height / this.ratio / 2));
        this.label_ctx.setTransform(1, 0, 0, 1, 0, 0)
    };
    v.prototype.customSplit = function(a) {
        k = !1;
        l = "";
        b = 0;
        for (h = -1; b < a.length;) {
            d = a.charAt(b);
            if ("[" === d && -1 === h) {
                if (k || "" != l) l += "\u00a6";
                h++
            } else "[" === d ? h++ : "]" === d && 0 === h ? (k = !0, h--) : "]" == a.charAt(b) && (h = 0 > h ? h : h - 1);
            l += a.charAt(b);
            b++
        }
        return l.split("\u00a6")
    };
    v.prototype.getIndex = function(a) {
        a =
            parseFloat(a.toString().replace(this.parent.decimal_symbol, "."));
        r = -1;
        p = Infinity;
        for (var b = 0, d = this.strValue.length; b < d; b++) c = g(a - parseFloat(this.evaluator.eval(this.strValue[b]))), c <= p && (p = c, r = b);
        return r
    };
    v.prototype.changeValue = function() { this.activeIfValue && (this.evaluator.setVariable(this.id, this.value), this.updateAndExecAction()) };
    v.prototype.addEvents = function() {
        var b = this;
        b.select.oncontextmenu = b.label.oncontextmenu = b.field.oncontextmenu = function() { return !1 };
        b.label.addEventListener("touchstart",
            a.preventDefault);
        b.label.addEventListener("mousedown", a.preventDefault);
        this.select.addEventListener("change", function(a) {
            b.value = b.evaluator.eval(b.strValue[this.selectedIndex]);
            b.field.value = b.formatOutputValue(b.value);
            b.evaluator.setVariable(b.id, b.field.value);
            b.changeValue();
            a.preventDefault()
        });
        this.field.addEventListener("keydown", function(a) {
            13 == a.keyCode && (b.indexValue = b.getIndex(b.field.value), b.value = b.evaluator.eval(b.strValue[b.indexValue]), b.field.value = b.formatOutputValue(b.indexValue),
                b.select.selectedIndex = b.indexValue, b.changeValue())
        });
        this.field.addEventListener("blur", function(a) { b.drawIfValue && b.changeValue(b.field.value, !0) });
        b.field.addEventListener("click", function(a) { this.focus() })
    };
    a.Menu = v;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f, e, r, p, c, k, l, b, h, d, v, q, u, A, n, m, w, x, y = function(b, c) {
            c = a.Control.call(this, b, c) || this;
            c.label_color = c.label_color || new a.Color("e0e4e8", b.evaluator);
            c.label_text_color = c.label_text_color || new a.Color("000000", b.evaluator);
            c.name_str = c.name;
            c.name.match(/^\[.*\]?/) ? c.name = c.parser.parse(c.name.substring(1, c.name.length - 1)) : c.name = c.parser.parse("'" + c.name + "'");
            c.orientation = c.w >= c.h ? "h" : "v";
            c.container = a.newHTML("div", {
                class: "DescartesScrollbarContainer",
                id: c.id
            });
            c.canvas = a.newHTML("canvas");
            c.divUp = a.newHTML("div", { class: "DescartesCatcher up" });
            c.divDown = a.newHTML("div", { class: "DescartesCatcher down" });
            c.field = a.newHTML("input", { type: "text", id: c.id + "scrollbar", class: "DescartesScrollbarField" });
            c.scrollHandler = a.newHTML("div", { class: "DescartesCatcher manipulator" });
            c.label = a.newHTML("canvas", { class: "DescartesScrollbarLabel" });
            c.label_ctx = c.label.getContext("2d");
            c.ratio = b.ratio;
            c.container.appendChild(c.canvas);
            c.container.appendChild(c.label);
            c.container.appendChild(c.divUp);
            c.container.appendChild(c.divDown);
            c.container.appendChild(c.field);
            c.container.appendChild(c.scrollHandler);
            c.addControlContainer(c.container);
            c.addEvents();
            c.init();
            return c
        };
    $jscomp.inherits(y, a.Control);
    y.prototype.init = function() {
        f = this.evaluator;
        0 == f.eval(this.decimals) ? this.incr = 1 : this.incr = (f.eval(this.max) - f.eval(this.min)) / 100;
        this.value = this.validateValue(f.eval(this.valueExpr));
        r = this.formatOutputValue(this.value);
        p = this.evaluator.eval(this.expresion);
        this.x = p[0][0];
        this.y = p[0][1];
        4 ==
            p[0].length && (this.w = p[0][2], this.h = p[0][3]);
        this.orientation = this.w >= this.h ? "h" : "v";
        this.initScroll(r);
        this.changeScrollPositionFromValue();
        this.prePos = this.pos;
        f.setVariable(this.id, this.value)
    };
    y.prototype.initScroll = function(b) {
        e = this;
        f = e.evaluator;
        e.label.innerHTML = f.eval(e.name).toString();
        x = this.label.textContent;
        var c = "v" === e.orientation ? parseInt(19 + 5 * (e.h - 100) / 100) : e.h;
        e.fieldFontSize = 0 < f.eval(e.font_size) ? f.eval(e.font_size) : "v" === e.orientation ? c - parseInt(e.h / 20) - 1 : a.getFieldFontSize(c);
        this.text_object = new a.TextObject({ parent: { decimal_symbol: this.parent.decimal_symbol }, evaluator: this.evaluator, decimals: this.decimals, fixed: !1, align: "left", anchor: "center_center", width: this.parser.parse("0"), font_size: this.parser.parse("" + this.fieldFontSize), font_family: this.font_family, italics: this.italics, bold: this.bold }, e.name_str);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0, !0);
        b = a.getTextWidth(b + "_", e.fieldFontSize + "px " + a.sansserif_font);
        var d = e.parent.getSpaceById(e.spaceID).h;
        e.labelHeight = "" == x ? 0 : c;
        e.fieldHeight = "" == e.visible ? 0 : c;
        if ("v" === e.orientation) e.canvasWidth = e.w, e.canvasHeight = e.h - e.labelHeight - e.fieldHeight, 18 <= e.canvasHeight + e.y - d && (e.canvasHeight = d), c = e.fieldHeight, b = c + e.canvasHeight, e.canvasX = 0, e.canvasY = e.fieldHeight, e.labelWidth = e.w, e.labelY = b, e.upWidth = e.downW = e.w, e.upHeight = e.downH = 15, e.upX = 0, e.upY = e.fieldHeight, e.downX = 0, e.downY = b - e.downH, e.fieldWidth = e.w, e.fieldX = 0, e.scrollHandlerW = e.w, e.scrollHandlerH = parseInt((e.canvasHeight - e.upHeight - e.downH - e.labelHeight -
            e.fieldHeight) / 10), e.scrollHandlerH = 15 > e.scrollHandlerH ? 15 : e.scrollHandlerH, e.limInf = b - e.downH - e.scrollHandlerH, e.limSup = c + e.downH;
        else {
            c = this.text_object.textNodes.metrics.w + parseInt(this.fieldFontSize);
            e.labelWidth = c;
            e.fieldWidth = b;
            "" == x && (e.labelWidth = 0);
            e.visible || (e.fieldWidth = 0);
            for (b = e.w - e.fieldWidth - e.labelWidth; 58 > b && 0 < e.labelWidth;) e.labelWidth--, b++;
            for (; 58 > b && 0 < e.fieldWidth;) e.fieldWidth--, b++;
            c = e.labelWidth;
            d = c + b;
            e.fieldWidth = e.w - d;
            e.canvasWidth = b;
            e.canvasHeight = e.h;
            e.canvasX = e.labelWidth;
            e.canvasY = 0;
            e.fieldX = e.canvasWidth + e.labelWidth;
            e.labelHeight = e.h;
            e.labelY = 0;
            e.upWidth = e.downW = 15;
            e.upHeight = e.downH = e.h;
            e.upX = d - e.downW;
            e.upY = 0;
            e.downX = e.labelWidth;
            e.downY = 0;
            e.scrollHandlerW = parseInt((e.canvasWidth - e.upWidth - e.downW) / 10);
            e.scrollHandlerW = 15 > e.scrollHandlerW ? 15 : e.scrollHandlerW;
            e.scrollHandlerH = e.h;
            e.limInf = c + e.downW;
            e.limSup = c + e.canvasWidth - e.downW - e.scrollHandlerW
        }
        e.container.setAttribute("style", "width:" + e.w + "px;height:" + e.h + "px;left:" + e.x + "px;top:" + e.y + "px;z-index:" + e.zIndex +
            ";");
        e.canvas.setAttribute("width", e.w + "px");
        e.canvas.setAttribute("height", e.h + "px");
        e.canvas.setAttribute("style", "position:absolute;left:0;top:0;");
        e.ctx = e.canvas.getContext("2d");
        e.ctx.imageSmoothingEnabled = !1;
        e.divUp.setAttribute("style", "width:" + e.upWidth + "px;height:" + e.upHeight + "px;left:" + e.upX + "px;top:" + e.upY + "px;");
        e.divDown.setAttribute("style", "width:" + e.downW + "px;height:" + e.downH + "px;left:" + e.downX + "px;top:" + e.downY + "px;");
        e.scrollHandler.setAttribute("style", "width:" + e.scrollHandlerW +
            "px;height:" + e.scrollHandlerH + "px;left:" + ("v" === e.orientation ? 0 : e.limInf) + "px;top:" + ("v" === e.orientation ? e.limInf : 0) + "px;");
        e.field.setAttribute("style", "font-size:" + e.fieldFontSize + "px;width:" + e.fieldWidth + "px;height:" + e.fieldHeight + "px;left:" + e.fieldX + "px;top:0;");
        0 === e.fieldHeight && (e.field.style.display = "none");
        e.label.setAttribute("style", "font-size:" + e.fieldFontSize + "px;width:" + e.labelWidth + "px;height:" + e.labelHeight + "px;line-height:" + e.labelHeight + "px;left:0;top:" + e.labelY + "px;background-color:" +
            this.label_color.getColor() + ";color:" + this.label_text_color.getColor() + ";");
        this.label.width = e.labelWidth * this.ratio;
        this.label.height = e.labelHeight * this.ratio
    };
    y.prototype.update = function() {
        f = this.evaluator;
        0 == f.eval(this.decimals) ? this.incr = 1 : this.incr = (f.eval(this.max) - f.eval(this.min)) / 100;
        this.activeIfValue = 0 < f.eval(this.activeif);
        this.drawIfValue = 0 < f.eval(this.drawif);
        this.field.disabled = !this.activeIfValue;
        this.drawIfValue ? (this.container.style.display = "block", this.draw()) : this.container.style.display =
            "none";
        this.updatePositionAndSize();
        var a = this.validateValue(f.getVariable(this.id));
        a == this.value || 0 < Math.abs(a - this.value) && 1E-9 > Math.abs(a - this.value) || (this.value = a, this.changeScrollPositionFromValue(), this.prePos = this.pos);
        this.value = a;
        this.field.value = this.formatOutputValue(this.value);
        f.setVariable(this.id, this.value);
        this.label_ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 0, 0);
        this.label_ctx.clearRect(0, 0, this.label.width,
            this.label.height);
        this.text_object.textNodes.metrics.w > this.label.width / this.ratio ? (this.text_object.anchor = "center_left", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), 5, this.label.height / this.ratio / 2)) : (this.text_object.anchor = "center_center", this.text_object.draw(this.label_ctx, this.label_text_color.getColor(), this.label.width / this.ratio / 2, this.label.height / this.ratio / 2));
        this.label_ctx.setTransform(1, 0, 0, 1, 0, 0)
    };
    y.prototype.draw = function() {
        e = this;
        c = e.ctx;
        l = g(this.w);
        k =
            g(this.h);
        c.fillStyle = "#e0e4e8";
        c.fillRect(0, 0, l, k);
        c.strokeStyle = "#7a8a99";
        c.fillStyle = "#ccdcec";
        e.down && c.fillRect(e.downX + .5, e.downY + .5, e.downW, e.downH - 1);
        c.strokeRect(e.downX + .5, e.downY + .5, e.downW, e.downH - 1);
        e.up && c.fillRect(e.upX + .5, e.upY - .5, e.upWidth, e.upHeight + 1);
        c.strokeRect(e.upX + .5, e.upY - .5, e.upWidth, e.upHeight + 1);
        b = 4;
        c.fillStyle = "black";
        c.beginPath();
        "h" === e.orientation ? (c.moveTo(e.downX + b, e.downH / 2), c.lineTo(e.downX + e.downW - b, b), c.lineTo(e.downX + e.downW - b, e.downH - b), c.moveTo(e.upX + e.upWidth -
            b, e.downH / 2), c.lineTo(e.upX + b, b), c.lineTo(e.upX + b, e.downH - b), c.fill(), e.activeIfValue && (h = g(e.pos), c.fillStyle = "#ccdcec", c.fillRect(h + .5, 0, g(e.scrollHandlerW), k), c.strokeStyle = "#6382bf", c.strokeRect(h + .5, 0, g(e.scrollHandlerW), k), d = g(e.scrollHandlerW / 2), c.beginPath(), c.moveTo(h + d + .5 - 2, 3), c.lineTo(h + d + .5 - 2, k - 3), c.moveTo(h + d + .5, 3), c.lineTo(h + d + .5, k - 3), c.moveTo(h + d + .5 + 2, 3), c.lineTo(h + d + .5 + 2, k - 3), c.stroke())) : (c.moveTo(e.downX + e.downW / 2, e.downY + e.downH - b), c.lineTo(e.downX + b, e.downY + b), c.lineTo(e.downX +
            e.downW - b, e.downY + b), c.moveTo(e.upX + e.upWidth / 2, e.upY + b), c.lineTo(e.upX + b, e.upY + e.upHeight - b), c.lineTo(e.upX + e.upWidth - b, e.upY + e.upHeight - b), c.fill(), e.activeIfValue && (h = g(e.pos), c.fillStyle = "#ccdcec", c.fillRect(0, h + .5, l, g(e.scrollHandlerH)), c.strokeStyle = "#6382bf", c.strokeRect(0, h + .5, l, g(e.scrollHandlerH)), d = g(e.scrollHandlerH / 2), c.beginPath(), c.moveTo(3, h + d + .5 - 2), c.lineTo(l - 3, h + d + .5 - 2), c.moveTo(3, h + d + .5), c.lineTo(l - 3, h + d + .5), c.moveTo(3, h + d + .5 + 2), c.lineTo(l - 3, h + d + .5 + 2), c.stroke()));
        c.strokeRect(.5,
            .5, l - 1, k - 1);
        e.activeIfValue || (c.fillStyle = "rgba(240,240,240," + 160 / 255 + ")", c.fillRect(0, 0, l, k.h))
    };
    y.prototype.validateValue = function(a) {
        f = this.evaluator;
        v = a.toString();
        v = parseFloat(v.replace(this.parent.decimal_symbol, "."));
        isNaN(v) && (v = 0);
        this.minimo = f.eval(this.min);
        v < this.minimo && (this.value = null, v = this.minimo);
        this.maximo = f.eval(this.max);
        v > this.maximo && (this.value = null, v = this.maximo);
        q = this.incr;
        v = 0 != q ? v * q / q : 0;
        this.fixed && (v = parseFloat(parseFloat(v).toFixed(f.eval(this.decimals))));
        return v
    };
    y.prototype.increase = function() { this.changeValue(parseFloat(this.value) + this.incr) };
    y.prototype.decrease = function() { this.changeValue(parseFloat(this.value) - this.incr) };
    y.prototype.increase10 = function() { b = (this.evaluator.eval(this.max) - this.evaluator.eval(this.min)) / 10; "h" == this.orientation ? this.clickPos.x > this.prePos && this.changeValue(parseFloat(this.value) + b) : this.clickPos.y < this.prePos && this.changeValue(parseFloat(this.value) + b) };
    y.prototype.decrease10 = function() {
        b = (this.evaluator.eval(this.max) -
            this.evaluator.eval(this.min)) / 10;
        "h" == this.orientation ? this.clickPos.x < this.prePos && this.changeValue(parseFloat(this.value) - b) : this.clickPos.y > this.prePos && this.changeValue(parseFloat(this.value) - b)
    };
    y.prototype.changeValue = function(a) { this.activeIfValue && (u = this.validateValue(a), u != this.value && (this.value = u, this.field.value = this.formatOutputValue(u), this.changeScrollPositionFromValue(), this.prePos = this.pos, this.evaluator.setVariable(this.id, this.value)), this.updateAndExecAction()) };
    y.prototype.changeValueForScrollMovement =
        function() {
            f = this.evaluator;
            A = this.limInf;
            n = this.limSup;
            m = f.eval(this.min);
            w = f.eval(this.max);
            q = this.incr;
            u = g((this.pos - A) * (w - m) / (n - A) / q) * q + m;
            u != this.value && (this.value = u, this.field.value = this.formatOutputValue(u), f.setVariable(this.id, this.value), this.parent.updateControls(), this.actionExec.execute(), this.parent.update())
        };
    y.prototype.changeScrollPositionFromValue = function() {
        f = this.evaluator;
        A = this.limInf;
        n = this.limSup;
        m = f.eval(this.min);
        w = f.eval(this.max);
        q = this.incr;
        this.pos = (this.value - m) * (n -
            A) / (w - m) + A;
        this.scrollHandler.style["h" == this.orientation ? "left" : "top"] = this.pos + "px"
    };
    y.prototype.addEvents = function() {
        function b(c, d, h, m) {
            a.clearTimeout(u);
            (n.up || n.down || n.canvasClick) && 1E-7 < Math.abs(n.value - m) && (d.call(n), c = h ? c : 30, u = a.setTimeout(function() { b(c, d, !1, m) }, c))
        }

        function c(c) {
            c.preventDefault();
            n.whichBtn = a.whichBtn(c);
            "L" == n.whichBtn && n.activeIfValue && (n.clickPos = a.getCursorPosition(c, n.container), n.canvasClick = !0, "h" == n.orientation ? n.clickPos.x < n.prePos ? b(350, n.decrease10, !0, n.minimo) :
                b(350, n.increase10, !0, n.maximo) : n.clickPos.y < n.prePos ? b(350, n.increase10, !0, n.maximo) : b(350, n.decrease10, !0, n.minimo))
        }

        function d(b) {
            n.canvasClick = !1;
            a.clearTimeout(u)
        }

        function h(b) { 1 == n.canvasClick && (n.clickPos = a.getCursorPosition(b, n.container), b.preventDefault()) }

        function m(a) {
            n.scrollClick = !1;
            n.prePos = n.pos;
            window.removeEventListener("mouseup", m, !1);
            window.removeEventListener("mousemove", f, !1);
            a.preventDefault()
        }

        function e(a) {
            n.scrollClick = !1;
            n.prePos = n.pos;
            window.removeEventListener("touchend",
                e, !1);
            window.removeEventListener("touchmove", f, !1);
            a.preventDefault()
        }

        function f(b) {
            var c = a.getCursorPosition(b, n.container);
            "h" == n.orientation ? (n.pos = n.prePos - (n.initPos.x - c.x), n.pos < n.limInf && (n.pos = n.limInf), n.pos > n.limSup && (n.pos = n.limSup), n.scrollHandler.setAttribute("style", "width:" + n.scrollHandlerW + "px;height:" + n.h + "px;left:" + n.pos + "px;top:0;")) : (n.pos = n.prePos - (n.initPos.y - c.y), n.pos > n.limInf && (n.pos = n.limInf), n.pos < n.limSup && (n.pos = n.limSup), n.scrollHandler.setAttribute("style", "width:" +
                n.w + "px;height:" + n.scrollHandlerH + "px;left:0;top:" + n.pos + "px;"));
            n.changeValueForScrollMovement();
            b.preventDefault()
        }

        function g(c) {
            c.preventDefault();
            n.whichBtn = a.whichBtn(c);
            "L" == n.whichBtn && n.activeIfValue && (n.up = !0, b(350, n.increase, !0, n.maximo))
        }

        function k(c) {
            c.preventDefault();
            n.whichBtn = a.whichBtn(c);
            "L" == n.whichBtn && n.activeIfValue && (n.down = !0, b(350, n.decrease, !0, n.minimo))
        }

        function q(b) {
            n.down = !1;
            a.clearTimeout(u);
            b.preventDefault()
        }

        function l(b) {
            n.up = !1;
            a.clearTimeout(u);
            n.draw()
        }

        function p(b) {
            n.down = !1;
            a.clearTimeout(u);
            n.draw()
        }
        var n = this,
            u;
        n.canvas.oncontextmenu = n.divUp.oncontextmenu = n.divDown.oncontextmenu = n.label.oncontextmenu = n.field.oncontextmenu = n.scrollHandler.oncontextmenu = function() { return !1 };
        this.field.addEventListener("keydown", function(a) { 13 == a.keyCode && n.changeValue(n.field.value) });
        this.field.addEventListener("blur", function(a) { n.drawIfValue && n.changeValue(n.field.value, !0) });
        this.canvas.addEventListener("touchstart", c);
        this.canvas.addEventListener("mousedown", c);
        this.divDown.addEventListener("mouseout",
            q);
        window.addEventListener("touchend", d);
        window.addEventListener("mouseup", d);
        this.canvas.addEventListener("touchmove", h);
        this.canvas.addEventListener("mousemove", h);
        this.scrollHandler.addEventListener("touchstart", function(b) { n.activeIfValue && (n.scrollClick = !0, n.initPos = a.getCursorPosition(b, n.container), window.addEventListener("touchend", e), window.addEventListener("touchmove", f), b.preventDefault()) });
        this.scrollHandler.addEventListener("mousedown", function(b) {
            n.activeIfValue && (n.scrollClick = !0,
                n.initPos = a.getCursorPosition(b, n.container), window.addEventListener("mouseup", m), window.addEventListener("mousemove", f), b.preventDefault())
        });
        this.divUp.addEventListener("touchstart", g);
        this.divUp.addEventListener("mousedown", g);
        this.divDown.addEventListener("touchstart", k);
        this.divDown.addEventListener("mousedown", k);
        this.divUp.addEventListener("mouseout", function(b) {
            n.up = !1;
            a.clearTimeout(u);
            b.preventDefault()
        });
        this.divDown.addEventListener("mouseout", q);
        window.addEventListener("touchend", l);
        window.addEventListener("mouseup", l);
        window.addEventListener("touchend", p);
        window.addEventListener("mouseup", p)
    };
    a.Scrollbar = y;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e = function(e, f) {
        var c = a.Control.call(this, e, f) || this;
        c.controls = f.controls || !0;
        c.file = f.file || "";
        c.oldDrawIf = 0;
        e = c.evaluator.eval(c.expresion);
        4 == e[0].length ? (c.w = e[0][2], c.h = e[0][3]) : (c.w = 200, c.h = 28);
        c.audio = c.parent.getAudio(c.file);
        c.oldFile = c.file;
        "]" === c.file.charAt(c.file.length - 1) && (c.file = c.evaluator.parser.parse(c.file.substring(1, c.file.length - 1)));
        c.autoplay && (c.audio.setAttribute("autoplay", "autoplay"), c.audio.play());
        c.loop && c.audio.setAttribute("loop",
            "loop");
        c.controls && c.audio.setAttribute("controls", "controls");
        c.audio.setAttribute("style", "position:absolute;width:" + c.w + "px;left:" + c.x + "px;top:" + c.y + "px;z-index:" + c.zIndex + ";");
        c.addControlContainer(c.audio);
        c.evaluator.setFunction(c.id + ".play", function() { try { c.audio.play() } catch (k) {} return 0 });
        c.evaluator.setFunction(c.id + ".pause", function() { try { c.audio.pause() } catch (k) {} return 0 });
        c.evaluator.setFunction(c.id + ".stop", function() { try { c.audio.pause(), c.audio.currentTime = 0 } catch (k) {} return 0 });
        c.evaluator.setFunction(c.id + ".currentTime", function(a) { try { c.audio.currentTime = parseFloat(a) } catch (l) {} return 0 });
        c.audio.addEventListener("timeupdate", function(a) { c.evaluator.setVariable(c.id + ".currentTime", c.audio.currentTime) });
        return c
    };
    $jscomp.inherits(e, a.Control);
    e.prototype.init = function() {
        this.audio.style.left = this.x + "px";
        this.audio.style.top = this.y + "px";
        this.update()
    };
    e.prototype.update = function() {
        g = this.evaluator;
        "string" !== typeof this.file && (this.tmpFile = g.eval(this.file), this.oldFile !==
            this.tmpFile && (this.oldFile = this.audio.src = this.tmpFile));
        (f = 0 < g.eval(this.drawif)) ? this.audio.style.display = "block": (this.audio.style.display = "none", f !== this.oldDrawIf && this.audio.pause());
        this.oldDrawIf = f;
        this.updatePositionAndSize()
    };
    a.Audio = e;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e = function(e, f) {
        var c = a.Control.call(this, e, f) || this;
        c.controls = f.controls || !0;
        c.file = f.file || "";
        c.oldDrawIf = 0;
        g = c.evaluator;
        e = g.eval(c.expresion);
        4 == e[0].length ? (c.w = e[0][2], c.h = e[0][3]) : (c.w = null, c.h = null);
        e = c.file;
        f = e.lastIndexOf("."); - 1 != f && (e = c.file.substring(0, f));
        c.video = a.newHTML("video", { poster: e + ".png", style: "position:absolute;overflow:hidden;left:" + c.x + "px;top:" + c.y + "px;outline:none;background:rgba(0,0,0,0);" });
        c.autoplay && c.video.setAttribute("autoplay",
            "autoplay");
        c.loop && c.video.setAttribute("loop", "loop");
        c.controls && c.video.setAttribute("controls", "controls");
        c.w && (c.video.setAttribute("width", c.w), c.video.setAttribute("height", c.h));
        c.video.canPlayType("video/mp4") && (f = a.newHTML("source", { src: e + ".mp4", type: "video/mp4" }), c.video.appendChild(f));
        c.video.canPlayType("video/ogg") && (f = a.newHTML("source", { src: e + ".ogg", type: "video/ogg" }), c.video.appendChild(f), f = a.newHTML("source", { src: e + ".ogv", type: "video/ogg" }), c.video.appendChild(f));
        c.video.canPlayType("video/webm") &&
            (f = a.newHTML("source", { src: e + ".webm", type: "video/webm" }), c.video.appendChild(f));
        c.addControlContainer(c.video);
        g.setFunction(c.id + ".play", function() { try { c.video.play() } catch (k) {} return 0 });
        g.setFunction(c.id + ".pause", function() { try { c.video.pause() } catch (k) {} return 0 });
        g.setFunction(c.id + ".stop", function() { try { c.video.pause(), c.video.currentTime = 0 } catch (k) {} return 0 });
        g.setFunction(c.id + ".currentTime", function(a) { try { c.video.currentTime = parseFloat(a) } catch (l) {} return 0 });
        c.video.addEventListener("timeupdate",
            function(a) { g.setVariable(c.id + ".currentTime", c.video.currentTime) });
        return c
    };
    $jscomp.inherits(e, a.Control);
    e.prototype.init = function() {
        this.video.style.left = this.x + "px";
        this.video.style.top = this.y + "px";
        this.update()
    };
    e.prototype.update = function() {
        g = this.evaluator;
        (f = 0 < g.eval(this.drawif)) ? this.video.style.display = "block": (this.video.style.display = "none", f !== this.oldDrawIf && this.video.pause());
        this.oldDrawIf = f;
        this.updatePositionAndSize()
    };
    a.Video = e;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r = function(e, c) {
        var f = a.Control.call(this, e, c) || this;
        f.font_family = c.font_family || "Monospaced";
        f.style = c.style || ",PLAIN,";
        f.font_size = c.font_size || 12;
        typeof("number" !== f.font_size) && (f.font_size = f.evaluator.eval(f.font_size));
        f.font = f.font_family + f.style + f.font_size;
        f.region = "interior";
        f.tabindex = ++f.parent.tabindex;
        if (f.answer) { f.answer.match("krypto_") && (f.answer = (new a.Krypto).decode(f.answer.substring(7))); var g = f.parent.lessonParser.parseText(f.answer) }
        f.containerControl =
            a.newHTML("div", { class: "DescartesTextAreaContainer", id: f.id, spellcheck: "false" });
        f.textArea = a.newHTML("div", { class: "DescartesTextAreaContainer", contenteditable: "true" });
        f.textAreaAnswer = a.newHTML("div", { class: "DescartesTextAreaContainer" });
        f.showButton = a.newHTML("div", { class: "DJS_Gradient" });
        f.activeCover = a.newHTML("div");
        f.containerControl.appendChild(f.textArea);
        f.containerControl.appendChild(f.textAreaAnswer);
        f.containerControl.appendChild(f.showButton);
        f.containerControl.appendChild(f.activeCover);
        f.addControlContainer(f.containerControl);
        f.showAnswer = !1;
        f.text = void 0 == f.text || "simpleText" == f.text.type ? f.rawText || "" : f.text.hasFormula ? f.rawText : f.text.toHTML();
        g && "simpleText" !== g.type && (f.answer = f.text.hasFormula ? "" : g.toHTML());
        f.evaluator.setVariable(f.id, f.text);
        var b, h, d;
        f.evaluator.setFunction(f.id + ".insertAtCursor", function(a) {
            (b = window.getSelection()) && b.getRangeAt && b.rangeCount && (d = document.createTextNode(a), h = b.getRangeAt(0), h.deleteContents(), h.insertNode(d), h.setStart(d, d.length),
                h.setEnd(d, d.length), b.removeAllRanges(), b.addRange(h), f.textArea.focus());
            return 0
        });
        f.evaluator.setFunction(f.id + ".update", function() { f.update() });
        f.addEvents();
        f.init();
        return f
    };
    $jscomp.inherits(r, a.Control);
    r.prototype.init = function() {
        f = this.answer ? 28 : 4;
        g = this.evaluator;
        var e = this.text.match(/<span/) ? this.text : this.text.replace(/\\n/g, "<br/>");
        this.containerControl.setAttribute("style", "width:" + this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" + this.y + "px;z-index:" + this.zIndex + ";");
        var c =
            "padding:5px;width:" + (this.w - 4) + "px;height:" + (this.h - f) + "px;left:2px;top:2px;background-color:white;text-align:left;font:" + a.convertFont(this.font) + ";line-height:" + this.font_size + "px;";
        this.textArea.setAttribute("style", c);
        this.textArea.innerHTML = e;
        this.textAreaAnswer.setAttribute("style", c + "display:" + (this.showAnswer ? "block" : "none") + ";");
        this.textAreaAnswer.innerHTML = "<span>" + this.answer + "</span>";
        this.showButton.setAttribute("style", "width:20px;height:16px;position:absolute;bottom:4px;right:4px;cursor:pointer;border:1px outset #f0f8ff;display:" +
            (this.answer ? "block" : "none") + ";");
        this.showButton.innerHTML = '<span style="position:relative;top:1px;text-align:center;font:11px ' + a.sansserif_font + ';">S</span>';
        this.activeCover.setAttribute("style", "position:absolute;width:" + this.w + "px;height:" + this.h + "px;left:" + this.x + "px;top:" + this.y + "px;");
        this.update()
    };
    r.prototype.update = function() {
        g = this.evaluator;
        this.activeIfValue = 0 < g.eval(this.activeif);
        this.drawIfValue = 0 < g.eval(this.drawif);
        g.getVariable(this.id) !== this.oldValue && (this.textArea.innerText =
            (g.getVariable(this.id) || "").replace(/\\n/g, "\n"));
        e = this.textArea.innerText || "";
        e = "\n" === e.charAt(e.length - 1) ? e.substring(0, e.length - 1) : e;
        e = e.replace(/\n/g, "\\n").replace(/\s/g, " ");
        g.setVariable(this.id, e);
        this.oldFieldValue = e;
        this.oldValue = g.getVariable(this.id);
        this.activeCover.style.display = this.activeIfValue ? "none" : "block";
        this.containerControl.style.display = this.drawIfValue ? "block" : "none";
        this.updatePositionAndSize()
    };
    r.prototype.addEvents = function() {
        function a(a) { a.preventDefault() }
        var c =
            this;
        this.showButton.addEventListener("mousedown", function(a) {
            a.preventDefault();
            c.showAnswer = !c.showAnswer;
            c.textAreaAnswer.style.display = c.showAnswer ? "block" : "none";
            c.showButton.childNodes[0].childNodes[0].textContent = c.showAnswer ? "T" : "S"
        });
        this.showButton.addEventListener("mouseup", a);
        this.showButton.addEventListener("mouseout", a);
        this.textArea.addEventListener("blur", function() {
            var a = window.getSelection();
            c.cursorInd = a.focusOffset
        });
        this.textArea.addEventListener("paste", function(a) {
            a.preventDefault();
            document.execCommand("insertHTML", !1, a.clipboardData.getData("text/plain").replace(/\n/g, "<br>"))
        });
        this.textArea.addEventListener("keydown", function(a) { if ("PageDown" === a.key || "PageUp" === a.key) a.stopPropagation(), a.preventDefault() })
    };
    a.TextArea = r;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = 2 * Math.PI,
        f, e, r, p, c, k, l, b, h, d, v, q, u = function(b, c) {
            var h = a.Control.call(this, b, c) || this;
            e = b.evaluator.parser;
            h.spaceID = c.spaceID || "";
            h.text = c.text || "";
            h.size = c.size || e.parse("4");
            h.font = c.font || "Serif,PLAIN,12";
            h.image = new Image;
            h.image.onload = function() { this.ready = 1 };
            h.imageSrc = c.imageSrc || "";
            h.imageSrc.match(/^\[.*\]?/) ? h.imageSrc = h.parser.parse(h.imageSrc.substring(1, h.imageSrc.length - 1)) : h.imageSrc = h.parser.parse("'" + h.imageSrc + "'");
            h.font = a.convertFont(h.font);
            if (h.constraintExpr) {
                h.constraint = e.parse(h.constraintExpr);
                "(expr)" == h.constraint.type && (h.constraint = e.parse(h.constraintExpr.substring(1, h.constraintExpr.length - 1)));
                if ("compOperator" == h.constraint.type) {
                    c = h.constraint.childs[0];
                    var f = h.constraint.childs[1];
                    "identifier" != c.type || "y" != c.value || f.contains("y") ? "identifier" != c.type || "x" != c.value || f.contains("x") ? h.newt = new a.R2Newton(h.evaluator, h.constraint) : (h.constVar = "y", h.noConstVar = "x", h.evalConst = h.evalConstXoY, h.constraint = f) : (h.constVar =
                        "x", h.noConstVar = "y", h.evalConst = h.evalConstXoY, h.constraint = f)
                } else h.constraint = null;
                d = new a.R2(0, 0)
            }
            h.container = h.getContainer();
            h.mouseCatcher = a.newHTML("div", { class: "DescartesGraphicControl", id: h.id, dragged: !0, tabindex: "-1", style: "cursor:pointer;background-color:transparent;z-index:" + h.zIndex + ";" });
            h.ctx = h.space.ctx;
            h.container.appendChild(h.mouseCatcher);
            h.addEvents();
            h.xStr = h.id + ".x";
            h.yStr = h.id + ".y";
            h.activoStr = h.id + ".activo";
            h.activeStr = h.id + ".active";
            "" !== h.space.id && 2 !== b.version ? (h.mxStr =
                h.space.id + ".mouse_x", h.myStr = h.space.id + ".mouse_y", h.mclickedStr = h.space.id + ".mouse_clicked", h.mclicizquierdoStr = h.space.id + ".clic_izquierdo") : (h.mxStr = "mouse_x", h.myStr = "mouse_y", h.mclickedStr = "mouse_clicked", h.mclicizquierdoStr = "clic_izquierdo");
            h.init();
            return h
        };
    $jscomp.inherits(u, a.Control);
    u.prototype.init = function(b) {
        f = this.evaluator;
        v = a.hasTouchSupport;
        b || (b = f.eval(this.expresion), this.x = b[0][0], this.y = b[0][1], f.setVariable(this.xStr, this.x), f.setVariable(this.yStr, this.y));
        this.img_src_eval =
            f.eval(this.imageSrc).toString().trim();
        "" == this.img_src_eval || this.img_src_eval.toLowerCase().match(/vacio.gif$/) ? (this.width = 2 * f.eval(this.size), this.height = 2 * f.eval(this.size), this._w = v && 48 > this.width ? 48 : this.width, this._h = v && 48 > this.height ? 48 : this.height, this.mouseCatcher.style.borderRadius = parseInt(Math.min(this._w, this._h) / 2) + "px") : (this.image = this.parent.getImage(this.img_src_eval), this.width = this.image.width, this.height = this.image.height, this._w = Math.max(this.width, 32), this._h = Math.max(this.height,
            32));
        this.mouseCatcher.style.width = this._w + "px";
        this.mouseCatcher.style.height = this._h + "px";
        this.mouseCatcher.style.left = parseInt(this.space.getAbsoluteX(this.x) - this._w / 2) + "px";
        this.mouseCatcher.style.top = parseInt(this.space.getAbsoluteY(this.y) - this._h / 2) + "px";
        f.setVariable(this.activoStr, 0);
        f.setVariable(this.activeStr, 0);
        this.setImage = !1;
        this.update()
    };
    u.prototype.update = function() {
        f = this.evaluator;
        f.eval(this.imageSrc).toString().trim() !== this.img_src_eval && this.init(!0);
        this.activeIfValue = 0 <
            f.eval(this.activeif);
        this.drawIfValue = 0 < f.eval(this.drawif);
        this.x = f.getVariable(this.xStr);
        this.y = f.getVariable(this.yStr);
        r = this.space.getAbsoluteX(this.x);
        p = this.space.getAbsoluteY(this.y);
        this.mouseCatcher.style.display = this.activeIfValue ? "block" : "none";
        this.mouseCatcher.style.left = parseInt(r - this._w / 2) + "px";
        this.mouseCatcher.style.top = parseInt(p - this._h / 2) + "px";
        this.constraint && this.evalConst();
        this.draw()
    };
    u.prototype.draw = function() {
        f = this.evaluator;
        this.drawIfValue && (b = this.ctx, h = this.space.backgroundCtx,
            r = parseInt(this.space.getAbsoluteX(this.x)) + .5, p = parseInt(this.space.getAbsoluteY(this.y)) + .5, "" != this.text && this.drawText(r, p), this.image.ready ? (c = this.image.width / 2, k = this.image.height / 2, this.image.complete && !this.setImage && b.drawImage(this.image, parseInt(r - c), parseInt(p - k)), this.trace && (h.save(), h.translate(r, p), h.scale(parseInt(c), parseInt(k)), h.beginPath(), h.arc(0, 0, 1, 0, g), h.restore(), h.lineWidth = 1, h.strokeStyle = this.trace.getColor(), h.stroke())) : (c = parseInt(this.width / 2), b.beginPath(), b.arc(r,
                p, c, 0, g), b.fillStyle = this.colorInt.getColor(), b.fill(), b.lineWidth = 1, b.strokeStyle = this.color.getColor(), b.stroke(), this.active && (b.strokeStyle = this.colorInt.borderColor(), b.beginPath(), b.arc(r, p, c - 2, 0, g), b.stroke()), this.trace && (h.strokeStyle = this.trace.getColor(), h.beginPath(), h.arc(r, p, c, 0, g), h.stroke())))
    };
    u.prototype.evalConst = function() {
        d.set(this.x, this.y);
        l = this.newt.findZero(d, 1 / this.space.scale, !0);
        this.x = l.x;
        this.y = l.y;
        this.evaluator.setVariable(this.xStr, this.x);
        this.evaluator.setVariable(this.yStr,
            this.y)
    };
    u.prototype.evalConstXoY = function() {
        f = this.evaluator;
        q = f.getVariable(this.constVar);
        f.setVariable(this.constVar, this[this.constVar]);
        this[this.noConstVar] = f.eval(this.constraint);
        f.setVariable(this.xStr, this.x);
        f.setVariable(this.yStr, this.y);
        f.setVariable(this.constVar, q)
    };
    u.prototype.drawText = function(a, c) {
        b = this.ctx;
        f = this.evaluator;
        "simpleText" == this.text.type ? (b.fillStyle = this.color.getColor(), b.font = this.font, b.textBaseline = "alphabetic", b.fillText(this.text.toString(f.eval(this.decimals),
            this.fixed), parseInt(a + 1 + this.width / 2), parseInt(c - 1 - this.height / 2))) : (b.fillStyle = this.color.getColor(), b.strokeStyle = this.color.getColor(), b.textBaseline = "alphabetic", this.text.draw(b, parseInt(a + 1 + this.width / 2), parseInt(c - 1 - this.height / 2), this.decimals, this.fixed, "start", !0, this.color.getColor()))
    };
    u.prototype.getContainer = function() {
        for (var a = this.parent.spaces, b, c = 0, d = a.length; c < d; c++)
            if (b = a[c], b.id == this.spaceID) return b.addCtr(this), this.zIndex = b.zIndex, this.space = b, b.graphicControlContainer;
        a[0].addCtr(this);
        this.zIndex = a[0].zIndex;
        this.space = a[0];
        return a[0].graphicControlContainer
    };
    u.prototype.deactivate = function() {
        this.active = !1;
        this.evaluator.setVariable(this.activoStr, 0);
        this.evaluator.setVariable(this.activeStr, 0);
        this.evaluator.setVariable(this.mclicizquierdoStr, 0)
    };
    u.prototype.addEvents = function() {
        function b(b) {
            document.body.focus();
            b.preventDefault();
            e.whichBtn = a.whichBtn(b);
            "L" == e.whichBtn && e.activeIfValue && (e.parent.deactivateGraphicControls(), e.click = e.active = !0, e.evaluator.setVariable(e.activoStr,
                1), e.evaluator.setVariable(e.activeStr, 1), e.evaluator.setVariable(e.mclickedStr, 0), e.evaluator.setVariable(e.mclicizquierdoStr, 0), e.posAnte = a.getCursorPosition(b, e.container), e.prePos = { x: e.space.getAbsoluteX(e.x), y: e.space.getAbsoluteY(e.y) }, e.evaluator.setVariable(e.mxStr, e.space.getRelativeX(e.posAnte.x)), e.evaluator.setVariable(e.myStr, e.space.getRelativeY(e.posAnte.y)), e.parent.update(), window.addEventListener("touchend", c), window.addEventListener("touchmove", d), window.addEventListener("mouseup",
                c), window.addEventListener("mousemove", d))
        }

        function c(b) {
            document.body.focus();
            b.preventDefault();
            b.stopPropagation();
            e.evaluator.setVariable(e.mclickedStr, 1);
            e.evaluator.setVariable(e.mclicizquierdoStr, 1);
            if (e.activeIfValue || e.active) e.click = !1, window.removeEventListener("mouseup", c), window.removeEventListener("mousemove", d), window.removeEventListener("touchend", c), window.removeEventListener("touchmove", d), f = a.getCursorPosition(b, e.container) || f, e.posX = e.prePos.x - (e.posAnte.x - f.x), e.posY = e.prePos.y -
                (e.posAnte.y - f.y), e.evaluator.setVariable(e.xStr, e.space.getRelativeX(e.posX)), e.evaluator.setVariable(e.yStr, e.space.getRelativeY(e.posY)), e.evaluator.setVariable(e.mxStr, e.space.getRelativeX(f.x)), e.evaluator.setVariable(e.myStr, e.space.getRelativeY(f.y)), e.parent.updateControls(), e.parent.update(), e.mouseCatcher.style.left = e.space.getAbsoluteX(e.x) - e._w / 2 + "px", e.mouseCatcher.style.top = e.space.getAbsoluteY(e.y) - e._h / 2 + "px";
            b = e.evaluator.getVariable(e.activeStr);
            e.parent.deactivateGraphicControls();
            e.parent.updateControls();
            e.evaluator.setVariable(e.activoStr, b);
            e.evaluator.setVariable(e.activeStr, b);
            e.parent.update()
        }

        function d(b) {
            b.preventDefault();
            e.evaluator.setVariable(e.mclickedStr, 0);
            e.evaluator.setVariable(e.mclicizquierdoStr, 0);
            f = a.getCursorPosition(b, e.container);
            e.posX = e.prePos.x - (e.posAnte.x - f.x);
            e.posY = e.prePos.y - (e.posAnte.y - f.y);
            e.evaluator.setVariable(e.xStr, e.space.getRelativeX(e.posX));
            e.evaluator.setVariable(e.yStr, e.space.getRelativeY(e.posY));
            e.evaluator.setVariable(e.mxStr,
                e.space.getRelativeX(f.x));
            e.evaluator.setVariable(e.myStr, e.space.getRelativeY(f.y));
            80 < Date.now() - h && (e.parent.updateControls(), e.parent.update(), h = Date.now())
        }
        var h = 0,
            f, e = this;
        this.active = this.over = this.click = !1;
        this.mouseCatcher.oncontextmenu = function() { return !1 };
        this.mouseCatcher.addEventListener("touchstart", b);
        this.mouseCatcher.addEventListener("mousedown", b);
        this.mouseCatcher.addEventListener("mouseover", function(a) { e.over = !0 });
        this.mouseCatcher.addEventListener("mouseout", function(a) {
            e.over = !1;
            e.click = !1
        })
    };
    a.GraphicControl = u;
    return a
}(descartesJS || {});
descartesJS = function(a, g) {
    var f, e, r, p, c, k, l, b, h, d;

    function v(a) { return a.charAt(0).toUpperCase() + a.substring(1) }
    if (a.loadLib) return a;
    var q = /[\w-//]*(\.png|\.jpg|\.gif|\.svg)/gi,
        u, A, n, m, w, x, y, z, G, J, E, F, D, B, L, I, M, O, H, P, C, N, K, Q, R, W, V, U, T, S = function(b) {
            this.parent = b;
            this.parser = b.evaluator.parser;
            this.RTFparser = new a.RTFParser(b.evaluator)
        };
    S.prototype.parseButtonsConfig = function(a) {
        var b = { rowsNorth: 0, rowsSouth: 0, widthEast: 125, widthWest: 125, height: 23 };
        a = this.split(a);
        for (var c = 0, d = a.length; c < d; c++) switch (n =
            a[c][0], m = a[c][1], A = g[n], A) {
            case "rowsNorth":
            case "rowsSouth":
            case "widthEast":
            case "widthWest":
            case "height":
                b[A] = parseInt(m);
                break;
            case "about":
            case "config":
            case "init":
            case "clear":
                b[A] = "true" === g[m];
                break;
            default:
                console.warn("Propiedad de botones no identificada: <" + n + "> valor: <" + m + ">")
        }
        return b
    };
    S.prototype.parseSpace = function(b) {
        w = {};
        b = this.split(b);
        for (var c = 0, d = b.length; c < d; c++) switch (n = b[c][0], m = b[c][1], A = g[n], a.DEBUG.paramName = n, a.DEBUG.objectName = "Space", A) {
            case "type":
                if ("R2" === m ||
                    "R3" === m) m = g[m];
                w[A] = m;
                break;
            case "id":
                a.DEBUG.idName = m;
            case "x_axis":
            case "y_axis":
            case "cID":
            case "file":
            case "border_width":
            case "border_radius":
            case "info":
                w[A] = m;
                break;
            case "fixed":
            case "numbers":
            case "sensitive_to_mouse_movements":
            case "3D":
            case "split":
            case "resizable":
                w[A] = "true" === g[m];
                break;
            case "bg_display":
            case "render":
                w[A] = g[m];
                break;
            case "border_color":
            case "net":
            case "net10":
            case "axes":
            case "text":
                w[A] = "" != m ? "false" === g[m] ? "" : new a.Color(m, this.parent.evaluator) : "";
                break;
            case "O.x":
                w.OxExpr =
                    m;
                break;
            case "O.y":
                w.OyExpr = m;
                break;
            case "image":
                w.imageSrc = m;
                break;
            case "x":
                u = m;
                "%" === u[u.length - 1] ? (w.xPercentExpr = u.trim(), u = (this.parent.container.width * parseFloat(u) / 100).toString()) : u = m;
                w.xExpr = this.parser.parse(u);
                break;
            case "y":
                u = m;
                "%" === u[u.length - 1] ? (w.yPercentExpr = u.trim(), u = (this.parent.container.height * parseFloat(u) / 100).toString()) : u = m;
                w.yExpr = this.parser.parse(u);
                break;
            case "width":
                u = m.trim();
                w.wModExpr = u;
                "%" === u[u.length - 1] ? (w.wExpr = u, u = this.parent.container.width * parseFloat(u) / 100) :
                    (u = parseFloat(m), u != m && (u = this.parent.container.width, w._w_ = m.trim()));
                w.w = u;
                break;
            case "height":
                u = m.trim();
                w.hModExpr = u;
                "%" === u[u.length - 1] ? (w.hExpr = u, u = this.parent.container.height * parseFloat(u) / 100) : (u = parseFloat(m), u != m && (u = this.parent.container.height, w._h_ = m.trim()));
                w.h = u;
                break;
            case "drawif":
                "" != m && (w.drawif = this.parser.parse(m));
                break;
            case "scale":
                u = parseFloat(m);
                isNaN(u) && (u = 48);
                w.scale = u;
                break;
            case "background":
                w.background = new a.Color(m, this.parent.evaluator);
                break;
            default:
                console.warn("Propiedad del espacio no identificada: <" +
                    n + "> valor: <" + m + ">")
        }
        return new a["Space" + w.type](this.parent, w)
    };
    S.prototype.parseControl = function(b) {
        x = { type: "Numeric", gui: "Spinner" };
        b = this.split(b);
        for (var c = 0, d = b.length; c < d; c++) switch (n = b[c][0], m = b[c][1], A = g[n], a.DEBUG.paramName = n, a.DEBUG.objectName = "Control", A) {
            case "type":
                u = g[m.trim()];
                "graphic" === u ? u = "GraphicControl" : "text" === u && (u = "TextArea");
                x.type = v(u);
                break;
            case "gui":
                u = g[m];
                "textfield" === u && (u = "TextField");
                x[A] = v(u);
                break;
            case "id":
                a.DEBUG.idName = m;
            case "name":
            case "parameter":
            case "tooltip":
            case "tooltipFont":
            case "Explanation":
            case "ExplanationFont":
            case "cID":
            case "options":
            case "font":
            case "font_family":
            case "file":
            case "answer":
            case "cssClass":
            case "radio_group":
            case "extra_style":
            case "info":
                x[A] =
                    m;
                break;
            case "region":
            case "position":
            case "action":
            case "msg_pos":
            case "poster":
            case "text_align":
            case "image_align":
            case "btn_pos":
                x[A] = g[m];
                break;
            case "fixed":
            case "visible":
            case "discrete":
            case "onlyText":
            case "evaluate":
            case "autoplay":
            case "loop":
            case "controls":
            case "flat":
                x[A] = "true" === g[m];
                break;
            case "color":
            case "colorInt":
            case "label_color":
            case "label_text_color":
            case "trace":
                x[A] = new a.Color(m, this.parent.evaluator);
                break;
            case "font_size":
            case "drawif":
            case "activeif":
            case "decimals":
            case "min":
            case "max":
            case "size":
                "" !==
                m && (x[A] = this.parser.parse(m));
                break;
            case "constraint":
                x.constraintExpr = m;
                break;
            case "image":
                x.imageSrc = m;
                break;
            case "image_dec":
                x.image_dec_src = m;
                break;
            case "image_inc":
                x.image_inc_src = m;
                break;
            case "space":
                x.spaceID = m;
                break;
            case "expresion":
                x.expresion = this.parser.parse(m.replace(")(", ","));
                break;
            case "borderColor":
                x[A] = "false" === g[m] ? "" : m;
                break;
            case "bold":
                "false" != g[m] && (x.bold = "bold");
                break;
            case "italics":
                "false" != g[m] && (x.italics = "italic");
                break;
            case "underlined":
                "false" != g[m] && (x.underlined = !0);
                break;
            case "value":
                var h = m.replace(/&squot;/g, "'");
                h.match(/^\|/) && (h = "'" + h.substring(1), h.match(/\|$/) && (h = h.substring(0, h.length - 1) + "'"));
                x.valueExpr = this.parser.parse(h);
                x.valueExprString = h;
                break;
            case "incr":
                0 != m && (x.incr = this.parser.parse(m));
                break;
            case "exponentialif":
                x.exponentialif = parseFloat(m);
                break;
            case "text":
                x.rawText = m;
                h = this.parseText(m);
                for (var e = 0, f = h.length; e < f; e++) h[e] = this.parser.parse(h[e], !1);
                x.text = h;
                break;
            default:
                e = n.indexOf("."), h = g[n.substring(0, e)], e = g[n.substring(e +
                    1)], "parameter" === h && "font" === e ? x.parameterFont = m : "Explanation" === h && "font" === e ? x.ExplanationFont = m : "tooltip" === h && "font" === e ? x.tooltipFont = m : console.warn("Propiedad de control no identificada: <" + n + "> valor: <" + m + ">")
        }
        return new a["Numeric" === x.type ? x.gui : x.type](this.parent, x)
    };
    S.prototype.parseGraphic = function(b, c, d, h) {
        y = { rotateExp: h, parameter: "t" };
        b = this.split(b);
        h = 0;
        for (var e = b.length; h < e; h++)
            if (n = b[h][0], m = b[h][1], A = g[n], a.DEBUG.paramName = n, a.DEBUG.objectName = "Graphic", "" != m) switch (A) {
                case "type":
                    a.DEBUG.idName =
                        m;
                    y[A] = v(g[m]);
                    break;
                case "align":
                case "anchor":
                case "lineDash":
                    y[A] = g[m];
                    break;
                case "background":
                case "abs_coord":
                case "visible":
                case "editable":
                case "fixed":
                case "vectors":
                case "bold":
                case "italics":
                case "underlined":
                    y[A] = "true" === g[m];
                    break;
                case "shadowColor":
                case "color":
                case "fill":
                case "fillP":
                case "fillM":
                case "arrow":
                case "trace":
                    y[A] = "false" === g[m] ? "" : new a.Color(m, this.parent.evaluator);
                    break;
                case "border_size":
                case "shadowBlur":
                case "shadowOffsetX":
                case "shadowOffsetY":
                case "family":
                case "parameter":
                case "info":
                case "font":
                case "font_family":
                case "name":
                case "init":
                case "end":
                    y[A] =
                        m;
                    break;
                case "drawif":
                case "width":
                case "decimals":
                case "size":
                case "spear":
                case "center":
                case "radius":
                case "border_radius":
                case "opacity":
                case "inirot":
                case "inipos":
                case "range":
                case "clip":
                    "" !== m && (y[A] = this.parser.parse(m));
                    break;
                case "font_size":
                    m = m.trim();
                    m.match(/^\[.*\]?/) && (m = m.substring(1, m.length - 1));
                    "" !== m && (y[A] = this.parser.parse(m));
                    break;
                case "space":
                    y.spaceID = m;
                    break;
                case "expresion":
                    "" !== m && ("Macro" !== y.type ? (y.expresion = this.parser.parse(m), y.expresionString = m) : y.expresion = m);
                    break;
                case "text":
                    y.text = m;
                    break;
                case "file":
                    var f = m.replace(/&squot;/g, "'");
                    "[" === f.charAt(0) && "]" === f.charAt(f.length - 1) && (f = f.substring(1, f.length - 1));
                    f.match(q) && (f = "'" + f + "'");
                    y.file = this.parser.parse(f);
                    break;
                case "border":
                    "" != m && "false" != g[m] && (y.border = new a.Color(m, this.parent.evaluator));
                    break;
                default:
                    if (void 0 != y.family && n.substring(0, y.family.length + 1) === y.family + ".") switch (g[n.substring(y.family.length + 1)]) {
                        case "interval":
                            "" != m && (y.family_interval = this.parser.parse(m));
                            break;
                        case "steps":
                            "" !=
                            m && (y.family_steps = this.parser.parse(m))
                    } else if (void 0 != y.parameter && n.match(y.parameter + ".")) switch (y.parameter !== n.substring(0, n.indexOf(y.parameter) + y.parameter.length) && (y.parameter = n.substring(0, n.indexOf(y.parameter) + y.parameter.length)), g[n.substring(y.parameter.length + 1)]) {
                        case "interval":
                            "" != m && (y.parameter_interval = this.parser.parse(m));
                            break;
                        case "steps":
                            "" != m && (y.parameter_steps = this.parser.parse(m))
                    } else console.warn("Propiedad del gr\u00e1fico no identificada: <" + n + "> valor: <" + m + ">")
            }
        c &&
            (y.abs_coord = c);
        d && (y.background = d);
        return new a[y.type](this.parent, y)
    };
    S.prototype.parse3DGraphic = function(b, c, d, h) {
        y = { rotateExp: h, parameter: "t" };
        b = this.split(b);
        c = 0;
        for (d = b.length; c < d; c++) switch (n = b[c][0], m = b[c][1], A = g[n], a.DEBUG.paramName = n, a.DEBUG.objectName = "Graphic3D", A) {
            case "type":
                a.DEBUG.idName = m;
                u = g[m];
                switch (u) {
                    case "cube":
                    case "box":
                    case "tetrahedron":
                    case "octahedron":
                    case "sphere":
                    case "dodecahedron":
                    case "icosahedron":
                    case "ellipsoid":
                    case "cone":
                    case "cylinder":
                    case "torus":
                    case "mesh":
                        y.subType =
                            u, u = "OtherGeometry"
                }
                y[A] = v(u);
                break;
            case "model":
            case "align":
            case "anchor":
            case "lineDash":
                y[A] = g[m];
                break;
            case "shadowColor":
            case "fill":
                y[A] = "false" === g[m] ? "" : new a.Color(m, this.parent.evaluator);
                break;
            case "background":
            case "fixed":
            case "split":
            case "bold":
            case "italics":
            case "underlined":
                y[A] = "true" === g[m];
                break;
            case "edges":
                "false" === g[m] ? y[A] = "" : ("true" === g[m] && (m = "808080"), y[A] = new a.Color(m, this.parent.evaluator));
                break;
            case "border":
                "" != m && "false" != g[m] && (y.border = new a.Color(m, this.parent.evaluator));
                break;
            case "color":
            case "backcolor":
                y[A] = new a.Color(m, this.parent.evaluator);
                break;
            case "drawif":
            case "width":
            case "length":
            case "height":
            case "R":
            case "r":
            case "decimals":
            case "Nu":
            case "Nv":
            case "inipos":
            case "endpos":
            case "offset_angle":
            case "offset_dist":
            case "font_size":
                "" != m && (y[A] = this.parser.parse(m));
                break;
            case "border_size":
            case "shadowBlur":
            case "shadowOffsetX":
            case "shadowOffsetY":
            case "family":
            case "parameter":
            case "font":
            case "font_family":
            case "name":
            case "inirot":
            case "endrot":
            case "info":
                y[A] =
                    m;
                break;
            case "space":
                y.spaceID = m;
                break;
            case "expresion":
                "Macro" != y.type && "Curve" != y.type && "Surface" != y.type ? (y.expresion = this.parser.parse(m), y.expresionString = m) : y.expresion = m.replace(/\\n/g, ";");
                break;
            case "text":
                y.text = m;
                break;
            case "file":
                h = m.replace(/&squot;/g, "'");
                "[" === h.charAt(0) && "]" === h.charAt(h.length - 1) && (h = h.substring(1, h.length - 1));
                h.match(/./) && (h = "'" + h + "'");
                y.file = this.parser.parse(h);
                break;
            default:
                void 0 !== y.family && n.substring(0, y.family.length + 1) === y.family + "." ? "interval" === g[n.substring(y.family.length +
                    1)] ? "" != m && (y.family_interval = this.parser.parse(m)) : "" != m && (y.family_steps = this.parser.parse(m)) : console.warn("Propiedad del gr\u00e1fico 3D no identificada: <" + n + "> valor: <" + m + ">")
        }
        return new a[y.type + "3D"](this.parent, y)
    };
    S.prototype.parseAuxiliar = function(b) {
        z = {};
        b = this.split(b);
        for (var c = 0, d = b.length; c < d; c++) b[c][1] = b[c][1].replace(/&squot;/g, "'");
        c = 0;
        for (d = b.length; c < d; c++) switch (n = b[c][0], m = b[c][1], A = g[n], a.DEBUG.paramName = n, a.DEBUG.objectName = "Auxiliar", A) {
            case "info":
            case "code":
            case "doc":
                break;
            case "id":
                a.DEBUG.idName = m;
            case "file":
            case "init":
            case "doExpr":
            case "whileExpr":
            case "range":
            case "local":
            case "expresion":
            case "condition":
            case "parameter":
                z[A] = m.replace(/&squot;/g, "'");
                break;
            case "editable":
            case "constant":
            case "array":
            case "matrix":
            case "algorithm":
            case "event":
            case "sequence":
                z[A] = "true" === g[m];
                break;
            case "size":
            case "rows":
            case "columns":
            case "x":
            case "y":
            case "width":
            case "height":
                z[A] = this.parser.parse(m);
                break;
            case "evaluate":
            case "execution":
            case "msg_pos":
            case "action":
            case "type":
                z[A] =
                    g[m];
                break;
            default:
                var h = n.indexOf("."),
                    e = g[n.substring(0, h)];
                h = g[n.substring(h + 1)];
                "parameter" === e && "font" === h ? z.parameterFont = m : console.warn("Propiedad del auxiliar no identificada: <" + n + "> valor: <" + m + ">")
        }
        z.sequence ? z.type = "sequence" : z.constant ? z.type = "constant" : z.algorithm && z.evaluate ? z.type = "algorithm" : z.array && !z.matrix && ")" != z.id.charAt(z.id.length - 1) ? z.type = "vector" : z.matrix && ")" != z.id.charAt(z.id.length - 1) ? z.type = "matrix" : z.event && ")" != z.id.charAt(z.id.length - 1) ? z.type = "event" : "library" ===
            z.type ? z.type = "library" : ")" === z.id.charAt(z.id.length - 1) ? z.type = "function" : z.type = "variable";
        a.DEBUG.typeName = z.type;
        switch (z.type) {
            case "sequence":
                new a.Function(this.parent, z);
                break;
            case "constant":
                b = new a.Constant(this.parent, z);
                z.evaluate && "always" === z.evaluate && this.parent.auxiliaries.push(b);
                break;
            case "algorithm":
                this.parent.auxiliaries.push(new a.Algorithm(this.parent, z));
                break;
            case "vector":
                b = new a.Vector(this.parent, z);
                z.evaluate && "always" === z.evaluate && this.parent.auxiliaries.push(b);
                break;
            case "matrix":
                b = new a.Matrix(this.parent, z);
                z.evaluate && "always" === z.evaluate && this.parent.auxiliaries.push(b);
                break;
            case "event":
                this.parent.events.push(new a.Event(this.parent, z));
                break;
            case "library":
                new a.Library(this.parent, z);
                break;
            case "variable":
                new a.Variable(this.parent, z);
                break;
            default:
                new a.Function(this.parent, z)
        }
    };
    S.prototype.parseAction = function(b) {
        G = b.action;
        J = b.parent;
        E = b.parameter;
        return G ? new(a[v(G)])(J, E) : { execute: function() {} }
    };
    S.prototype.parseAnimation = function(b) {
        var c = {};
        b = this.split(b);
        for (var d = 0, h = b.length; d < h; d++) switch (n = b[d][0], m = b[d][1], A = g[n], A) {
            case "id":
            case "delay":
            case "init":
            case "doExpr":
            case "whileExpr":
                c[A] = m.replace(/&squot;/g, "'");
                break;
            case "controls":
            case "auto":
            case "loop":
            case "algorithm":
            case "evaluate":
                c[A] = "true" === g[m];
                break;
            default:
                console.warn("Propiedad de la animaci\u00f3n no identificada: <" + n + ">  <" + m + ">")
        }
        return new a.Animation(this.parent, c)
    };
    S.prototype.parsePleca = function(g, q) {
        g = this.split(g);
        e = f = "";
        r = 0;
        p = "#536891";
        c = "white";
        k =
            "left";
        l = "";
        b = "SansSerif,BOLD,20";
        h = "SansSerif,PLAIN,18";
        d = void 0;
        for (var u = 0, v = g.length; u < v; u++) switch (n = g[u][0], m = g[u][1], n) {
            case "title":
                f = m;
                break;
            case "subtitle":
                e = m;
                break;
            case "subtitlines":
                r = m;
                break;
            case "bgcolor":
                "" != m && (p = (new a.Color(m, this.parent.evaluator)).getColor());
                break;
            case "fgcolor":
                "" != m && (c = (new a.Color(m, this.parent.evaluator)).getColor());
                break;
            case "align":
                "" != m && (k = m);
                break;
            case "titleimage":
                l = m;
                break;
            case "titlefont":
                b = "" != m ? a.convertFont(m) : a.convertFont(b);
                break;
            case "subtitlefont":
                h =
                    "" != m ? a.convertFont(m) : a.convertFont(h);
                break;
            default:
                console.warn("Propiedad de la pleca no identificada: <" + n + ">  <" + m + ">")
        }
        if ("" === f && "" === e) return a.newHTML("div");
        O = h.substring(0, h.indexOf("px"));
        O = O.substring(O.lastIndexOf(" "));
        "" != l && (H = this.parent.getImage(l), P = H.height);
        d = a.newHTML("div", { id: "descartesPleca" });
        P ? (d.setAttribute("style", "position:absolute;left:0;top:0;text-align:" + k + ";width:" + q + "px;height:" + P + "px;background-color:" + p + ";color:" + c + ";padding-top:8px;padding:8px 15px 8px 15px;margin:0;overflow:hidden;z-index:1;"),
            H.setAttribute("style", "position: absolute;left:0;top:0;z-index:-1;width:100%;height:100%;"), d.appendChild(H)) : d.setAttribute("style", "position:absolute;left:0;top:0;text-align:" + k + ";width:" + q + "px;background:" + p + ";color:" + c + ";padding:12px 15px 12px 15px;margin:0;z-index:100;");
        C = a.newHTML("div", { style: "padding:0;margin:0;font:" + b + ";overflow:hidden;white-space:nowrap;" });
        C.innerHTML = f;
        N = a.newHTML("div");
        if (1 === parseInt(r)) {
            V = 0;
            K = a.newHTML("div");
            K.innerHTML = e;
            document.body.appendChild(K);
            R = O;
            do R -=
                V, K.setAttribute("style", "padding:0;margin:0;font:" + h + ";font-size:" + R + "px;width:" + (q - 30) + "px;line-height:" + R + "px;"), Q = K.offsetHeight, W = Q / R, V = 1; while (1 < W && 8 < R);
            document.body.removeChild(K);
            N.setAttribute("style", "padding:0;margin:0;font:" + h + ";font-size:" + R + "px;line-height:1em;overflow:hidden;white-space:nowrap;")
        } else N.setAttribute("style", "padding:0;margin:0;font:" + h + ";line-height:1em;");
        N.innerHTML = e;
        d.appendChild(C);
        d.appendChild(N);
        d.imageHeight = P;
        return d
    };
    S.prototype.split = function(a) {
        if ("string" !==
            typeof a) return [];
        F = [];
        a = (a || "").replace(/\\'/g, "\u2019");
        D = B = I = 0;
        for (L = M = !1; D < a.length;) " " !== a.charAt(D) || L || D++, " " === a.charAt(D) || L || (L = !0, I = D), "=" !== a.charAt(D) || "'" !== a.charAt(D + 1) || M || (M = !0, F[B] = [a.substring(I, D)], I = D + 2, D += 2), M && "'" === a.charAt(D) && (L = M = !1, F[B].push(a.substring(I, D)), B++), "=" !== a.charAt(D) || "'" === a.charAt(D + 1) || M || (F[B] = [a.substring(I, D)], I = D + 1, D++, U = a.substring(D).indexOf("="), -1 === U ? T = U = a.length : (U += D, T = a.substring(D, U).lastIndexOf(" "), T = -1 === T ? a.length : T + D), F[B].push(a.substring(I,
            T)), B++, L = !1, D = T), D++;
        return F
    };
    S.prototype.parseText = function(b) { b = b || ""; return b.match(/^\{\\rtf1/) ? this.RTFparser.parse(b.substring(10)) : new a.SimpleText(this.parent, b) };
    a.LessonParser = S;
    return a
}(descartesJS || {}, babel);
descartesJS = function(a) {
    function g(a, b) {
        if (0 == b) return 1;
        if (0 > b) return NaN;
        if (0 <= a || k(b) === b) return Math.pow(a, b);
        if (0 > a) {
            var c = 1 / b,
                d = k(c);
            if (d === c && 1 === d % 2) return -Math.pow(-a, b)
        }
        return NaN
    }

    function f(a, b) {
        A = [];
        A.type = "matrix";
        A.rows = a;
        A.cols = b;
        m = 0;
        for (w = b; m < w; m++) A[m] = Array(a).fill(0);
        return A
    }

    function e(a, b) {
        q = a.rows;
        u = a.cols;
        A = f(q, u);
        var c;
        for (m = 0; m < q; m++)
            for (n = 0; n < u; n++) {
                for (w = c = 0; w < u; w++) c += a[w][m] * b[n][w];
                A[n][m] = c
            }
        return A
    }

    function r(a, b, c) {
        for (var d = f(c.length - 1, c.length - 1), h = 0, e = d.length; h <
            e; h++)
            for (var g = 0; g < e; g++) d[h][g] = h < a ? g < b ? c[h][g] : c[h][g + 1] : h < b ? c[h + 1][g] : c[h + 1][g + 1];
        return d
    }

    function p(a) { if (1 < a.cols) { for (var b = 0, c = 1, d = 0, h = a.cols; d < h; d++) b += c * a[0][d] * p(r(0, d, a)), c = -c; return b } return a[0][0] }
    if (a.loadLib) return a;
    var c = {},
        k = Math.floor,
        l, b, h, d, v, q, u, A, n, m, w, x = function(a, b) {
            this.sep = "";
            this.type = a;
            this.value = b;
            this.parent = null;
            this.childs = []
        };
    x.prototype.getRoot = function() { return null === this.parent ? this : this.parent.getRoot() };
    x.prototype.addChild = function(a) {
        a.parent = this;
        this.childs.push(a)
    };
    x.prototype.replaceLastChild = function(a) {
        h = this.childs.length - 1;
        b = this.childs[h];
        b.parent = null;
        this.childs[h] = a;
        a.parent = this;
        return a
    };
    x.prototype.contains = function(a) {
        if (this.value === a) return !0;
        for (var b = 0, c = this.childs.length; b < c; b++)
            if (this.childs[b].contains(a)) return !0;
        return !1
    };
    x.prototype.equalToMinus = function() {
        return "compOperator" === this.type ? (this.type = "operator", this.value = "-", v = new x("compOperator", "=="), v.addChild(this), v.addChild(new x("number", "0")), d = this.getRoot(), d.setAllEvalFun(),
            d) : this
    };
    x.prototype.getChildren = function() {
        if ("(expr)" === this.type || "[expr]" === this.type) {
            if (this.childArray) return this.childArray;
            this.childArray = [];
            for (var a = 0, b = this.childs.length; a < b; a++)
                if ("square_bracket" === this.childs[a].type || "parentheses" === this.childs[a].type) this.childArray = this.childArray.concat(this.childs[a].childs);
            return this.childArray
        }
        return null
    };
    x.prototype.setAllEvalFun = function() { this.setEvalFun(); for (var a = 0, b = this.childs.length; a < b; a++) this.childs[a].setAllEvalFun() };
    x.prototype.setEvalFun =
        function() {
            if ("number" === this.type) this.evaluate = function() { return parseFloat(this.value) };
            else if ("string" === this.type) this.evaluate = function() { return this.value.replace(/\\u0027/g, "'") };
            else if ("identifier" === this.type && 0 === this.childs.length)
                if ("rnd" === this.value) this.evaluate = function() { return Math.random() };
                else {
                    var b;
                    this.evaluate = function(a, c) {
                        b = a.variables[this.value];
                        if ("object" === typeof b && void 0 == b.length) return b.evaluate(a);
                        void 0 == b && (c || a.matrices[this.value] ? b = a.matrices[this.value] :
                            a.vectors[this.value] && (b = a.vectors[this.value]));
                        return void 0 !== b ? b : 0
                    }
                }
            else if ("identifier" === this.type && "square_bracket" === this.childs[0].type && 1 === this.childs[0].childs.length) {
                var d;
                this.evaluate = function(a) { try { return d = a.getVector(this.value, this.childs[0].childs[0].evaluate(a)), void 0 !== d ? d : 0 } catch (M) { return 0 } }
            } else if ("identifier" === this.type && "square_bracket" === this.childs[0].type && 1 < this.childs[0].childs.length) this.evaluate = function(a) {
                try {
                    return d = a.getMatrix(this.value, this.childs[0].childs[0].evaluate(a),
                        this.childs[0].childs[1].evaluate(a)), void 0 !== d ? d : 0
                } catch (M) { return 0 }
            };
            else if ("identifier" === this.type && "parentheses" === this.childs[0].type) {
                var h, v, w;
                this.evaluate = function(a) {
                    h = [];
                    for (var b = 0, d = this.childs[0].childs.length; b < d; b++) h[b] = this.childs[0].childs[b].evaluate(a);
                    if ("_Eval_" === this.value) {
                        l = 0 < h.length ? h[0] : 0;
                        if ("number" == typeof l) return "NaN";
                        l.match(",") && parseFloat(l.replace(",", ".")) == l.replace(",", ".") && (l = l.replace(",", "."));
                        if (void 0 == c[l]) {
                            v = l.match(/:=/g) ? !0 : !1;
                            if (l.match(";")) {
                                var e = !1,
                                    f = [],
                                    g = 0;
                                b = 0;
                                for (d = l.length; b < d; b++) {
                                    var m = l.charAt(b);
                                    "'" === m && (e = !e);
                                    e || ";" !== m || (f.push(l.substring(g, b)), g = b + 1)
                                }
                                f.push(l.substring(g));
                                l = "(" + f.join(")(") + ")"
                            }
                            c[l] = a.parser.parse(l, v)
                        }
                        w = a.eval(c[l]);
                        return void 0 != w ? w : NaN
                    }
                    return a.functions[this.value].apply(a, h)
                }
            } else if ("operator" === this.type) "+" === this.value ? this.evaluate = function(b) {
                    var c = this.childs[0].evaluate(b, !0);
                    b = this.childs[1].evaluate(b, !0);
                    if ("matrix" !== c.type || "matrix" !== b.type) return "number" == typeof c && "string" == typeof b ? c = a.removeNeedlessDecimals(c.toString()) :
                        "string" == typeof c && "number" == typeof b && (b = a.removeNeedlessDecimals(b.toString())), c + b;
                    q = c.rows;
                    u = c.cols;
                    A = f(q, u);
                    for (m = 0; m < q; m++)
                        for (n = 0; n < u; n++) A[n][m] = c[n][m] + b[n][m];
                    return A
                } : "-" === this.value ? this.evaluate = function(a) {
                    var b = this.childs[0].evaluate(a, !0);
                    a = this.childs[1].evaluate(a, !0);
                    if ("matrix" !== b.type || "matrix" !== a.type) return b - a;
                    q = b.rows;
                    u = b.cols;
                    A = f(q, u);
                    for (m = 0; m < q; m++)
                        for (n = 0; n < u; n++) A[n][m] = b[n][m] - a[n][m];
                    return A
                } : "*" === this.value ? this.evaluate = function(a) {
                    var b = this.childs[0].evaluate(a, !0);
                    a = this.childs[1].evaluate(a, !0);
                    return "matrix" !== b.type || "matrix" !== a.type ? b * a : e(b, a)
                } : "/" === this.value ? this.evaluate = function(a) {
                    var b = this.childs[0].evaluate(a, !0);
                    a = this.childs[1].evaluate(a, !0);
                    if ("matrix" !== b.type || "matrix" !== a.type) return b / a;
                    var c = f(a.length, a.length),
                        d = p(a);
                    if (0 === d) a = 0;
                    else {
                        d = 1 / d;
                        if (1 < a.length)
                            for (var h = 0, g = a.length; h < g; h++) {
                                var m = d;
                                for (var q = 0; q < g; q++) c[q][h] = m * p(r(h, q, a)), m = -m;
                                d = -d
                            } else c[0][0] = d;
                        a = c
                    }
                    b = 0 === a ? f(b.rows, b.cols) : e(b, a);
                    return b
                } : "%" === this.value ? this.evaluate =
                function(a) {
                    var b = this.childs[0].evaluate(a);
                    a = this.childs[1].evaluate(a);
                    return b - k(b / a) * a
                } : "^" === this.value && (this.evaluate = function(a) {
                    var b = this.childs[0].evaluate(a);
                    a = this.childs[1].evaluate(a);
                    return 0 <= a ? g(b, a) : 1 / g(b, -a)
                });
            else if ("compOperator" === this.type) "<" === this.value ? this.evaluate = function(a) { return +(this.childs[0].evaluate(a) < this.childs[1].evaluate(a)) } : "<=" === this.value ? this.evaluate = function(a) { return +(this.childs[0].evaluate(a) <= this.childs[1].evaluate(a)) } : ">" === this.value ? this.evaluate =
                function(a) { return +(this.childs[0].evaluate(a) > this.childs[1].evaluate(a)) } : ">=" === this.value ? this.evaluate = function(a) { return +(this.childs[0].evaluate(a) >= this.childs[1].evaluate(a)) } : "==" === this.value ? this.evaluate = function(a) {
                    var b = this.childs[0].evaluate(a);
                    a = this.childs[1].evaluate(a);
                    return "number" == typeof b && "number" == typeof a ? +(1E-8 > Math.abs(b - a)) : +(b === a)
                } : "!=" === this.value && (this.evaluate = function(a) {
                    var b = this.childs[0].evaluate(a);
                    a = this.childs[1].evaluate(a);
                    return "number" == typeof b &&
                        "number" == typeof a ? +!(1E-8 > Math.abs(b - a)) : +(b !== a)
                });
            else if ("boolOperator" === this.type) "&" === this.value ? this.evaluate = function(a) { return this.childs[0].evaluate(a) ? this.childs[1].evaluate(a) ? 1 : 0 : 0 } : "|" === this.value ? this.evaluate = function(a) { return this.childs[0].evaluate(a) ? 1 : this.childs[1].evaluate(a) ? 1 : 0 } : "!" === this.value && (this.evaluate = function(a) { return +!this.childs[0].evaluate(a) });
            else if ("conditional" === this.type) this.evaluate = function(a) {
                return 0 < this.childs[0].evaluate(a) ? this.childs[1].evaluate(a) :
                    this.childs[2] ? this.childs[2].evaluate(a) : 0
            };
            else if ("sign" === this.type) this.evaluate = "sign+" === this.value ? function(a) { return this.childs[0].evaluate(a) } : function(a) { return -this.childs[0].evaluate(a) };
            else if ("parentheses" === this.type) this.evaluate = function(a, b) { return this.childs[0].evaluate(a, b) };
            else if ("(expr)" === this.type || "[expr]" === this.type) this.evaluate = function(a) {
                var b = this.childs.length,
                    c = [];
                if (1 === b && 1 === this.childs[0].childs.length && "(expr)" === this.type) c = this.childs[0].childs[0].evaluate(a);
                else
                    for (var d = 0; d < b; d++) {
                        var h = [];
                        for (var e = 0, f = this.childs[d].childs.length; e < f; e++) h.push(this.childs[d].childs[e].evaluate(a));
                        c[d] = h
                    }
                return c
            };
            else if ("assign" === this.type) {
                var x, D = this.childs[0],
                    B = this.childs[1],
                    L = D.childs[0] ? D.childs[0].childs : null;
                this.evaluate = 1 === D.childs.length && "square_bracket" === D.childs[0].type && 1 === L.length ? function(a) {
                    x = B.evaluate(a);
                    a.setVector(D.value, L[0].evaluate(a), x);
                    return x
                } : 1 === D.childs.length && "square_bracket" === D.childs[0].type && 2 === L.length ? function(a) {
                    x =
                        B.evaluate(a);
                    a.setMatrix(D.value, L[0].evaluate(a), L[1].evaluate(a), x);
                    return x
                } : function(a) { x = B.evaluate(a); return x.type ? a.matrices[D.value] = x : "object" !== typeof a.variables[D.value] ? a.variables[D.value] = x : 0 }
            }
        };
    a.Node = x;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b = /^\s+/,
        h = /^[a-zA-Z_\u00C0-\u021B\u0391-\u03C9]+[a-zA-Z_0-9\u00C0-\u021B\u0391-\u03C9]*([.]*[0-9a-zA-Z_\u00C0-\u021B\u0391-\u03C9]+[0-9]*)*/,
        d = /^[0-9]+[.][0-9]+|^[.][0-9]+|^[0-9]+/,
        v = /^==|^!=|^<=|^<|^>=|^>|^#/,
        q = /^!|^~|^&&|^&|^\|\||^\|/,
        u = /^=|^:=/,
        A = /^[\?:]/,
        n = /^[\+\-\*\/%\^\u2212\u00b7\u00D7\u00F7]/,
        m = /^\[|^\]/,
        w = /^\(|^\)/,
        x = /^,/,
        y = /^;/,
        z = /\|/g,
        G = /\|\*/g,
        J = /\*\|/g,
        E, F = /rnd|pi|e|Infinity|-Infinity|sqr|sqrt|ra\u00edz|exp|log|log10|abs|ent|sgn|ind|sin|sen|cos|tan|cot|sec|csc|sinh|senh|cosh|tanh|coth|sech|csch|asin|asen|acos|atan|min|max/,
        D = function() {};
    D.prototype.tokenize = function(F) {
        function B(a, b, d) {
            f.push({ type: a, value: b });
            c = c.slice(d);
            r += d;
            l = a
        }
        if (g = F) {
            var D = F.indexOf("//");
            0 <= D && ":" !== F[D - 1] && (F = F.substring(0, D));
            F = F.replace(/\\u(\S+) /g, function(a, b) { return 39 !== parseInt(b, 16) ? String.fromCharCode(parseInt(b, 16)) : a });
            F = F.replace(/&sup(.+);/g, "^ $1 ");
            F = F.replace(/&squot;/g, "'");
            F.match(/=\|\*/g) && (F = F.replace(G, "'").replace(J, "'"));
            F.match(/=\|/g) && (F = F.replace(z, "'"));
            D = F.trim();
            "|" == D.charAt(0) && "|" == D.charAt(D.length - 1) &&
                (F = D.replace(z, "'"))
        }
        f = [];
        e = !1;
        r = 0;
        c = F;
        for (l = ""; F && r < F.length;)
            if (e = r, "'" == c[0]) {
                for (k = 1;
                    "'" != c[k];)
                    if (k < c.length) k++;
                    else { console.info(">Error, unknown symbol: [" + c + "], in the string \u300a" + g + "\u300b"); return }
                p = c.substring(1, k);
                B("string", p, p.length + 2)
            } else if (p = c.match(b)) c = c.slice(p[0].length), r += p[0].length;
        else if (p = c.match(n)) p[0] = p[0].replace(/\u00F7/g, "/").replace(/\u2212/g, "-").replace(/\u00b7/g, "*").replace(/\u00D7/g, "*"), B("operator", p[0], p[0].length);
        else if (p = c.match(h)) "number" === l &&
            f.push({ type: "operator", value: "*" }), B("identifier", p[0], p[0].length);
        else if (p = c.match(d)) B("number", p[0], p[0].length);
        else if (p = c.match(v)) D = p[0], "#" == D && (D = "!="), B("compOperator", D, p[0].length);
        else if (p = c.match(q)) D = p[0], "||" == D ? D = "|" : "&&" == D ? D = "&" : "~" == D && (D = "!"), B("boolOperator", D, p[0].length);
        else if ((p = c.match(u)) && !c.match(/^==/)) B("assign", p[0], p[0].length);
        else if (p = c.match(A)) B("conditional", p[0], p[0].length);
        else if (p = c.match(m)) B("square_bracket", p[0], p[0].length);
        else if (p = c.match(w)) "(" ==
            p && "number" === l && f.push({ type: "operator", value: "*" }), B("parentheses", p[0], p[0].length);
        else if (p = c.match(x)) B("separator", p[0], p[0].length);
        else if (178 === c.charCodeAt(0)) f.push({ type: "operator", value: "^" }), B("number", 2, 1);
        else if (179 === c.charCodeAt(0)) f.push({ type: "operator", value: "^" }), B("number", 3, 1);
        else if (p = c.match(y)) B("final_of_expression", p[0], p[0].length);
        else if (e == r) { a.DEBUG.setError(a.DEBUG.EXPRESSION, g); return }
        return f
    };
    D.prototype.flatTokens = function(a, b) {
        a = a || [];
        b = b || "";
        E = "";
        for (var c =
                0, d = a.length; c < d; c++) E = "string" == a[c].type ? E + "&squot;" + a[c].value + "&squot;" : "identifier" != a[c].type || a[c].value.match(F) ? E + a[c].value : E + b + a[c].value;
        return E
    };
    a.Tokenizer = D;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a) {
        switch (a) {
            case "=":
                return 1;
            case ":=":
                return 1;
            case "(":
                return 2;
            case "[":
                return 2;
            case "?":
                return 2;
            case ":":
                return 3;
            case "?:":
                return 3;
            case "|":
                return 6;
            case "&":
                return 7;
            case "<":
                return 5;
            case "<=":
                return 5;
            case ">":
                return 5;
            case ">=":
                return 5;
            case "==":
                return 5;
            case "!=":
                return 5;
            case "+":
                return 6;
            case "-":
                return 6;
            case "/":
                return 7;
            case "*":
                return 7;
            case "sign-":
                return 7;
            case "sign+":
                return 7;
            case "!":
                return 8;
            case "%":
                return 8;
            case "^":
                return 9;
            default:
                return 9
        }
    }

    function f(a) { return isNaN(parseFloat(a)) ? a.replace(/^\s|\s$/g, "").replace(/^'|'$/g, "") : parseFloat(a) == a ? parseFloat(a) : a.replace(/^\s|\s$/g, "").replace(/^'|'$/g, "") }
    if (a.loadLib) return a;
    a.reservedIds = new String("-_-rnd-pi-\u03c0-e-Infinity-isTouch-esT\u00e1ctil-screenOrientation-screenWidth-screenHeight-sqr-sqrt-ra\u00edz-exp-log-log10-abs-ent-sgn-ind-sin-sen-cos-tan-cot-sec-csc-sinh-senh-cosh-tanh-coth-sech-csch-asin-asen-acos-atan-atan2-floor-ceil-round-min-max-_Trace_-_Print_-_Num_-_Stop_Audios_-esCorrecto-escorrecto-parent.set-parent.update-parent.exec-toFixed-_NumToStr_-_NumACadena_-charAt-_charAt_-_letraEn_-substring-_substring_-_subcadena_-strLength-_length_-_longitud_-indexOf-_indexOf_-\u00edndiceDe-lastIndexOf-replace-_replace_-_reemplazar_-toLowerCase-toUpperCase-trim-_Load_-_GetValues_-_GetMatrix_-_MatrixToStr_-_StrToMatrix_-_GetVector_-_VectorToStr_-_StrToVector_-_ExecStr_-_ExecBlock_-_Save_-_Open_-_SaveState_-_OpenState_-_AnchoDeCadena_-_strWidth_-R-G-B-_Rojo_-_Red_-_Verde_-_Green_-_Azul_-_Blue_-DJS.typeof-");
    var e = Date.now(),
        r, p, c, k, l, b, h, d, v, q, u, A, n = function(b) {
            this.evaluator = b;
            this.tokenizer = new a.Tokenizer;
            this.vectors = {};
            this.matrices = {};
            this.variables = {};
            this.functions = {};
            this.definitions = {};
            this.registerDefaultValues();
            this.registerExternalValues && this.registerExternalValues()
        };
    n.prototype.setDefinition = function(a, b) { this.definitions[a] = b };
    n.prototype.getDefinition = function(a) { return this.definitions[a] };
    n.prototype.setVariable = function(a, b) { this.variables[a] = b };
    n.prototype.getVariable = function(a,
        b) { b && (this.variables[a] = void 0 !== this.variables[a] ? this.variables[a] : void 0); return this.variables[a] };
    n.prototype.setVector = function(a, b, c) { this.vectors[a][b] = c };
    n.prototype.getVector = function(a) { this.vectors.hasOwnProperty(a) || (this.vectors[a] = [0, 0, 0]); return this.vectors[a] };
    n.prototype.setMatrix = function(a, b, c, d) { this.matrices[a][b][c] = d };
    n.prototype.getMatrix = function(a) {
        this.matrices.hasOwnProperty(a) || (this.matrices[a] = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]);
        return this.matrices[a]
    };
    n.prototype.setFunction =
        function(a, b) { this.functions[a] = b };
    n.prototype.getFunction = function(a) { this.functions.hasOwnProperty(a) || (this.functions[a] = function() { return 0 }); return this.functions[a] };
    n.prototype.parse = function(e, f) {
        (c = this.tokenizer.tokenize(e)) || (c = []);
        k = null;
        f = !f || !1;
        r = d = h = b = 0;
        for (p = c.length; r < p; r++) {
            v = c[r];
            q = v.value;
            u = v.type;
            if ("identifier" === u)
                if (r + 1 < p && "parentheses" === c[r + 1].type && "(" === c[r + 1].value) this.getFunction(q);
                else if (r + 1 < p && "square_bracket" === c[r + 1].type && "[" === c[r + 1].value) c[r + 3] && "square_bracket" ===
                c[r + 3].type && "]" === c[r + 3].value ? this.getVector(q) : this.getMatrix(q);
            else {
                var m = q.match(/(\w*)\.mouse_x|(\w*)\.mouse_y|(\w*)\.mouse_pressed|(\w*)\.mouse_clicked|(\w*)\.clic_izquierdo/);
                m && (this.variables[(m[1] || m[2] || m[3] || m[4] || m[5]) + ".DESCARTESJS_no_fixed"] = 1);
                this.getVariable(q, !0)
            }
            "assign" === u && f && ":=" != q && (u = "compOperator", q = "==");
            if ("assign" === u)
                if (l = new a.Node(u, q), null != k)
                    if ("identifier" === k.type) k.parent && k.parent.replaceLastChild(l), l.addChild(k), k = l, f = !0;
                    else if ("square_bracket" === k.type) l.addChild(k.parent),
                k = l, f = !0;
            else {
                l.type = "compOperator";
                l.value = "==";
                for (f = !0; k.parent && g(k.parent.value) >= g(l.value);) k = k.parent;
                k.parent && k.parent.replaceLastChild(l);
                l.addChild(k);
                k = l
            } else { console.info("Error1: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break } else if ("parentheses" === u && "(" === q || "square_bracket" === u && "[" === q)
                if (l = new a.Node(u, q), "(" === q && b++, "[" === q && h++, null === k) "(" === q && (new a.Node("(expr)", "(expr)")).addChild(l), "[" === q && (new a.Node("[expr]", "[expr]")).addChild(l),
                    k = l;
                else if ("operator" === k.type || "boolOperator" === k.type || "compOperator" === k.type || "conditional" === k.type || "assign" === k.type) k.addChild(l), k = l;
            else if ("sign" === k.type) k.addChild(l), k = l;
            else if ("parentheses" === k.type && "(" === k.value) k.addChild(l), k = l;
            else if ("square_bracket" === k.type && "[" === k.value) k.addChild(l), k = l;
            else if ("parentheses" === k.type && "()" === k.value) k.parent.addChild(l), k = l;
            else if ("square_bracket" === k.type && "[]" === k.value) k.parent.addChild(l), k = l;
            else if ("identifier" === k.type) k.addChild(l),
                k = l;
            else { console.info("Error2: en la expresi\u00f3n \u300a " + e + " \u300b, en el token [" + r + "] {valor: " + q + ", tipo: " + u + "}"); break } else if ("parentheses" === u && ")" === q)
                if (b--, null === k) console.info("Error3: en la expresi\u00f3n \u300a " + e + " \u300b, en el token (valor:" + q + ", tipo:" + u);
                else {
                    for (; k && k.parent && ("(" != k.value || "(" == k.value && "parentheses" != k.type);) k = k.parent;
                    if (k && "(" === k.value) k.value = "()";
                    else break
                }
            else if ("square_bracket" === u && "]" === q)
                if (h--, null === k) console.info("Error5: en la expresi\u00f3n \u300a " +
                    e + " \u300b, en el token (valor:" + q + ", tipo:" + u);
                else {
                    for (; k && k.parent && ("[" != k.value || "[" == k.value && "square_bracket" != k.type);) k = k.parent;
                    if (k && "[" === k.value) k.value = "[]";
                    else { console.info("Error6: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break }
                }
            else if ("number" === u || "string" === u || "identifier" === u)
                if (l = new a.Node(u, q), null === k) k = l;
                else if ("operator" === k.type || "compOperator" === k.type || "boolOperator" === k.type || "parentheses" === k.type && "(" === k.value || "square_bracket" ===
                k.type && "[" === k.value || "sign" === k.type || "conditional" === k.type || "assign" === k.type) k.addChild(l), k = l;
            else { a.DEBUG.setError(a.DEBUG.EXPRESSION, e); break } else if ("operator" === u || "compOperator" === u || "boolOperator" === u)
                if (l = new a.Node(u, q), null === k)
                    if ("-" === q || "+" === q) l.type = "sign", l.value = "sign" + q, k = l;
                    else if ("!" === q) k = l;
            else { console.info("Error8: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break } else if ("operator" === k.type || "compOperator" === k.type || "boolOperator" ===
                k.type || "assign" === k.type || "conditional" === k.type || "square_bracket" === k.type && "[" === k.value && ("-" === q || "+" === q || "!" === q) || "parentheses" === k.type && "(" === k.value && ("-" === q || "+" === q || "!" === q)) {
                if ("-" === q || "+" === q) l.type = "sign", l.value = "sign" + q;
                k.addChild(l);
                k = l
            } else if ("number" === k.type || "parentheses" === k.type && "()" === k.value || "square_bracket" === k.type && "[]" === k.value || "string" === k.type || "identifier" === k.type || "conditional" === k.type || "assign" === k.type) {
                for (; k.parent && g(k.parent.value) >= g(l.value);) k =
                    k.parent;
                k.parent && k.parent.replaceLastChild(l);
                l.addChild(k);
                k = l
            } else { console.info("Error9: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break } else if ("conditional" === u)
                if (l = new a.Node(u, q), null != k)
                    if ("?" === l.value) {
                        for (d++; k.parent && g(k.parent.value) > g(l.value);) k = k.parent;
                        k.parent && k.parent.replaceLastChild(l);
                        l.addChild(k);
                        k = l
                    } else {
                        for (d--; k && k.parent && ("?" != k.value || "?" == k.value && "conditional" != k.type);) k = k.parent;
                        if (k && "?" === k.value) k.value = "?:";
                        else {
                            console.info("Error10: en la expresi\u00f3n \u300a " +
                                e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}");
                            break
                        }
                    }
            else { console.info("Error11: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break } else if ("separator" === u)
                if (null != k)
                    for (; k.parent && "(" != k.value && "[" != k.value;) k = k.parent;
                else { console.info("Error12: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break }
            else { console.info("Error13: en la expresi\u00f3n \u300a " + e + " \u300b, en el token {valor: " + q + ", tipo: " + u + "}"); break }
        }
        0 <
            b && a.DEBUG.setError(a.DEBUG.PARENTHESIS_CLOSING, e);
        0 > b && a.DEBUG.setError(a.DEBUG.PARENTHESIS_OPENING, e);
        0 < h && a.DEBUG.setError(a.DEBUG.BRACKET_CLOSING, e);
        0 > h && a.DEBUG.setError(a.DEBUG.BRACKET_OPENING, e);
        0 != d && a.DEBUG.setError(a.DEBUG.INCOMPLETE_IF, e);
        (A = k ? k.getRoot() : null) && A.setAllEvalFun();
        return A
    };
    n.prototype.registerDefaultValues = function() {
        var b = this;
        b.variables.rnd = Math.random;
        b.variables.pi = b.variables["\u03c0"] = a.returnValue(Math.PI);
        b.variables.e = a.returnValue(Math.E);
        b.variables.Infinity =
            Infinity;
        b.variables["-Infinity"] = -Infinity;
        b.variables.isTouch = b.variables["esT\u00e1ctil"] = a.hasTouchSupport ? 1 : 0;
        Object.defineProperties(b.variables, { screenOrientation: { get: function() { return window.matchMedia("(orientation: landscape)").matches ? "landscape" : "portrait" } }, screenWidth: { get: function() { return window.innerWidth } }, screenHeight: { get: function() { return window.innerHeight } } });
        b.functions.sqr = function(a) { return a * a };
        b.functions.sqrt = b.functions["ra\u00edz"] = Math.sqrt;
        b.functions.exp = Math.exp;
        b.functions.log = Math.log;
        b.functions.log10 = function(a) { return Math.log(a) / Math.log(10) };
        b.functions.abs = Math.abs;
        b.functions.ent = Math.floor;
        b.functions.sgn = function(a) { return 0 < a ? 1 : 0 > a ? -1 : 0 };
        b.functions.ind = function(a) { return a ? 1 : 0 };
        b.functions.sin = b.functions.sen = Math.sin;
        b.functions.cos = Math.cos;
        b.functions.tan = Math.tan;
        b.functions.cot = function(a) { return 1 / Math.tan(a) };
        b.functions.sec = function(a) { return 1 / Math.cos(a) };
        b.functions.csc = function(a) { return 1 / Math.sin(a) };
        b.functions.sinh = b.functions.senh =
            function(a) { return (Math.exp(a) - Math.exp(-a)) / 2 };
        b.functions.cosh = function(a) { return (Math.exp(a) + Math.exp(-a)) / 2 };
        b.functions.tanh = function(a) { return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a)) };
        b.functions.coth = function(a) { return 1 / b.functions.tanh(a) };
        b.functions.sech = function(a) { return 1 / b.functions.cosh(a) };
        b.functions.csch = function(a) { return 1 / b.functions.sinh(a) };
        b.functions.asin = b.functions.asen = Math.asin;
        b.functions.acos = Math.acos;
        b.functions.atan = Math.atan;
        b.functions.atan2 = Math.atan2;
        b.functions.floor = Math.floor;
        b.functions.ceil = Math.ceil;
        b.functions.round = Math.round;
        b.functions.min = Math.min;
        b.functions.max = Math.max;
        b.functions._Trace_ = b.functions._Print_ = function() { console.info.apply(console, arguments); return 0 };
        b.functions._Num_ = function(a) {
            if ("number" == typeof a) return "NaN";
            a = a.replace(",", ".");
            return parseFloat(a) == a ? parseFloat(a) : "NaN"
        };
        b.functions._Stop_Audios_ = function() { b.evaluator.parent.stopAudios() };
        b.functions.esCorrecto = function(c, d, h) {
            return a.esCorrecto(c, d, b.evaluator,
                h)
        };
        b.functions.escorrecto = function(c, d, h) { return a.escorrecto(c, d, b.evaluator, h) };
        window.parent !== window && (b.functions["parent.set"] = function(a, b) { window.parent.postMessage({ type: "set", name: a, value: b }, "*"); return 0 }, b.functions["parent.update"] = function() { window.parent.postMessage({ type: "update" }, "*"); return 0 }, b.functions["parent.exec"] = function(a, b) { window.parent.postMessage({ type: "exec", name: a, value: b }, "*"); return 0 });
        b.functions.toFixed = b.functions._NumToStr_ = b.functions._NumACadena_ = function(a,
            b) { a = isNaN(parseFloat(a)) ? 0 : parseFloat(a); return a.toFixed(parseInt(b || 0)) };
        b.functions.charAt = b.functions._charAt_ = b.functions._letraEn_ = function(a, b) {
            a = (a || "").toString();
            b = isNaN(parseInt(b)) ? 0 : parseInt(b);
            return a.charAt(b)
        };
        b.functions.substring = b.functions._substring_ = b.functions._subcadena_ = function(a, b, c) {
            a = (a || "").toString();
            b = isNaN(parseInt(b)) ? 0 : parseInt(b);
            c = isNaN(parseInt(c)) ? 0 : parseInt(c);
            return 0 <= b && 0 <= c ? a.substring(b, c) : 0 > b && 0 <= c ? a.substring(c) : 0 > c && 0 <= b ? a.substring(b) : ""
        };
        b.functions.strLength =
            b.functions._length_ = b.functions._longitud_ = function(a) { return (a || "").toString().length };
        b.functions.indexOf = b.functions._indexOf_ = b.functions["_\u00edndiceDe_"] = function(a, b) { return (a || "").toString().indexOf((b || "").toString()) };
        b.functions.lastIndexOf = function(a, b) { return (a || "").toString().lastIndexOf((b || "").toString()) };
        b.functions.replace = b.functions._replace_ = b.functions._reemplazar_ = function(a, b, c) {
            a = (a || "").toString();
            b = (b || "").toString();
            c = (c || "").toString();
            for (var d = a.indexOf(b); 0 <= d;) a =
                a.substring(0, d) + c + a.substring(d + b.length), d = a.indexOf(b, d + c.length);
            return a
        };
        b.functions.toLowerCase = function(a) { return (a || "").toString().toLowerCase() };
        b.functions.toUpperCase = function(a) { return (a || "").toString().toUpperCase() };
        b.functions.trim = function(a) { return (a || "").toString().trim() };
        b.functions._Load_ = function(b) {
            var c = "";
            b && (c = (c = document.getElementById(b)) && "descartes/archivo" == c.type ? c.text : a.openExternalFile(b));
            return c || ""
        };
        b.functions._GetValues_ = function(a, c) {
            return b.functions._ExecBlock_(b.functions._Load_(a).replace(/&brvbar;/g,
                String.fromCharCode("166")), c)
        };
        b.functions._GetMatrix_ = function(a, c) { return b.functions._StrToMatrix_(b.functions._Load_(a).replace(/&brvbar;/g, String.fromCharCode("166")), c) };
        b.functions._MatrixToStr_ = function(c) {
            var d = b.matrices[c];
            if (d) {
                for (var h = "<" + c + ">\\n", e = b.getVariable(c + ".columnas_usadas") || d.cols || 0, f = b.getVariable(c + ".filas_usadas") || d.rows || 0, g, q = 0; q < e; q++) {
                    for (var m = 0; m < f; m++) g = d[q][m], void 0 !== g && ("string" == typeof g ? g = "'" + g + "'" : "number" == typeof g && (g = a.removeNeedlessDecimals(g.toFixed(6))),
                        h += g + (m < f - 1 ? " \u00a6 " : ""));
                    h = h.replace(/(\u00A6 )$/g, "") + "\\n"
                }
                return h + "</" + c + ">"
            }
            return ""
        };
        b.functions._StrToMatrix_ = function(a, c) {
            var d = [],
                h = !1,
                e = !1;
            d.type = "matrix";
            if (a) {
                a = a.replace(/\r|\\r/g, "").split(/\n|\\n/);
                for (var g = 0, q = a.length; g < q; g++) a[g].match("<" + c + ">") ? (e = !0, h = a[g].trim().split("<" + c + ">"), 2 == h.length && "" != h[1] && d.push(h[1].split(String.fromCharCode("166")).map(f)), h = !0) : (a[g].match("</" + c + ">") && (h = a[g].trim().split("</" + c + ">"), 2 == h.length && "" != h[0] && d.push(h[0].split(String.fromCharCode("166")).map(f)),
                    h = !1, g = a.length), h && d.push(a[g].split(String.fromCharCode("166")).map(f)));
                b.matrices[c] = d;
                b.matrices[c].rows = d && d[0] && d[0].length ? d[0].length : 0;
                b.matrices[c].cols = d && d.length ? d.length : 0;
                b.setVariable(c + ".filas", b.matrices[c].rows);
                b.setVariable(c + ".columnas", b.matrices[c].cols)
            }
            return e ? "OK" : "ERROR"
        };
        b.functions._GetVector_ = function(a, c) { return b.functions._StrToVector_(b.functions._Load_(a), c) };
        b.functions._VectorToStr_ = function(a) {
            var c = b.vectors[a];
            if (c) {
                for (var d = "<" + a + ">\\n", h = b.getVariable(a +
                        ".long_usada") || c._size_ || 0, e, f = 0; f < h; f++) e = c[f], void 0 !== e ? ("number" == typeof e && (e = parseFloat(e)), d += e + "\\n") : d += "0\\n";
                return d + "</" + a + ">"
            }
            return ""
        };
        b.functions._StrToVector_ = function(a, c) {
            var d = [],
                h = !1,
                e = !1;
            d.type = "vector";
            if (a) {
                a = a.replace(/\r|\\r/g, "").split(/\n|\\n/);
                for (var g = 0, q = a.length; g < q; g++) a[g].match("<" + c + ">") ? h = e = !0 : (a[g].match("</" + c + ">") && (h = !1, g = a.length), h && d.push(f(a[g])));
                d._size_ = d.length;
                b.vectors[c] = d;
                b.setVariable(c + ".long", d.length);
                b.setVariable(c + ".long_usada", d.length)
            }
            return e ?
                "OK" : "ERROR"
        };
        b.functions._ExecStr_ = function(a) { return b.functions._ExecBlock_(a, "") };
        b.functions._ExecBlock_ = function(a, c) {
            var d = [],
                h = "" == c;
            if (a) {
                a = a.replace(/\r|\\r/g, "").split(/\n|\\n/);
                for (var e = 0, f = a.length; e < f; e++) a[e].match("<" + c + ">") ? (h = a[e].trim().split("<" + c + ">"), 2 == h.length && "" != h[1] && (d = d.concat(h[1].split(String.fromCharCode("166")))), h = !0) : a[e].match("</" + c + ">") ? (h = a[e].trim().split("</" + c + ">"), 2 == h.length && "" != h[0] && (d = d.concat(h[0].split(String.fromCharCode("166")))), h = !1) : h && (d = d.concat(a[e].split(String.fromCharCode("166"))));
                e = 0;
                for (f = d.length; e < f; e++) h = d[e].split("="), h[0] = h[0].trim(), 2 == h.length && "" != h[0] && (isNaN(parseFloat(h[1])) ? b.setVariable(h[0], h[1].replace(/^\s|\s$/g, "").replace(/^'|'$/g, "")) : b.setVariable(h[0], parseFloat(h[1])))
            }
            return 0
        };
        var c = a.newHTML("a", { target: "_blank" }),
            d, h = null;
        a.newBlobContent = null;
        b.functions._Save_ = function(f, g) {
            b.evaluator.parent.removeButtonClick();
            1500 < Date.now() - e && (e = Date.now(), document.body.appendChild(c), h = g.replace(/\\r/g, "").replace(/\\n/g, "\r\n").replace(/\\q/g, "'").replace(/\\_/g,
                "\\"), d = new Blob(["\ufeff", h], { type: "text/plain;charset=utf-8" }), c.setAttribute("href", window.URL.createObjectURL(d)), c.setAttribute("download", f), h != a.newBlobContent && (c.click(), a.newBlobContent = h), document.body.removeChild(c));
            return 0
        };
        var g = a.newHTML("a", { target: "_blank" });
        b.functions._SaveSpace_ = function(c, d) {
            b.evaluator.parent.removeButtonClick();
            1500 < Date.now() - e && (e = Date.now(), document.body.appendChild(g), h = d, g.setAttribute("href", h), g.setAttribute("download", c), h != a.newBlobContent && (g.click(),
                a.newBlobContent = h), document.body.removeChild(g));
            return 0
        };
        var q, l, k = a.newHTML("input", { type: "file" });
        k.addEventListener("change", function(c) {
            q = c.target.files;
            l = new FileReader;
            l.onload = function(c) {
                a.addExternalFileContent(q[0].name, c.target.result);
                b.setVariable("DJS.fileName", q[0].name);
                b.setVariable("DJS.fileContent", c.target.result);
                b.getFunction(b._callback) && (b.getFunction(b._callback).apply(b.evaluator, []), b.evaluator.parent.update());
                k.value = ""
            };
            0 < q.length && l.readAsText(q[0])
        });
        b.functions._Open_ =
            function(a) {
                b.evaluator.parent.removeButtonClick();
                1500 < Date.now() - e && (b._callback = a, k.click(), e = Date.now());
                return 0
            };
        b.functions._AnchoDeCadena_ = b.functions._strWidth_ = function(b, c, d, h) { return a.getTextWidth(b, a.convertFont(c + "," + d + "," + h)) };
        b.functions.R = b.functions._Rojo_ = b.functions._Red_ = function(b) { return (new a.Color(b)).r / 255 };
        b.functions.G = b.functions._Verde_ = b.functions._Green_ = function(b) { return (new a.Color(b)).g / 255 };
        b.functions.B = b.functions._Azul_ = b.functions._Blue_ = function(b) {
            return (new a.Color(b)).b /
                255
        };
        b.functions["DJS.typeof"] = function(a) { return a.rows ? "matrix" : a._size_ ? "vector" : typeof a }
    };
    a.Parser = n;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f = function(e) {
            this.parent = e;
            this.parser = new a.Parser(this);
            this.variables = this.parser.variables;
            this.functions = this.parser.functions;
            this.vectors = this.parser.vectors;
            this.matrices = this.parser.matrices;
            this.definitions = this.parser.definitions
        };
    f.prototype.setDefinition = function(a, f) { this.definitions[a] = f };
    f.prototype.getDefinition = function(a) { return this.definitions[a] };
    f.prototype.setVariable = function(a, f) { this.variables[a] = f };
    f.prototype.getVariable =
        function(a) { return this.variables[a] };
    f.prototype.setVector = function(a, f, p) {
        f = 0 > f ? 0 : g(f);
        this.vectors[a][f] = p
    };
    f.prototype.getVector = function(a, f) { f = 0 > f ? 0 : g(f); return this.vectors[a][f] };
    f.prototype.setMatrix = function(a, f, p, c) {
        f = 0 > f ? 0 : g(f);
        p = 0 > p ? 0 : g(p);
        void 0 == this.matrices[a][f] && (this.matrices[a][f] = []);
        this.matrices[a][f][p] = c
    };
    f.prototype.getMatrix = function(a, f, p) {
        f = 0 > f ? 0 : g(f);
        p = 0 > p ? 0 : g(p);
        return this.matrices[a][f][p]
    };
    f.prototype.setFunction = function(a, f) { this.functions[a] = f };
    f.prototype.getFunction =
        function(a) { return this.functions[a] };
    f.prototype.eval = function(a) { return a ? a.evaluate(this) : 0 };
    a.externalEvaluator = new f;
    a.Evaluator = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h, d, v, q, u, A, n = function(b, c) {
        this.parent = b;
        this.evaluator = b.evaluator;
        this.decimals = b.decimals;
        this.fixed = b.fixed;
        this.align = b.align || "left";
        this.anchor = b.anchor || "a_top_left";
        this.decimal_symbol = b.parent.decimal_symbol;
        this.w = this.h = 100;
        this.hasContent = "" !== c;
        this.textStr = (c || "").replace(/\\{/g, "\\curlyBracketOpen ").replace(/\\}/g, "\\curlyBracketClose ").replace(/\\\[/g, "\\squareBracketOpen ").replace(/\\\]/g, "\\squareBracketClose ");
        this.oldTextStr = this.oldWidth = this.oldSize = this.oldColor = this.oldPosX = this.oldPoxY = null;
        c.match(/^\{\\rtf1/) ? (this.type = "rtfNode", this.text = c, this.textNodes = (new a.RTFParser(b.evaluator)).parse(c.substring(10)), this.draw = this.drawRTF) : (this.descarTeXParser = new a.DescarTeXParser, this.text = this.parseSimpleText(this.textStr), this.textNodes = new a.TextNode("", "textLineBlock", null, null), this.draw = this.drawText)
    };
    n.prototype.drawText = function(b, d, h, q, l) {
        g = this.evaluator.eval(this.decimals);
        f = this.evaluator.eval(this.parent.width);
        e = this.evaluator.eval(this.parent.font_size);
        r = d.getColor ? d.getColor() : d;
        p = this.textToString(this.text, g, this.fixed).replace(/\\{/g, "\\curlyBracketOpen ").replace(/\\}/g, "\\curlyBracketClose ").replace(/\\\[/g, "\\squareBracketOpen ").replace(/\\\]/g, "\\squareBracketClose ");
        0 <= p.indexOf("[") && (p = this.textToString(this.parseSimpleText(p), g, this.fixed));
        if (this.oldTextStr !== p || this.oldWidth !== f || this.oldSize !== e || this.oldColor !== r || this.oldPosX !== h || this.oldPoxY !== q) c = new a.TextStyle({
            size: e,
            family: this.parent.font_family ||
                "arial",
            italic: this.parent.italics || !1,
            bold: this.parent.bold || !1,
            color: r,
            align: this.align,
            border: this.parent.border,
            border_size: this.parent.border_size,
            shadowBlur: this.parent.shadowBlur,
            shadowOffsetX: this.parent.shadowOffsetX,
            shadowOffsetY: this.parent.shadowOffsetY,
            shadowColor: this.parent.shadowColor || "transparent"
        }), this.textNodes = this.descarTeXParser.parse(p, this.evaluator, c), this.textNodes.update(h, q, g, this.fixed, this.align, this.anchor, r, f);
        l || this.textNodes.draw(b);
        this.oldTextStr = p;
        this.oldWidth =
            f;
        this.oldSize = e;
        this.oldColor = r;
        this.oldPosX = h;
        this.oldPoxY = q
    };
    n.prototype.drawRTF = function(a, b, c, d, h) {
        b = b.getColor ? b.getColor() : b;
        a.fillStyle = a.strokeStyle = b;
        a.textBaseline = "alphabetic";
        this.textNodes.style.align !== this.align && this.textNodes.propagateStyle("align", this.align);
        this.textNodes.update(c, d, this.evaluator.eval(this.decimals), this.fixed, this.align, this.anchor, b, this.evaluator.eval(this.parent.width));
        h || this.textNodes.draw(a)
    };
    n.prototype.parseSimpleText = function(a) {
        a = a.replace("&#x2013",
            "\u2013").replace(/&squot;/g, "'");
        k = [];
        l = "'";
        h = b = 0;
        d = -1;
        for (u = a.length; b < u;) v = a.charAt(b), q = a.charAt(b - 1), "[" === v && "\\" === q ? (k.push(a.substring(h, b - 1) + "["), h = b + 1) : "]" === v && "\\" === q ? (k.push(a.substring(h, b - 1) + "]"), h = b + 1) : "[" === v && -1 === d ? (k.push(a.substring(h, b)), h = b, d++) : "[" === v ? d++ : "]" === v && 0 === d ? (k.push(this.evaluator.parser.parse(a.substring(h, b + 1))), h = b + 1, d--) : ("]" == a.charAt(b) && (d = 0 > d ? d : d - 1), l += a.charAt(b)), b++;
        k.push(a.substring(h, b));
        return k
    };
    n.prototype.textToString = function(b, c, d) {
        l = "";
        if ("rtfNode" !==
            b.type)
            for (var h = 0, e = b.length; h < e; h++) "string" === typeof b[h] ? l += b[h] : (A = this.evaluator.eval(b[h])[0][0], "" !== A && ("string" === typeof A ? l += A : Infinity === A ? l += "Infinity" : -Infinity === A ? l += "-Infinity" : isNaN(A) || "NaN" === A ? l += "NaN" : (A = parseFloat(A), A = d ? A.toFixed(c) : a.removeNeedlessDecimals(A.toFixed(c)), l += A.toString().replace(".", this.decimal_symbol))));
        return l
    };
    a.TextObject = n;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f = function() {};
    f.prototype.tokenize = function(a) {
        a = a.replace(/\\n/g, "\\newline ");
        var e = [],
            f = null,
            c = 0,
            k = a.length;
        a.charAt(0);
        var l = !1,
            b = !1,
            h = 0;
        g = "";
        for (var d = 0; d < k; d++) {
            var v = a.charAt(d);
            var q = a.charAt(d + 1);
            "\\" === v && "$" === q && (b = !0);
            "{" === v ? h++ : "}" === v && (h--, b && 0 === h && (b = !1));
            b ? "_" === v ? "{" === q ? g += "\\subindex" : (g += "\\subindex{" + q + "}", d++) : "^" === v ? "{" === q ? g += "\\superindex" : (g += "\\superindex{" + q + "}", d++) : g += v : g += v
        }
        a = g;
        q = a.charAt(0);
        for (k = a.length; c <
            k;) v = q, q = a.charAt(c + 1), l && ("{" === v || "[" === v || "\\" === v || " " === v ? (l = !1, " " === v && (f = { type: "ignore" }, e.push(f))) : f.value += v), l || "\\" !== v ? l || "{" !== v && "[" !== v ? l || "}" !== v && "]" !== v ? l || (f && "text" === f.type ? f.value += v : f && "ignore" === f.type ? (e.pop(), f = e[e.length - 1]) : (f = { type: "text", value: v }, e.push(f))) : (f = { type: "close", value: v }, e.push(f)) : (f = { type: "open", value: v }, e.push(f)) : (l = !0, f = { type: "command", value: "" }, e.push(f)), c++;
        return e
    };
    a.DescarTeXTokenizer = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = function() { this.tokenizer = new a.DescarTeXTokenizer };
    g.prototype.parse = function(f, e, g) {
        f = this.tokenizer.tokenize(f);
        var p = new a.TextNode("", "textBlock", g, null),
            c = new a.TextNode("", "textLineBlock", g.clone(), null);
        p.addChild(c);
        for (var k = [], l = void 0, b = g, h = [g], d, v, q, u, r = !1, n = 0, m = f.length; n < m; n++)
            if ("text" === f[n].type)
                if ("color_parameter" === l) v = new a.Color(f[n].value, e);
                else if ("text_size_parameter" === l) q = parseFloat(f[n].value);
        else if ("textLineBlock" ===
            c.nodeType) { d = f[n].value.split(" "); for (var w = 0, x = d.length; w < x; w++) "" !== d[w] && c.addChild(new a.TextNode(d[w], "text", b.clone(), null)), w + 1 < x && c.addChild(new a.TextNode(" ", "space", b.clone(), null)) } else c.addChild(new a.TextNode(f[n].value, "text", b.clone(), null));
        else "command" === f[n].type && "curlyBracketOpen" === f[n].value ? c.addChild(new a.TextNode("{", "text", b.clone(), null)) : "command" === f[n].type && "curlyBracketClose" === f[n].value ? c.addChild(new a.TextNode("}", "text", b.clone(), null)) : "command" === f[n].type &&
            "squareBracketOpen" === f[n].value ? c.addChild(new a.TextNode("[", "text", b.clone(), null)) : "command" === f[n].type && "squareBracketClose" === f[n].value ? c.addChild(new a.TextNode("]", "text", b.clone(), null)) : "command" === f[n].type && "newline" === f[n].value ? (0 === c.children.length && c.addChild(new a.TextNode("", "text", b.clone(), null)), c = new a.TextNode("", "textLineBlock", g.clone(), null), p.addChild(c)) : "command" === f[n].type && "b" === f[n].value ? (l = "bold", k.push(l)) : "command" === f[n].type && "i" === f[n].value ? (l = "italic",
                k.push(l)) : "command" === f[n].type && "o" === f[n].value ? (l = "overline", k.push(l)) : "command" === f[n].type && "u" === f[n].value ? (l = "underline", k.push(l)) : "command" === f[n].type && "color" === f[n].value ? (l = "color", k.push(l)) : "command" === f[n].type && "ts" === f[n].value ? (l = "text_size", k.push(l)) : "command" === f[n].type && "sansserif" === f[n].value.toLowerCase() ? (l = "sansserif", k.push(l)) : "command" === f[n].type && "serif" === f[n].value.toLowerCase() ? (l = "serif", k.push(l)) : "command" === f[n].type && "monospace" === f[n].value.toLowerCase() ?
            (l = "monospace", k.push(l)) : "command" === f[n].type && "c" === f[n].value ? (l = "center", k.push(l)) : "command" === f[n].type && "l" === f[n].value ? (l = "left", k.push(l)) : "command" === f[n].type && "r" === f[n].value ? (l = "right", k.push(l)) : "command" === f[n].type && "j" === f[n].value ? (l = "justify", k.push(l)) : "command" === f[n].type && "$" === f[n].value ? (l = "formula", k.push(l), r = !0) : "command" === f[n].type && "sum" === f[n].value ? (l = "sum", k.push(l)) : "command" === f[n].type && "prod" === f[n].value ? (l = "prod", k.push(l)) : "command" === f[n].type && "int" ===
            f[n].value ? (l = "integral", k.push(l)) : "command" === f[n].type && "lim" === f[n].value ? (l = "limit", k.push(l)) : "command" === f[n].type && "sqrt" === f[n].value ? (l = "radical", k.push(l)) : "command" === f[n].type && "subindex" === f[n].value ? (l = "subIndex", k.push(l)) : "command" === f[n].type && "superindex" === f[n].value ? (l = "superIndex", k.push(l)) : "command" === f[n].type && "frac" === f[n].value ? (l = "numerator", k.push(l)) : "open" === f[n].type && "{" === f[n].value && void 0 !== l ? "bold" === l || "italic" === l || "overline" === l || "underline" === l ? (b = b.clone(),
                b[l] = !0, h.push(b)) : "sansserif" === l ? (b = b.clone(), b.family = "sansserif", h.push(b)) : "serif" === l ? (b = b.clone(), b.family = "serif", h.push(b)) : "monospace" === l ? (b = b.clone(), b.family = "monospaced", h.push(b)) : "text_size" === l ? l = "text_size_parameter" : "text_size_text" === l ? (b = b.clone(), b.size = q, h.push(b)) : "color" === l ? l = "color_parameter" : "color_text" === l ? (b = b.clone(), b.color = v, h.push(b)) : "center" === l || "left" === l || "right" === l || "justify" === l ? (b = b.clone(), b.align = l, h.push(b), c = new a.TextNode("", "textLineBlock", b.clone(),
                null), p.addChild(c)) : "formula" === l ? (b = b.clone(), h.push(b), u = new a.TextNode("", "formula", b.clone(), null), c.addChild(u), c = u) : "subIndex" === l || "superIndex" === l ? r ? (b = b.clone(), h.push(b), u = new a.TextNode("", l, b.clone(), null), c.addChild(u), c = u) : c.addChild(new a.TextNode("subIndex" === l ? "_" : "^", "text", b.clone(), null)) : "radical" === l ? r && (u = new a.TextNode("", "radical", b.clone(), null), c.addChild(u), c = u, b = b.clone(), h.push(b), u = new a.TextNode("", "index", b.clone(), null), c.addChild(u), c = u, l = "index") : "index" === l ? r &&
            (h.pop(), b = h[h.length - 1], u = new a.TextNode("", "radicand", b.clone(), null), c.addChild(u), c = u, l = "radicand") : "sum" === l || "integral" === l || "limit" === l || "prod" === l ? r && (u = new a.TextNode("", l, b.clone(), null), c.addChild(u), c = u, b = b.clone(), h.push(b), u = new a.TextNode("", "from", b.clone(), null), c.addChild(u), c = u, l = "from", k[k.length - 1] = l) : "from" === l ? r && (u = new a.TextNode("", "to", b.clone(), null), c.addChild(u), c = u, l = "to", k[k.length - 1] = l) : "to" === l ? r && (h.pop(), b = h[h.length - 1], u = new a.TextNode("", "what", b.clone(), null),
                c.addChild(u), c = u, l = "what", k[k.length - 1] = l) : "numerator" === l ? r && (u = new a.TextNode("", "fraction", b.clone(), null), c.addChild(u), c = u, b = b.clone(), h.push(b), u = new a.TextNode("", "numerator", b.clone(), null), c.addChild(u), c = u, l = "numerator") : "denominator" === l && (u = new a.TextNode("", l, b.clone(), null), c.addChild(u), c = u) : "close" === f[n].type && "}" === f[n].value && void 0 !== l && ("bold" === l || "italic" === l || "overline" === l || "underline" === l || "color_text" === l || "color" === l || "text_size_text" === l || "text_size" === l || "sansserif" ===
                l || "serif" === l || "monospace" === l ? (h.pop(), b = h[h.length - 1], k.pop(), l = k[k.length - 1]) : "color_parameter" === l ? l = "color_text" : "text_size_parameter" === l ? l = "text_size_text" : "center" === l || "left" === l || "right" === l || "justify" === l ? (h.pop(), b = h[h.length - 1], k.pop(), l = k[k.length - 1], f[n + 1] && "command" === f[n + 1].type && "newline" === f[n + 1].value ? c = p : (c = new a.TextNode("", "textLineBlock", b.clone(), null), p.addChild(c))) : "formula" === c.nodeType ? (r = !1, h.pop(), b = h[h.length - 1], k.pop(), l = k[k.length - 1], c = c.parent) : "subIndex" === c.nodeType ||
                "superIndex" === c.nodeType ? r && (h.pop(), b = h[h.length - 1], k.pop(), l = k[k.length - 1], c = c.parent) : "index" === c.nodeType ? c = c.parent : "radicand" === c.nodeType ? (k.pop(), l = k[k.length - 1], c = c.parent.parent) : "from" === c.nodeType ? c = c.parent : "to" === c.nodeType ? c = c.parent : "what" === c.nodeType ? (k.pop(), l = k[k.length - 1], c = c.parent.parent) : "numerator" === c.nodeType ? (l = "denominator", c = c.parent) : "denominator" === c.nodeType && (h.pop(), b = h[h.length - 1], k.pop(), l = k[k.length - 1], c = c.parent.parent));
        var y, z, G = null,
            J = [];
        p.children.forEach(function(a) {
            for (var b =
                    0, c = a.children.length; b < c - 1; b++) y = a.children[b], z = a.children[b + 1], "text" === y.nodeType && "text" === z.nodeType && y.style.equals(z.style) ? (null === G && (G = y, u = y.clone(), G.changeNodeType("word"), G.value = "___" + u.value, G.addChild(u)), u = z.clone(), G.addChild(u), J.push(z), G.value += u.value) : G = null
        });
        J.forEach(function(a) { a.parent.removeChild(a) });
        p.normalize();
        p.adjustFontSize();
        return p
    };
    a.DescarTeXParser = g;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f = function(a) {
        this.size = 20;
        this.family = "Arimo";
        this.overline = this.underline = this.bold = this.italic = !1;
        this.border = this.color = null;
        this.align = "left";
        a = a || {};
        this.set(a)
    };
    f.prototype.clone = function() { return new f(Object.assign({}, this)) };
    f.prototype.set = function(a) { Object.assign(this, a) };
    f.prototype.equals = function(a) {
        var e = !0,
            f;
        for (f in this) this.hasOwnProperty(f) && (e = e && this[f] === a[f]);
        return e
    };
    f.prototype.toString = function(e) {
        /arial|sansserif/i.test(this.family) ?
            g = a.sansserif_font : /times|serif/i.test(this.family) ? g = e ? a.math_font : a.serif_font : /courier|monospaced/i.test(this.family) && (g = a.monospace_font);
        return ((this.bold ? "bold" : "") + " " + (this.italic ? "italic" : "") + " " + this.size + "px " + g).trim()
    };
    a.TextStyle = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a, c) { for (var b = 0, h = 0; h < c; h++) b += a[h]; return b }

    function f(a) {
        var b = { ascent: 0, descent: 0, h: 0, w: 0, x: 0, y: 0, offsetX: 0, offsetY: 0, marginX: 0, marginY: 0, paddingX: 0, paddingY: 0 };
        if ("" == a.trim()) return b;
        var c = parseInt(a.match(/(\d+\.*)+px/)[0]);
        a = a.match("sansserif") ? "sansserif" : a.match("serif") ? "serif" : "monospace";
        b.ascent = Math.ceil((l[a].ascent + 25) * c / l[a].unitsPerEm);
        b.descent = Math.ceil(Math.abs((l[a].descent - 25) * c / l[a].unitsPerEm));
        b.h = b.ascent + b.descent;
        return b
    }
    if (a.loadLib) return a;
    var e = !1,
        r = "#000000",
        p = 2,
        c = !1;
    (new Path2D("m 759,1 c -8,0 -15,4 -20,14 L 325,878 153,500 c -5,-11 -11,-14 -17,-9 L 2,596 c -5,4 17,30 22,26 l 65,-47 193,422 c 3,6 27,6 32,-4 L 773,40 V 1 Z")).svgData = "m 759,1 c -8,0 -15,4 -20,14 L 325,878 153,500 c -5,-11 -11,-14 -17,-9 L 2,596 c -5,4 17,30 22,26 l 65,-47 193,422 c 3,6 27,6 32,-4 L 773,40 V 1 Z";
    (new Path2D("M 780,707 H 750 C 728,805 695,872 585,872 H 180 L 509,447 225,65 h 313 c 130,0 167,49 188,181 h 30 V 0 H 25 L 384,500 0,1000 h 729 z")).svgData =
        "M 780,707 H 750 C 728,805 695,872 585,872 H 180 L 509,447 225,65 h 313 c 130,0 167,49 188,181 h 30 V 0 H 25 L 384,500 0,1000 h 729 z";
    (new Path2D("m 150,828 c -21,88 -42,144 -83,144 -6,0 -9,-2 -9,-6 0,-9 15,-8 15,-34 0,-14 -13,-22 -27,-22 -24,0 -45,22 -45,51 0,20 21,39 56,39 97,0 141,-105 159,-176 L 375,181 c 23,-91 45,-154 89,-153 6,0 9,2 9,6 0,7 -15,13 -15,35 0,14 13,20 27,20 24,0 45,-22 45,-51 C 530,18 508,0 473,0 368,0 326,120 309,190 Z")).svgData = "m 150,828 c -21,88 -42,144 -83,144 -6,0 -9,-2 -9,-6 0,-9 15,-8 15,-34 0,-14 -13,-22 -27,-22 -24,0 -45,22 -45,51 0,20 21,39 56,39 97,0 141,-105 159,-176 L 375,181 c 23,-91 45,-154 89,-153 6,0 9,2 9,6 0,7 -15,13 -15,35 0,14 13,20 27,20 24,0 45,-22 45,-51 C 530,18 508,0 473,0 368,0 326,120 309,190 Z";
    (new Path2D("m 876.3561,999.59384 v -27.38613 h -17.60537 c -64.55302,0 -96.82952,-41.07919 -96.82952,-124.21565 V 144.75542 c 0,-83.136456 27.38612,-117.369116 114.43489,-117.369116 V 1.7633057e-4 H 1.184082e-5 V 27.386304 H 16.627304 c 60.640711,0 98.785676,24.4519 98.785676,121.281426 v 716.9297 c 0,71.39954 -31.298433,106.61028 -96.829524,106.61028 H 1.184082e-5 v 27.38613 H 359.93198 v -27.38613 h -30.32036 c -64.55302,0 -86.07069,-40.10112 -86.07069,-131.06218 V 64.553192 H 633.79325 V 841.14553 c 0,75.31185 -17.60537,131.06218 -86.07068,131.06218 h -31.29844 v 27.38613 z")).svgData =
        "m 876.3561,999.59384 v -27.38613 h -17.60537 c -64.55302,0 -96.82952,-41.07919 -96.82952,-124.21565 V 144.75542 c 0,-83.136456 27.38612,-117.369116 114.43489,-117.369116 V 1.7633057e-4 H 1.184082e-5 V 27.386304 H 16.627304 c 60.640711,0 98.785676,24.4519 98.785676,121.281426 v 716.9297 c 0,71.39954 -31.298433,106.61028 -96.829524,106.61028 H 1.184082e-5 v 27.38613 H 359.93198 v -27.38613 h -30.32036 c -64.55302,0 -86.07069,-40.10112 -86.07069,-131.06218 V 64.553192 H 633.79325 V 841.14553 c 0,75.31185 -17.60537,131.06218 -86.07068,131.06218 h -31.29844 v 27.38613 z";
    var k = function(b, c, d, e) {
        this.type = "rtfNode";
        this.evaluator = e;
        this.parent = null;
        this.children = [];
        this.metrics = { ascent: 0, descent: 0, h: 0, w: 0, x: 0, y: 0, offsetX: 0, offsetY: 0, marginX: 0, marginY: 0, paddingX: 0, paddingY: 0 };
        this.value = b;
        this.style = d;
        this.changeNodeType(c);
        this.drawBorder = a.in_editor ? this.drawBorderSpecial : function() {}
    };
    k.prototype.changeNodeType = function(a) {
        this.nodeType = a;
        this.draw = null;
        switch (this.nodeType) {
            case "textBlock":
                this.draw = this.drawTextBlock;
                break;
            case "textLineBlock":
                this.draw = this.drawTextLineBlock;
                break;
            case "formula":
                this.draw = this.drawFormula;
                break;
            case "superIndex":
                this.draw = this.drawSuperIndex;
                break;
            case "subIndex":
                this.draw = this.drawSubIndex;
                break;
            case "dynamicText":
                this.draw = this.drawDynamicText;
                this.decimal_symbol = this.evaluator.parent.decimal_symbol;
                break;
            case "fraction":
                this.draw = this.drawFraction;
                break;
            case "numerator":
            case "denominator":
                this.draw = this.drawNumDen;
                break;
            case "radical":
                this.draw = this.drawRadical;
                break;
            case "limit":
                this.draw = this.drawLimit;
                break;
            case "integral":
                this.draw =
                    this.drawIntegral;
                break;
            case "prod":
                this.draw = this.drawProd;
                break;
            case "sum":
                this.draw = this.drawSum;
                break;
            case "matrix":
                this.draw = this.drawMatrix;
                break;
            case "defparts":
                this.draw = this.drawDefparts;
                break;
            case "text":
            case "newLine":
            case "mathSymbol":
                this.draw = this.drawText;
                break;
            case "space":
                this.draw = this.drawSpace;
                break;
            case "word":
                this.draw = this.drawWord;
                break;
            case "hyperlink":
                this.draw = this.drawHyperlink;
                break;
            case "index":
            case "radicand":
            case "from":
            case "to":
            case "what":
            case "element":
                this.draw =
                    this.drawGenericBlock;
                break;
            case "componentNumCtrl":
                this.draw = this.drawComponentNumCtrl;
                break;
            case "componentSpace":
                this.draw = this.drawComponentSpace
        }
    };
    k.prototype.clone = function() { for (var a = new k(this.value, this.nodeType, this.style.clone()), c = 0, d = this.children.length; c < d; c++) a.addChild(this.children[c].clone()); return a };
    k.prototype.toStr = function() { for (var a = this.value, c = 0, d = this.children.length; c < d; c++) a += " " + this.children[c].toStr(); return a };
    k.prototype.stringify = function() {
        var a = "{" + ('"NT":"' +
            this.nodeType + '",');
        a += '"V":"' + (this.value || "") + '",';
        a += '"C":[';
        for (var c = 0, d = this.children.length; c < d; c++) a += this.children[c].stringify() + (c == d - 1 ? "" : ",");
        a = a + "]," + ('"S":' + JSON.stringify(this.style));
        return a + "}"
    };
    k.prototype.addChild = function(a, c) {
        c && null !== a.parent && a.parent.removeChild(a);
        a.parent = this;
        this.children.push(a)
    };
    k.prototype.removeChild = function(a) { var b = this.children.indexOf(a); - 1 !== b && (a.parent = null, this.children.splice(b, 1)) };
    k.prototype.getFirstTextNode = function() {
        for (var a = this; 0 <
            a.children.length;) a = a.children[0];
        return a
    };
    k.prototype.getLastTextNode = function() { for (var a = this; 0 < a.children.length;) a = a.children[a.children.length - 1]; return a };
    k.prototype.nextSibling = function() {
        if (this.parent)
            for (var a = null, c = 0, d = this.parent.children.length; c < d; c++) {
                if (a) return this.parent.children[c];
                this.parent.children[c] === this && (a = !0)
            }
        return null
    };
    k.prototype.prevSibling = function() {
        if (this.parent)
            for (var a = 0, c = this.parent.children.length - 1; a < c; a++)
                if (this.parent.children[a + 1] === this) return this.parent.children[a];
        return null
    };
    k.prototype.queryAll = function(a) {
        var b = [];
        "string" === typeof a && (a = new RegExp(a));
        for (var c = 0, e = this.children.length; c < e; c++) b = b.concat(this.children[c].queryAll(a));
        this.nodeType.match(a) && b.push(this);
        return b
    };
    k.prototype.insertBefore = function(a, c) { a = this.children.indexOf(a); - 1 !== a && (c.parent = this, this.children.splice(a, 0, c)) };
    k.prototype.insertAfter = function(a, c) { a = this.children.indexOf(a); - 1 !== a && (c.parent = this, this.children.splice(a + 1, 0, c)) };
    k.prototype.normalize = function() {
        for (var a =
                this.queryAll(/textLineBlock|formula|numerator|denominator|superIndex|subIndex|index|subIndex|radicand|from|to|what|element/), c = 0, d = a.length; c < d; c++) 0 === a[c].children.length && a[c].addChild(new k("", "text", a[c].style));
        a = this.queryAll(/formula|fraction|superIndex|subIndex|radical|sum|integral|prod|limit|matrix|defparts|dynamicText|componentNumCtrl|componentSpace/);
        c = 0;
        for (d = a.length; c < d; c++) {
            var e = a[c];
            (null === e.prevSibling() || null !== e.prevSibling() && "text" !== e.prevSibling().nodeType) && e.parent.insertBefore(e,
                new k("", "text", e.parent.style));
            (null === e.nextSibling() || null !== e.nextSibling() && "text" !== e.nextSibling().nodeType) && e.parent.insertAfter(e, new k("", "text", e.parent.style))
        }
        return this
    };
    k.prototype.removeEmptyText = function() { for (var a = this.queryAll(/text/), c = 0, d = a.length; c < d; c++) "" === a[c].value && a[c].parent && a[c].parent.removeChild(a[c]) };
    k.prototype.adjustFontSize = function(a) {
        var b = this.style.size;
        "formula" === this.nodeType && (a = !0);
        for (var c = 0, e = this.children.length; c < e; c++) "text" === this.children[c].nodeType &&
            a ? (this.children[c].style.size = b, this.children[c].styleString = this.children[c].style.toString()) : "index" === this.children[c].nodeType ? (this.children[c].style.size = Math.max(parseInt(b - .5 * b), 8), this.children[c].styleString = this.children[c].style.toString(), this.children[c].adjustFontSize(!0)) : "to" === this.children[c].nodeType || "from" === this.children[c].nodeType ? (this.children[c].style.size = Math.max(parseInt(b - .2 * b), 8), this.children[c].styleString = this.children[c].style.toString(), this.children[c].adjustFontSize(!0)) :
            "numerator" === this.children[c].nodeType || "denominator" === this.children[c].nodeType ? (this.children[c].style.size = Math.max(parseInt(b - .1 * b), 8), this.children[c].styleString = this.children[c].style.toString(), this.children[c].adjustFontSize(!0)) : "subIndex" === this.children[c].nodeType || "superIndex" === this.children[c].nodeType ? (this.children[c].style.size = Math.max(parseInt(b - .33 * b), 8), this.children[c].styleString = this.children[c].style.toString(), this.children[c].adjustFontSize(!0)) : (a && (this.children[c].style.size =
                b, this.children[c].styleString = this.children[c].style.toString()), this.children[c].adjustFontSize(a))
    };
    k.prototype.propagateStyle = function(a, c) {
        this.style[a] = c;
        this.styleString = this.style.toString();
        for (var b = 0, h = this.children.length; b < h; b++) this.children[b].propagateStyle(a, c)
    };
    k.prototype.update = function(a, h, d, e, f, g, l, k) {
        p = d;
        c = e;
        r = l;
        this.metrics.w = this.metrics.h = 0;
        l = h;
        if (20 <= k)
            for (d = 0; d < this.children.length; d++) this.children[d].breakLines(k);
        d = 0;
        for (e = this.children.length; d < e; d++) {
            var b = this.children[d];
            b.updateLine();
            b.metrics.offsetX = a;
            b.metrics.y = h;
            h += parseInt(b.metrics.ascent + .5);
            b.metrics.offsetY = h;
            f = parseInt(b.metrics.descent + .5) + parseInt(1.5 + .05 * b.style.size);
            h += f;
            this.metrics.h += b.metrics.h;
            this.metrics.w = Math.max(this.metrics.w, b.metrics.w)
        }
        h = l;
        g = g || "";
        g.match("right") ? a -= this.metrics.w : g.match("_center") && (a -= this.metrics.w / 2);
        g.match("bottom") ? h -= this.metrics.h : g.match("center_") && (h -= this.metrics.h / 2);
        g = this.children;
        d = 0;
        for (e = g.length; d < e; d++) "left" === g[d].style.align ? g[d].metrics.offsetX =
            a : "right" === g[d].style.align ? g[d].metrics.offsetX = a + this.metrics.w - g[d].metrics.w : "center" === g[d].style.align ? g[d].metrics.offsetX = a + (this.metrics.w - g[d].metrics.w) / 2 : "justify" === g[d].style.align && 20 <= k && (f = d < e - 1 ? g[d + 1].value : null, g[d].metrics.offsetX = a, "wrap" === f && g[d].justifyAux(k)), g[d].metrics.y = h, h += parseInt(g[d].metrics.ascent + .5), g[d].metrics.offsetY = h, f = parseInt(g[d].metrics.descent + .5) + parseInt(1.5 + .05 * g[d].style.size), h += f
    };
    k.prototype.breakLines = function(b) {
        for (var c, d = 0, e = !1, f = [], g = 0,
                l = this.children.length; g < l; g++) c = this.children[g], e ? f.push(c) : ("text" === c.nodeType || "space" === c.nodeType ? (a.ctx.font = c.style.toString(), c.metrics.w = a.ctx.measureText(c.value).width) : "word" === c.nodeType ? c.updateLine() : "formula" === c.nodeType && c.updateFormula(), d += c.metrics.w, d > b && "space" !== c.nodeType && 0 < g && (e = !0, f.push(c)));
        if (0 < f.length)
            for (b = new k("wrap", "textLineBlock", this.style.clone(), null), this.parent.insertAfter(this, b), g = 0, l = f.length; g < l; g++) f[g].parent && f[g].parent.removeChild(f[g]), b.addChild(f[g])
    };
    k.prototype.updateLine = function(b) {
        var c = this;
        if ("textLineBlock" === this.nodeType || "word" === this.nodeType) {
            this.metrics.w = 0;
            this.metrics.ascent = 0;
            for (var d = this.metrics.descent = 0, e = this.children, g, l = 0, k = e.length; l < k; l++) {
                g = e[l];
                if ("text" === g.nodeType) {
                    a.ctx.font = g.style.toString();
                    var n = "" !== g.value ? g.value : a.in_editor ? "\u200a" : "";
                    g.metrics = f(a.ctx.font);
                    g.metrics.w = a.ctx.measureText(n).width;
                    g.metrics.offsetX = d;
                    Object.defineProperties(g.metrics, {
                        x: { get: function() { return c.metrics.offsetX + this.offsetX } },
                        y: { get: function() { return c.metrics.offsetY + this.offsetY } }
                    })
                }
                "space" === g.nodeType ? (a.ctx.font = g.style.toString(), g.metrics = f(a.ctx.font), g.metrics.w = l === k - 1 ? 0 : b ? b : a.ctx.measureText(" ").width, g.metrics.offsetX = d, Object.defineProperties(g.metrics, { x: { get: function() { return c.metrics.offsetX + this.offsetX } }, y: { get: function() { return c.metrics.offsetY + this.offsetY } } })) : "word" === g.nodeType && (g.updateLine(), g.metrics.offsetX_aux = d, Object.defineProperties(g.metrics, {
                    offsetX: {
                        get: function() {
                            return c.metrics.offsetX +
                                this.offsetX_aux
                        }
                    },
                    offsetY: { get: function() { return c.metrics.offsetY } }
                }));
                "hyperlink" === g.nodeType && (a.ctx.font = g.styleString, n = "" !== g.value ? g.value : a.in_editor ? "\u200a" : "", g.metrics = f(a.ctx.font), g.metrics.w = a.ctx.measureText(n).width, g.metrics.offsetX = d, Object.defineProperties(g.metrics, { x: { get: function() { return c.metrics.offsetX + this.offsetX } }, y: { get: function() { return c.metrics.offsetY } } }), g.clickCatcher || (g.clickCatcher = a.newHTML("div", {
                    style: "position:absolute;width:" + g.metrics.w + "px;height:" +
                        g.metrics.h + "px;cursor:pointer;"
                }), g.clickCatcher.rtfNode = g, g.clickCatcher.action = new a.OpenURL(this.evaluator.parent, g.URL), g.clickCatcher.addEventListener("click", function(a) {
                    this.rtfNode.click = !0;
                    this.action.execute();
                    this.rtfNode.draw(this.rtfNode.ctx)
                })));
                "componentNumCtrl" === g.nodeType && (g.componentNumCtrl = this.evaluator.parent.getControlByCId(g.value), a.ctx.font = g.styleString, g.metrics = f(a.ctx.font), g.metrics.w = g.componentNumCtrl.w, g.metrics.h = g.componentNumCtrl.h, g.metrics.offsetX = d, Object.defineProperties(g.metrics, { x: { get: function() { return c.metrics.offsetX + this.offsetX } }, y: { get: function() { return c.metrics.offsetY } } }));
                "componentSpace" === g.nodeType ? (g.componentSpace = this.evaluator.parent.getSpaceByCId(g.value), a.ctx.font = g.styleString, g.metrics = f(a.ctx.font), g.metrics.w = g.componentSpace.w, g.metrics.h = g.componentSpace.h, g.metrics.offsetX = d, Object.defineProperties(g.metrics, { x: { get: function() { return c.metrics.offsetX + this.offsetX } }, y: { get: function() { return c.metrics.offsetY } } })) : "formula" === g.nodeType && (g.updateFormula(),
                    g.metrics.marginX = g.metrics.marginY = g.metrics.paddingX = g.metrics.paddingY = 0, g.metrics.offsetX_aux = d, Object.defineProperties(g.metrics, { x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return c.metrics.offsetX + this.marginX + this.offsetX_aux } }, offsetY: { get: function() { return c.metrics.offsetY } } }), g.metrics.w += 2 * g.metrics.paddingX, g.metrics.ascent += g.metrics.paddingY, g.metrics.descent += g.metrics.paddingY, g.metrics.h += 2 * g.metrics.paddingY, d += 2 * g.metrics.marginX);
                this.metrics.w += g.metrics.w + 2 * g.metrics.marginX;
                this.metrics.ascent = Math.max(this.metrics.ascent, g.metrics.ascent);
                this.metrics.descent = Math.max(this.metrics.descent, g.metrics.descent);
                d += g.metrics.w
            }
            this.metrics.h = this.metrics.ascent + this.metrics.descent
        }
    };
    k.prototype.updateFormula = function() {
        var b = this;
        this.metrics = { ascent: 0, descent: 0, h: 0, w: 0, x: 0, y: 0, offsetX: 0, offsetY: 0, marginX: 0, marginY: 0, paddingX: 0, paddingY: 0 };
        for (var h = this.children, d, e = 0, l = {
                metrics: {
                    ascent: 0,
                    descent: 0,
                    h: 0,
                    w: 0,
                    x: 0,
                    y: 0,
                    offsetX: 0,
                    offsetY: 0,
                    marginX: 0,
                    marginY: 0,
                    paddingX: 0,
                    paddingY: 0
                }
            }, k = 0, r = h.length; k < r; k++) {
            d = h[k];
            if ("text" === d.nodeType) {
                a.ctx.font = d.style.toString(!0);
                var n = "" !== d.value ? d.value : a.in_editor ? "\u200a" : "";
                d.metrics = f(a.ctx.font);
                d.metrics.w = a.ctx.measureText(n).width;
                d.metrics.offsetX = e;
                Object.defineProperties(d.metrics, { x: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.offsetX } }, y: { get: function() { return b.metrics.offsetY } } });
                e += b.metrics.marginX
            } else if ("dynamicText" === d.nodeType) {
                n = void 0 ===
                    d.decimals ? p : d.evaluator.eval(d.decimals);
                var m = void 0 === d.fixed ? c : d.fixed,
                    w = d.evaluator.eval(d.value);
                parseFloat(w).toString() === w.toString() && (w = m ? parseFloat(w).toFixed(n) : a.removeNeedlessDecimals(parseFloat(w).toFixed(n)), w = ("" + w).replace(".", d.decimal_symbol));
                d.evalValue = w;
                a.ctx.font = d.style.toString(!0);
                d.metrics = f(a.ctx.font);
                d.metrics.marginX = 0;
                d.metrics.paddingX = 0;
                d.metrics.w = a.ctx.measureText(w).width + 2 * d.metrics.paddingX;
                d.metrics.offsetX_aux = e;
                Object.defineProperties(d.metrics, {
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.offsetX_aux + this.marginX } },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                e += 2 * d.metrics.marginX
            }
            if ("superIndex" === d.nodeType) n = d, n.updateFormula(), n.metrics.marginX = 0, n.metrics.paddingX = 0, n.metrics.paddingY = 0, n.metrics.offsetX_aux = e, n.metrics.prevChild = l, Object.defineProperties(n.metrics, {
                x: { get: function() { return this.offsetX } },
                y: { get: function() { return this.offsetY } },
                offsetX: {
                    get: function() {
                        return b.metrics.offsetX +
                            b.metrics.paddingX + this.offsetX_aux + this.marginX
                    }
                },
                offsetY: { get: function() { return b.metrics.offsetY + this.ascent + (this.prevChild.metrics.descent - this.prevChild.metrics.ascent) / 2 - this.h } }
            }), n.metrics.w += 2 * n.metrics.paddingX, n.metrics.ascent += n.metrics.paddingY, n.metrics.descent += n.metrics.paddingY, n.metrics.h += 2 * n.metrics.paddingY, n.metrics.tmp_ascent = n.metrics.h + (n.metrics.prevChild.metrics.ascent - n.metrics.prevChild.metrics.descent) / 2, e += 2 * n.metrics.marginX;
            else if ("subIndex" === d.nodeType) n = d, n.updateFormula(),
                n.metrics.marginX = 0, n.metrics.paddingX = 0, n.metrics.paddingY = 0, n.metrics.offsetX_aux = e, n.metrics.prevChild = l, Object.defineProperties(n.metrics, { x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.offsetX_aux } }, offsetY: { get: function() { return b.metrics.offsetY + this.ascent + (this.prevChild.metrics.descent - this.prevChild.metrics.ascent) / 2 } } }), n.metrics.w += n.metrics.paddingX, n.metrics.ascent += n.metrics.paddingY,
                n.metrics.descent += n.metrics.paddingY, n.metrics.h += 2 * n.metrics.paddingY, this.metrics.descent = n.metrics.ascent + (n.metrics.prevChild.metrics.descent - n.metrics.prevChild.metrics.ascent) / 2 + n.metrics.descent, e += n.metrics.marginX;
            else if ("fraction" === d.nodeType) {
                m = d;
                m.updateFormula();
                n = m.children;
                w = n[0];
                n = n[1];
                m.metrics.marginX = parseInt(.5 + .075 * this.style.size);
                m.metrics.paddingX = 0;
                m.metrics.paddingY = 0;
                var x = Math.max(w.metrics.w, n.metrics.w) + 2 * m.metrics.paddingX;
                m.metrics.prevChild = l;
                m.metrics.offsetX_aux =
                    e;
                var y = parseInt(-l.metrics.descent + 4 * l.metrics.h / 9);
                Object.defineProperties(m.metrics, { x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY + y } }, offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } }, offsetY: { get: function() { return b.metrics.offsetY - y } } });
                Object.defineProperties(w.metrics, {
                    parent: { value: m },
                    maxWidth: { value: x },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: {
                        get: function() {
                            return this.parent.metrics.offsetX +
                                parseInt((this.maxWidth - this.w) / 2)
                        }
                    },
                    offsetY: { get: function() { return this.parent.metrics.offsetY - this.descent - this.parent.metrics.paddingY } }
                });
                Object.defineProperties(n.metrics, { parent: { value: m }, maxWidth: { value: x }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + parseInt((this.maxWidth - this.w) / 2) } }, offsetY: { get: function() { return this.parent.metrics.offsetY + this.ascent + this.parent.metrics.paddingY } } });
                m.metrics.w =
                    x;
                m.metrics.ascent = w.metrics.h + y + 2 * m.metrics.paddingY;
                m.metrics.descent = n.metrics.h - y + 2 * m.metrics.paddingY;
                m.metrics.h = w.metrics.h + n.metrics.h + 4 * m.metrics.paddingY;
                e += 2 * m.metrics.marginX
            } else if ("radical" === d.nodeType) {
                l = d;
                l.updateFormula();
                n = l.children;
                m = n[0];
                var z = n[1];
                l.metrics.marginX = parseInt(1.5 + .075 * this.style.size);
                l.metrics.paddingX = parseInt(1.5 + .075 * this.style.size);
                l.metrics.paddingY = parseInt(1.5 + .05 * this.style.size);
                l.metrics.offsetX_aux = e;
                Object.defineProperties(l.metrics, {
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                n = l.style.size;
                l.radicalSign = { w: n, scaleX: n / 722, scaleY: z.metrics.h / 1E3 };
                w = parseInt(m.metrics.w - 2 * l.radicalSign.w / 3);
                Object.defineProperties(l.radicalSign, {
                    parent: { value: l },
                    displaceIndex: { value: w },
                    x: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + Math.max(this.displaceIndex, 0) } },
                    y: { get: function() { return b.metrics.offsetY - z.metrics.ascent } }
                });
                Object.defineProperties(m.metrics, { parent: { value: l }, displaceIndex: { value: w }, fontSize: { value: n }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + Math.max(this.displaceIndex, 0) - this.displaceIndex } }, offsetY: { get: function() { return b.metrics.offsetY - this.descent - 2 * this.fontSize / 5 } } });
                Object.defineProperties(z.metrics, {
                    parent: { value: l },
                    displaceIndex: { value: w },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + this.parent.radicalSign.w + Math.max(this.displaceIndex, 0) } },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                w = m.metrics.w < 2 * l.radicalSign.w / 3 ? l.radicalSign.w : parseInt(m.metrics.w + l.radicalSign.w / 3);
                l.metrics.w = w + 2 * l.metrics.paddingX + z.metrics.w;
                l.metrics.ascent = Math.max(z.metrics.ascent, m.metrics.h + 2 * n / 5) +
                    l.metrics.paddingY;
                l.metrics.descent = z.metrics.descent + l.metrics.paddingY;
                l.metrics.h = l.metrics.ascent + l.metrics.descent;
                e += 2 * l.metrics.marginX
            } else if ("sum" === d.nodeType) {
                m = d;
                m.updateFormula();
                n = m.children;
                w = n[0];
                x = n[1];
                var G = n[2];
                m.metrics.marginX = parseInt(1.5 + .075 * this.style.size);
                m.metrics.paddingX = parseInt(1.5 + .075 * this.style.size);
                m.metrics.paddingY = parseInt(1.5 + .05 * this.style.size);
                m.metrics.offsetX_aux = e;
                Object.defineProperties(m.metrics, {
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                a.ctx.font = d.style.toString();
                var J = f(a.ctx.font);
                l = parseInt(1.2 * J.h);
                n = parseInt(.5 + 780 * l / 1E3);
                m.sigmaSign = { w: n, h: l, scale: l / 1E3 };
                var E = Math.max(x.metrics.w, w.metrics.w, m.sigmaSign.w);
                m.sigmaSign.parent = m;
                Object.defineProperties(m.sigmaSign, {
                    sumWidth: { value: E },
                    x: {
                        get: function() {
                            return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt((this.sumWidth -
                                this.w) / 2)
                        }
                    },
                    y: { get: function() { return b.metrics.offsetY + J.descent - (this.h + J.h) / 2 } }
                });
                n = J.descent - x.metrics.descent - (l + J.h) / 2 - m.metrics.paddingY;
                Object.defineProperties(x.metrics, { parent: { value: m }, sumWidth: { value: E }, newBaselineTo: { value: n }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt((this.sumWidth - this.w) / 2) } }, offsetY: { get: function() { return b.metrics.offsetY + this.newBaselineTo } } });
                l = w.metrics.ascent + J.descent + (l - J.h) / 2 + m.metrics.paddingY;
                Object.defineProperties(w.metrics, { parent: { value: m }, sumWidth: { value: E }, newBaselineFrom: { value: l }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt((this.sumWidth - this.w) / 2) } }, offsetY: { get: function() { return b.metrics.offsetY + this.newBaselineFrom } } });
                Object.defineProperties(G.metrics, {
                    parent: { value: m },
                    sumWidth: { value: E },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + 2 * this.parent.metrics.paddingX + this.sumWidth } },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                m.metrics.w = E + G.metrics.w + 3 * m.metrics.paddingX;
                m.metrics.ascent = Math.max(G.metrics.ascent, -n + x.metrics.ascent) + m.metrics.paddingY;
                m.metrics.descent = Math.max(G.metrics.descent, l + w.metrics.descent) + m.metrics.paddingY;
                m.metrics.h = m.metrics.ascent + m.metrics.descent;
                e += 2 * m.metrics.marginX
            } else if ("integral" === d.nodeType) {
                m = d;
                m.updateFormula();
                n = m.children;
                w = n[0];
                x = n[1];
                G = n[2];
                m.metrics.marginX = parseInt(1.5 + .075 * this.style.size);
                m.metrics.paddingX = parseInt(1.5 + .075 * this.style.size);
                m.metrics.paddingY = parseInt(1.5 + .05 * this.style.size);
                m.metrics.offsetX_aux = e;
                Object.defineProperties(m.metrics, {
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                a.ctx.font = d.style.toString();
                J = f(a.ctx.font);
                E = parseInt(1.2 * J.h);
                var F = parseInt(10.5 + 529 * E / 1E3);
                m.sign = { w: F, h: E, scale: E / 1E3 };
                m.sign.parent = m;
                Object.defineProperties(m.sign, { x: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX } }, y: { get: function() { return b.metrics.offsetY + J.descent - (this.h + J.h) / 2 } } });
                n = J.descent - (E + J.h) / 2 - x.metrics.descent + E / 3;
                Object.defineProperties(x.metrics, {
                    parent: { value: m },
                    integralWidth: { value: F },
                    newBaselineTo: { value: n },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt(4 * this.integralWidth / 5) } },
                    offsetY: { get: function() { return b.metrics.offsetY + this.newBaselineTo } }
                });
                l = J.descent + w.metrics.ascent / 2;
                Object.defineProperties(w.metrics, {
                    parent: { value: m },
                    integralWidth: { value: F },
                    newBaselineFrom: { value: l },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt(2 * this.integralWidth / 5) } },
                    offsetY: { get: function() { return b.metrics.offsetY + this.newBaselineFrom } }
                });
                F = Math.max(parseInt(3 * F / 5) + x.metrics.w, parseInt(2 * F / 5 + w.metrics.w)) + m.metrics.paddingX;
                Object.defineProperties(G.metrics, {
                    parent: { value: m },
                    whatDisplace: { value: F },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: {
                        get: function() {
                            return this.parent.metrics.offsetX + this.parent.metrics.paddingX +
                                this.whatDisplace
                        }
                    },
                    offsetY: { get: function() { return b.metrics.offsetY } }
                });
                m.metrics.w = F + G.metrics.w + 2 * m.metrics.paddingX;
                m.metrics.ascent = Math.max(G.metrics.ascent, -n + x.metrics.ascent) + m.metrics.paddingY;
                m.metrics.descent = Math.max(G.metrics.descent, l + w.metrics.descent, E - m.metrics.ascent) + m.metrics.paddingY;
                m.metrics.h = Math.max(m.metrics.ascent + m.metrics.descent, E);
                e += 2 * m.metrics.marginX
            } else if ("prod" === d.nodeType) m = d, m.updateFormula(), n = m.children, w = n[0], x = n[1], G = n[2], m.metrics.marginX = parseInt(1.5 +
                    .075 * this.style.size), m.metrics.paddingX = parseInt(1.5 + .075 * this.style.size), m.metrics.paddingY = parseInt(1.5 + .05 * this.style.size), m.metrics.offsetX_aux = e, Object.defineProperties(m.metrics, { x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } }, offsetY: { get: function() { return b.metrics.offsetY } } }), a.ctx.font = d.style.toString(), J = f(a.ctx.font), l = parseInt(1.2 * J.h), n = parseInt(.5 +
                    876 * l / 1E3), m.piSign = { w: n, h: l, scale: l / 1E3 }, E = Math.max(x.metrics.w, w.metrics.w, m.piSign.w), m.piSign.parent = m, Object.defineProperties(m.piSign, { prodWidth: { value: E }, x: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt((this.prodWidth - this.w) / 2) } }, y: { get: function() { return b.metrics.offsetY + J.descent - (this.h + J.h) / 2 } } }), n = J.descent - x.metrics.descent - (l + J.h) / 2 - m.metrics.paddingY, Object.defineProperties(x.metrics, {
                    parent: { value: m },
                    prodWidth: { value: E },
                    newBaselineTo: { value: n },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt((this.prodWidth - this.w) / 2) } },
                    offsetY: { get: function() { return b.metrics.offsetY + this.newBaselineTo } }
                }), l = w.metrics.ascent + J.descent + (l - J.h) / 2 + m.metrics.paddingY, Object.defineProperties(w.metrics, {
                    parent: { value: m },
                    prodWidth: { value: E },
                    newBaselineFrom: { value: l },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + parseInt((this.prodWidth - this.w) / 2) } },
                    offsetY: { get: function() { return b.metrics.offsetY + this.newBaselineFrom } }
                }), Object.defineProperties(G.metrics, { parent: { value: m }, prodWidth: { value: E }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + 2 * this.parent.metrics.paddingX + this.prodWidth } }, offsetY: { get: function() { return b.metrics.offsetY } } }),
                m.metrics.w = E + G.metrics.w + 3 * m.metrics.paddingX, m.metrics.ascent = Math.max(G.metrics.ascent, -n + x.metrics.ascent) + m.metrics.paddingY, m.metrics.descent = Math.max(G.metrics.descent, l + w.metrics.descent) + m.metrics.paddingY, m.metrics.h = m.metrics.ascent + m.metrics.descent, e += 2 * m.metrics.marginX;
            else if ("limit" === d.nodeType) {
                l = d;
                l.updateFormula();
                n = l.children;
                var D = n[0];
                m = n[1];
                n = n[2];
                l.metrics.marginX = parseInt(1.5 + .075 * this.style.size);
                l.metrics.paddingX = parseInt(1.5 + .075 * this.style.size);
                l.metrics.paddingY =
                    parseInt(1.5 + .05 * this.style.size);
                l.metrics.offsetX_aux = e;
                Object.defineProperties(l.metrics, { x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } }, offsetY: { get: function() { return b.metrics.offsetY } } });
                a.ctx.font = d.style.toString();
                J = f(a.ctx.font);
                w = parseInt(.5 + a.ctx.measureText("l\u00edm").width);
                x = parseInt(.5 + a.ctx.measureText("\u2192").width);
                G = Math.max(w, D.metrics.w + x + m.metrics.w);
                l.limitText = { parent: l };
                Object.defineProperties(l.limitText, { limitWidth: { value: G }, limitTextWidth: { value: w }, x: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + (this.limitWidth - this.limitTextWidth) / 2 } } });
                w = J.descent + Math.max(D.metrics.ascent, m.metrics.ascent, 2 * J.ascent / 3) + l.metrics.paddingY;
                l.limitArrow = { parent: l };
                Object.defineProperties(l.limitArrow, {
                    newBaseline: { value: w },
                    x: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + D.metrics.w } },
                    y: {
                        get: function() {
                            return b.metrics.offsetY +
                                this.newBaseline
                        }
                    }
                });
                Object.defineProperties(D.metrics, { parent: { value: l }, newBaseline: { value: w }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX } }, offsetY: { get: function() { return b.metrics.offsetY + this.newBaseline } } });
                Object.defineProperties(m.metrics, {
                    parent: { value: l },
                    arrowWidth: { value: x },
                    newBaseline: { value: w },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + D.metrics.w + this.arrowWidth } },
                    offsetY: { get: function() { return b.metrics.offsetY + this.newBaseline } }
                });
                Object.defineProperties(n.metrics, { parent: { value: l }, limitWidth: { value: G }, x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return this.parent.metrics.offsetX + 2 * this.parent.metrics.paddingX + this.limitWidth } }, offsetY: { get: function() { return b.metrics.offsetY } } });
                l.metrics.w = G + n.metrics.w + 3 * l.metrics.paddingX;
                l.metrics.ascent = Math.max(n.metrics.ascent, J.ascent) + l.metrics.paddingY;
                x = 0;
                n = Math.max(D.metrics.descent, m.metrics.descent, n.metrics.descent);
                if (0 != D.metrics.h || 0 != m.metrics.h) x = w, n = Math.max(D.metrics.descent, m.metrics.descent, n - x);
                l.metrics.descent = x + n + l.metrics.paddingY;
                l.metrics.h = l.metrics.ascent + l.metrics.descent;
                e += 2 * l.metrics.marginX
            } else if ("matrix" === d.nodeType) {
                w = d;
                w.updateFormula();
                n = w.children;
                x = w.rows;
                G = w.columns;
                w.metrics.marginX = parseInt(1.5 +
                    .075 * this.style.size);
                w.metrics.paddingX = parseInt(5 + .075 * this.style.size);
                w.metrics.paddingY = parseInt(1.5 + .05 * this.style.size);
                w.metrics.offsetX_aux = e;
                Object.defineProperties(w.metrics, { x: { get: function() { return this.offsetX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + this.marginX + this.offsetX_aux } }, offsetY: { get: function() { return b.metrics.offsetY } } });
                a.ctx.font = d.style.toString();
                J = f(a.ctx.font);
                E = [];
                F = [];
                l = 0;
                for (var B = x * G; l < B; l++) {
                    var L =
                        parseInt(l / G);
                    var I = l % G;
                    E[L] = Math.max(E[L] || 0, n[l].metrics.h);
                    F[I] = Math.max(F[I] || 0, n[l].metrics.w)
                }
                var M = (1 + G) * w.metrics.paddingX;
                for (l = 0; l < G; l++) M += F[l];
                var O = (1 + x) * w.metrics.paddingY;
                for (l = 0; l < x; l++) O += E[l];
                m = J.descent - J.h / 2;
                l = 0;
                for (B = x * G; l < B; l++) L = parseInt(l / G), I = l % G, n[l].metrics.offsetX_aux = g(F, I) + (F[I] - n[l].metrics.w) / 2 + I * w.metrics.paddingX, n[l].metrics.offsetY_aux = g(E, L) + (E[L] - n[l].metrics.h) / 2 + (1 + L) * w.metrics.paddingY, Object.defineProperties(n[l].metrics, {
                    parent: { value: w },
                    matrixH: { value: O },
                    dispY: { value: m },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX + this.offsetX_aux } },
                    offsetY: { get: function() { return b.metrics.offsetY - this.matrixH / 2 + this.ascent + this.offsetY_aux + this.dispY } }
                });
                w.metrics.w = M;
                w.metrics.ascent = O / 2 - m;
                w.metrics.descent = O / 2 + m;
                w.metrics.h = w.metrics.ascent + w.metrics.descent;
                e += 2 * w.metrics.marginX
            } else if ("defparts" === d.nodeType) {
                w = d;
                w.updateFormula();
                n = d.children;
                x = d.parts;
                w.metrics.marginX = parseInt(1.5 + .075 * this.style.size);
                w.metrics.paddingX = parseInt(1.5 + .075 * this.style.size);
                w.metrics.paddingY = parseInt(1.5 + .05 * this.style.size);
                w.metrics.offsetX_aux = e;
                Object.defineProperties(w.metrics, { parent: { value: b }, x: { get: function() { return this.offsetX - 2 * this.marginX } }, y: { get: function() { return this.offsetY } }, offsetX: { get: function() { return b.metrics.offsetX + b.metrics.paddingX + 3 * this.marginX + this.offsetX_aux } }, offsetY: { get: function() { return b.metrics.offsetY } } });
                a.ctx.font =
                    d.style.toString();
                J = f(a.ctx.font);
                G = 0;
                E = w.metrics.paddingY;
                m = J.descent - J.h / 2;
                for (l = 0; l < x; l++) n[l].metrics.offsetY_aux = E, G = Math.max(G, n[l].metrics.w), E += n[l].metrics.h + w.metrics.paddingY, Object.defineProperties(n[l].metrics, {
                    parent: { value: w },
                    dispY: { value: m },
                    x: { get: function() { return this.offsetX } },
                    y: { get: function() { return this.offsetY } },
                    offsetX: { get: function() { return this.parent.metrics.offsetX + this.parent.metrics.paddingX } },
                    offsetY: {
                        get: function() {
                            return b.metrics.offsetY - this.parent.metrics.defpartsH /
                                2 + this.ascent + this.offsetY_aux + this.dispY
                        }
                    }
                });
                w.metrics.defpartsH = E;
                w.metrics.w = G + 4 * w.metrics.paddingX;
                w.metrics.ascent = E / 2 - m;
                w.metrics.descent = E / 2 + m;
                w.metrics.h = w.metrics.ascent + w.metrics.descent;
                e += 2 * w.metrics.marginX
            } else if ("numerator" === d.nodeType || "denominator" === d.nodeType || "index" === d.nodeType || "radicand" === d.nodeType || "from" === d.nodeType || "to" === d.nodeType || "what" === d.nodeType || "element" === d.nodeType) d.updateFormula(), d.metrics.paddingX = parseInt(1.5 + .075 * this.style.size), d.metrics.paddingY =
                parseInt(1.5 + .05 * this.style.size), d.metrics.ascent += d.metrics.paddingY, d.metrics.descent += d.metrics.paddingY, d.metrics.h = d.metrics.ascent + d.metrics.descent, 1 == d.children.length && "text" == d.children[0].nodeType && "" == d.children[0].value ? (d.metrics.w = 0, a.in_editor || (d.metrics.ascent = d.metrics.descent = d.metrics.h = 0)) : d.metrics.w += 2 * d.metrics.paddingX;
            l = d;
            this.metrics.ascent = Math.max(this.metrics.ascent, d.metrics.tmp_ascent || d.metrics.ascent);
            this.metrics.descent = Math.max(this.metrics.descent, d.metrics.descent);
            this.metrics.w += d.metrics.w + 2 * d.metrics.marginX;
            this.metrics.h = this.metrics.ascent + this.metrics.descent;
            e += d.metrics.w
        }
    };
    k.prototype.justifyAux = function(a) {
        for (var b = 0, c = 0, e = 0, f = this.children.length; e < f - 1; e++) "space" === this.children[e].nodeType ? b++ : c += this.children[e].metrics.w;
        this.updateLine((a - c) / b)
    };
    k.prototype.drawTextBlock = function(a) {
        a.fillStyle = r;
        a.shadowBlur = this.style.shadowBlur;
        a.shadowOffsetX = this.style.shadowOffsetX;
        a.shadowOffsetY = this.style.shadowOffsetY;
        a.shadowColor = this.style.shadowColor;
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        a.shadowColor = "transparent"
    };
    k.prototype.drawTextLineBlock = function(a) { for (var b = 0, c = this.children.length; b < c; b++) e = !1, this.children[b].draw(a) };
    k.prototype.drawText = function(a) {
        if ("" !== this.value) {
            var b = this.metrics.x,
                c = this.metrics.y;
            a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
            a.font = this.style.toString(e);
            a.beginPath();
            this.style.overline && (a.rect(b, c - this.metrics.ascent +
                parseInt(1 + this.style.size / 25), this.metrics.w, parseInt(1 + this.style.size / 25)), a.fill());
            this.style.underline && (a.rect(b, c + parseInt(1 + this.style.size / 10), this.metrics.w, parseInt(1 + this.style.size / 25)), a.fill());
            if (this.style.border) {
                var f = a.strokeStyle;
                a.lineWidth = this.style.border_size && 0 < parseInt(this.style.border_size) ? parseInt(this.style.border_size) : 1 + parseInt(this.style.size / 8);
                a.lineJoin = "round";
                a.miterLimit = 2;
                a.strokeStyle = this.style.border.getColor();
                a.strokeText(this.value, b, c);
                a.strokeStyle =
                    f
            }
            a.fillText(this.value, b, c)
        }
    };
    k.prototype.drawWord = function(a) { for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a) };
    k.prototype.drawSpace = function(a) {};
    k.prototype.drawDynamicText = function(a) {
        var b = this.metrics.x + this.metrics.paddingX,
            c = this.metrics.y;
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.font = this.style.toString(e);
        a.beginPath();
        this.style.overline && (a.rect(b, c - this.metrics.ascent + parseInt(1 + this.style.size /
            25), this.metrics.w, parseInt(1 + this.style.size / 25)), a.fill());
        this.style.underline && (a.rect(b, c + parseInt(1 + this.style.size / 10), this.metrics.w, parseInt(1 + this.style.size / 25)), a.fill());
        a.fillText(this.evalValue, b, c);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawHyperlink = function(a) {
        var b = this.metrics.x,
            c = this.metrics.y;
        this.ctx = a;
        this.clickCatcher.parentNode || (a.canvas.nextSibling.className ? a.canvas.parentNode.insertBefore(this.clickCatcher, a.canvas.nextSibling.nextSibling) : a.canvas.parentNode.insertBefore(this.clickCatcher,
            a.canvas.nextSibling));
        this.clickCatcher.style.left = b + "px";
        this.clickCatcher.style.top = c - this.metrics.ascent + "px";
        a.fillStyle = "blue";
        this.click && (a.fillStyle = "white", a.fillRect(b, c - this.metrics.ascent, this.metrics.w, this.metrics.h), a.fillStyle = "red");
        a.font = this.style.toString(e);
        a.beginPath();
        a.rect(b, c + parseInt(1 + this.style.size / 10), this.metrics.w, parseInt(1 + this.style.size / 25));
        a.fill();
        a.fillText(this.value, b, c)
    };
    k.prototype.drawFormula = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) e = !0, this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawFraction = function(a) {
        a.lineWidth = 5;
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.beginPath();
        var b = parseInt(1 + this.style.size / 24);
        a.rect(this.metrics.x, this.metrics.offsetY - parseInt(b / 2), this.metrics.w, b);
        a.fill();
        this.children[0].draw(a);
        this.children[1].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawNumDen = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawSuperIndex = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawSubIndex = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawRadical = function(a) {
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.save();
        a.translate(this.radicalSign.x, this.radicalSign.y);
        a.scale(this.radicalSign.scaleX,
            this.radicalSign.scaleY);
        this.drawRadicalSign(a);
        a.restore();
        a.beginPath();
        a.fillRect(this.children[1].metrics.x + 2.5, this.radicalSign.y - .5, this.children[1].metrics.w - 1.5, parseInt(1 + this.style.size / 18));
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawSum = function(a) {
        a.save();
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.translate(this.sigmaSign.x, this.sigmaSign.y);
        a.scale(this.sigmaSign.scale,
            this.sigmaSign.scale);
        if (this.style.border) {
            var b = a.strokeStyle;
            a.lineWidth = this.style.border_size && 0 < parseInt(this.style.border_size) ? parseInt(this.style.border_size) : 1 + parseInt(this.style.size / 8);
            a.lineWidth = parseInt(a.lineWidth / this.sigmaSign.scale);
            a.lineJoin = "round";
            a.miterLimit = 2;
            a.strokeStyle = this.style.border.getColor();
            a.strokeStyle = b
        }
        this.drawSigmaSign(a);
        a.restore();
        b = 0;
        for (var c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawIntegral = function(a) {
        a.save();
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.translate(this.sign.x, this.sign.y);
        a.scale(this.sign.scale, this.sign.scale);
        this.drawIntegralSign(a);
        a.restore();
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawProd = function(a) {
        a.save();
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.translate(this.piSign.x, this.piSign.y);
        a.scale(this.piSign.scale, this.piSign.scale);
        this.drawProdSign(a);
        a.restore();
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawLimit = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        a.fillStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.font = this.style.toString();
        a.fillText("l\u00edm", this.limitText.x, this.metrics.y);
        0 != this.children[1].metrics.h && a.fillText("\u2192",
            this.limitArrow.x, this.limitArrow.y);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawMatrix = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        c = parseInt(1.5 + this.style.size / 25);
        b = c / 2;
        a.lineWidth = c;
        a.strokeStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.beginPath();
        if (0 == this.matrix_type) a.moveTo(this.metrics.x + b + 1.5 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + b, this.metrics.y + b -
            this.metrics.ascent), a.lineTo(this.metrics.x + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.lineTo(this.metrics.x + b + 1.5 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.moveTo(this.metrics.x + this.metrics.w - b - 1.5 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + this.metrics.w - b, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + this.metrics.w - b, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.lineTo(this.metrics.x +
            this.metrics.w - b - 1.5 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent + this.metrics.h);
        else if (1 == this.matrix_type) a.moveTo(this.metrics.x + b + 2 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent), a.bezierCurveTo(this.metrics.x - b, this.metrics.y + b - this.metrics.ascent, this.metrics.x - b, this.metrics.y + b - this.metrics.ascent + this.metrics.h, this.metrics.x + b + 2 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.moveTo(this.metrics.x + this.metrics.w - b - 2 * this.metrics.marginX,
            this.metrics.y + b - this.metrics.ascent), a.bezierCurveTo(this.metrics.x + this.metrics.w + b, this.metrics.y + b - this.metrics.ascent, this.metrics.x + this.metrics.w + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h, this.metrics.x + this.metrics.w - b - 2 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent + this.metrics.h);
        else if (2 == this.matrix_type) {
            c = 3 * this.metrics.marginX;
            var e = c / 2;
            a.moveTo(this.metrics.x + b + c, this.metrics.y + b - this.metrics.ascent);
            a.bezierCurveTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent,
                this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + 2 * this.metrics.marginX);
            a.lineTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2 - 5 * this.metrics.marginX);
            a.bezierCurveTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2);
            a.bezierCurveTo(this.metrics.x +
                b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2 + 5 * this.metrics.marginX);
            a.lineTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h - 2 * this.metrics.marginX);
            a.bezierCurveTo(this.metrics.x + b + e, this.metrics.y - b - this.metrics.ascent + this.metrics.h, this.metrics.x + b + e, this.metrics.y - b - this.metrics.ascent + this.metrics.h, this.metrics.x +
                b + c, this.metrics.y - b - this.metrics.ascent + this.metrics.h);
            a.moveTo(this.metrics.x + this.metrics.w + b - c, this.metrics.y + b - this.metrics.ascent);
            a.bezierCurveTo(this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent, this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent, this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + 2 * this.metrics.marginX);
            a.lineTo(this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2 - 5 * this.metrics.marginX);
            a.bezierCurveTo(this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + this.metrics.w + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2);
            a.bezierCurveTo(this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + this.metrics.w +
                b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2 + 5 * this.metrics.marginX);
            a.lineTo(this.metrics.x + this.metrics.w + b - e, this.metrics.y + b - this.metrics.ascent + this.metrics.h - 2 * this.metrics.marginX);
            a.bezierCurveTo(this.metrics.x + this.metrics.w + b - e, this.metrics.y - b - this.metrics.ascent + this.metrics.h, this.metrics.x + this.metrics.w + b - e, this.metrics.y - b - this.metrics.ascent + this.metrics.h, this.metrics.x + this.metrics.w + b - c, this.metrics.y - b - this.metrics.ascent + this.metrics.h)
        } else 3 == this.matrix_type ?
            (a.moveTo(this.metrics.x + b, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.moveTo(this.metrics.x + this.metrics.w - b, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + this.metrics.w - b, this.metrics.y + b - this.metrics.ascent + this.metrics.h)) : 4 == this.matrix_type && (a.moveTo(this.metrics.x + b, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.moveTo(this.metrics.x +
                b + 1.25 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + b + 1.25 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.moveTo(this.metrics.x + this.metrics.w - b, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + this.metrics.w - b, this.metrics.y + b - this.metrics.ascent + this.metrics.h), a.moveTo(this.metrics.x + this.metrics.w - b - 1.25 * this.metrics.marginX, this.metrics.y + b - this.metrics.ascent), a.lineTo(this.metrics.x + this.metrics.w - b - 1.25 * this.metrics.marginX,
                this.metrics.y + b - this.metrics.ascent + this.metrics.h));
        a.stroke();
        this.drawBorder(a, "blue")
    };
    k.prototype.drawDefparts = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        c = parseInt(1.5 + this.style.size / 25);
        b = c / 2;
        a.lineWidth = c;
        a.strokeStyle = null !== this.style.color ? this.style.color.getColor ? this.style.color.getColor() : this.style.color : r;
        a.beginPath();
        c = 3 * this.metrics.marginX;
        var e = c / 2;
        a.moveTo(this.metrics.x + b + c, this.metrics.y + b - this.metrics.ascent);
        a.bezierCurveTo(this.metrics.x +
            b + e, this.metrics.y + b - this.metrics.ascent, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + 2 * this.metrics.marginX);
        a.lineTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2 - 5 * this.metrics.marginX);
        a.bezierCurveTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b, this.metrics.y + b - this.metrics.ascent + this.metrics.h /
            2);
        a.bezierCurveTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2, this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h / 2 + 5 * this.metrics.marginX);
        a.lineTo(this.metrics.x + b + e, this.metrics.y + b - this.metrics.ascent + this.metrics.h - 2 * this.metrics.marginX);
        a.bezierCurveTo(this.metrics.x + b + e, this.metrics.y - b - this.metrics.ascent + this.metrics.h, this.metrics.x + b + e, this.metrics.y - b - this.metrics.ascent +
            this.metrics.h, this.metrics.x + b + c, this.metrics.y - b - this.metrics.ascent + this.metrics.h);
        a.stroke();
        this.drawBorder(a, "blue")
    };
    k.prototype.drawGenericBlock = function(a) {
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].draw(a);
        this.drawBorder(a, "blue")
    };
    k.prototype.drawComponentNumCtrl = function(a) {
        this.componentNumCtrl.expresion = this.evaluator.parser.parse("(" + this.metrics.x + "," + (this.metrics.y - this.metrics.ascent) + "," + this.componentNumCtrl.w + "," + this.componentNumCtrl.h + ")");
        this.componentNumCtrl &&
            this.componentNumCtrl.parent && this.componentNumCtrl.parent.readyApp && this.componentNumCtrl.update(!0)
    };
    k.prototype.drawComponentSpace = function(a) {
        this.componentSpace.xExpr = this.evaluator.parser.parse(this.metrics.x.toString());
        this.componentSpace.yExpr = this.evaluator.parser.parse((this.metrics.y - this.metrics.ascent).toString());
        this.componentSpace && this.componentSpace.parent && this.componentSpace.parent.readyApp && this.componentSpace.update(!0)
    };
    k.prototype.drawRadicalSign = function(a) {
        a.beginPath();
        a.moveTo(759, 1);
        a.bezierCurveTo(751, 1, 744, 5, 739, 15);
        a.lineTo(325, 878);
        a.lineTo(153, 500);
        a.bezierCurveTo(148, 489, 142, 486, 136, 491);
        a.lineTo(2, 596);
        a.bezierCurveTo(-3, 600, 19, 626, 24, 622);
        a.lineTo(89, 575);
        a.lineTo(282, 997);
        a.bezierCurveTo(285, 1003, 309, 1003, 314, 993);
        a.lineTo(773, 40);
        a.lineTo(773, 1);
        a.closePath();
        a.stroke();
        a.fill()
    };
    k.prototype.drawSigmaSign = function(a) {
        a.beginPath();
        a.moveTo(780, 707);
        a.lineTo(750, 707);
        a.bezierCurveTo(728, 805, 695, 872, 585, 872);
        a.lineTo(180, 872);
        a.lineTo(509, 447);
        a.lineTo(225,
            65);
        a.lineTo(538, 65);
        a.bezierCurveTo(668, 65, 705, 114, 726, 246);
        a.lineTo(756, 246);
        a.lineTo(756, 0);
        a.lineTo(25, 0);
        a.lineTo(384, 500);
        a.lineTo(0, 1E3);
        a.lineTo(729, 1E3);
        a.closePath();
        a.stroke();
        a.fill()
    };
    k.prototype.drawIntegralSign = function(a) {
        a.beginPath();
        a.moveTo(150, 828);
        a.bezierCurveTo(129, 916, 108, 972, 67, 972);
        a.bezierCurveTo(61, 972, 58, 970, 58, 966);
        a.bezierCurveTo(58, 957, 73, 958, 73, 932);
        a.bezierCurveTo(73, 918, 60, 910, 46, 910);
        a.bezierCurveTo(22, 910, 1, 932, 1, 961);
        a.bezierCurveTo(1, 981, 22, 1E3, 57, 1E3);
        a.bezierCurveTo(154,
            1E3, 198, 895, 216, 824);
        a.lineTo(375, 181);
        a.bezierCurveTo(398, 90, 420, 27, 464, 28);
        a.bezierCurveTo(470, 28, 473, 30, 473, 34);
        a.bezierCurveTo(473, 41, 458, 47, 458, 69);
        a.bezierCurveTo(458, 83, 471, 89, 485, 89);
        a.bezierCurveTo(509, 89, 530, 67, 530, 38);
        a.bezierCurveTo(530, 18, 508, 0, 473, 0);
        a.bezierCurveTo(368, 0, 326, 120, 309, 190);
        a.closePath();
        a.stroke();
        a.fill()
    };
    k.prototype.drawProdSign = function(a) {
        a.beginPath();
        a.moveTo(876.3561, 999.59384);
        a.lineTo(876.3561, 972.20771);
        a.lineTo(858.75073, 972.20771);
        a.bezierCurveTo(794.19771,
            972.20771, 761.92121, 931.12852, 761.92121, 847.99206);
        a.lineTo(761.92121, 144.75542);
        a.bezierCurveTo(761.92121, 61.618964, 789.30733, 27.386304, 876.3561, 27.386304);
        a.lineTo(876.3561, 1.7633057E-4);
        a.lineTo(1.184082E-5, 1.7633057E-4);
        a.lineTo(1.184082E-5, 27.386304);
        a.lineTo(16.627304, 27.386304);
        a.bezierCurveTo(77.268015, 27.386304, 115.41298, 51.838204, 115.41298, 148.66773);
        a.lineTo(115.41298, 865.59743);
        a.bezierCurveTo(115.41298, 936.99697, 84.114547, 972.20771, 18.583456, 972.20771);
        a.lineTo(1.184082E-5, 972.20771);
        a.lineTo(1.184082E-5, 999.59384);
        a.lineTo(359.93198, 999.59384);
        a.lineTo(359.93198, 972.20771);
        a.lineTo(329.61162, 972.20771);
        a.bezierCurveTo(265.0586, 972.20771, 243.54093, 932.10659, 243.54093, 841.14553);
        a.lineTo(243.54093, 64.553192);
        a.lineTo(633.79325, 64.553192);
        a.lineTo(633.79325, 841.14553);
        a.bezierCurveTo(633.79325, 916.45738, 616.18788, 972.20771, 547.72257, 972.20771);
        a.lineTo(516.42413, 972.20771);
        a.lineTo(516.42413, 999.59384);
        a.closePath();
        a.stroke();
        a.fill()
    };
    k.prototype.drawBorderSpecial = function(a,
        c) {
        a.beginPath();
        a.setLineDash([1, 2]);
        a.strokeStyle = c;
        a.lineWidth = 1;
        a.rect(parseInt(this.metrics.x) + .5, parseInt(this.metrics.y - this.metrics.ascent) + .5, this.metrics.w, this.metrics.h);
        a.stroke();
        a.setLineDash([])
    };
    k.prototype.toRTF = function() {
        var a = [],
            c = [],
            d = "";
        this.mergeTextNodes();
        for (var e = 0, f = this.children.length; e < f; e++) { var g = this.children[e]; "textLineBlock" === g.nodeType && (d += g.toRTFAux(a, c) + (1 < f && e < f - 1 ? "\\par" : "")) }
        g = "{\\fonttbl";
        e = 0;
        for (f = a.length; e < f; e++) g += "\\f" + e + "\\fcharset0 " + a[e] + ";";
        a = "";
        if (0 < c.length) {
            a = "{\\colortbl";
            e = 0;
            for (f = c.length; e < f; e++) a += c[e];
            a += "}"
        }
        return "{\\rtf1\\uc0" + (g + "}") + a + d + "}"
    };
    k.prototype.toRTFAux = function(a, c) {
        for (var b, e, h, f = null, g = "", l, k, p, x, y, z = 0, G = this.children.length; z < G; z++) l = k = "", b = this.children[z], p = this.addToFontTable(b.style.family, a), x = b.style.size, y = this.addToColorTable(b.style.color, c), null === y && 0 < c.length && (y = this.addToColorTable(r, c)), y !== f && (l += "\\cf" + y, f = y), p !== e && (l += "\\f" + p, e = p), x !== h && (l += "\\fs" + 2 * x, h = x), b.style.italic && (l += "\\i", k = "\\i0" +
                k), b.style.bold && (l += "\\b", k = "\\b0" + k), b.style.underline && (l += "\\ul", k = "\\ulnone" + k), b.style.overline && (l += "\\ol", k = "\\olnone" + k), "text" === b.nodeType ? (b.value = b.value.replace(/\\{/g, "{").replace(/\\}/g, "}").replace(/{/g, "\\{").replace(/}/g, "\\}"), b = "" !== l ? l + " " + b.value + k : "" !== g && "}" !== g.charAt(g.length - 1) ? " " + b.value : b.value, g += b) : "formula" === b.nodeType ? g += "{\\*\\mjaformula" + b.formulaToRTF(e, h, f, a, c) + "}" : "componentSpace" === b.nodeType ? g += "{\\*\\component\\Space " + b.value + "}" : "componentNumCtrl" === b.nodeType &&
            (g += "{\\*\\component\\NumCtrl " + b.value + "}");
        return g
    };
    k.prototype.formulaToRTF = function(a, c, d, e, f) {
        for (var b, h = "", g, l, k, q, p = 0, v = this.children.length; p < v; p++) g = l = "", b = this.children[p], k = this.addToFontTable(b.style.family, e), q = this.addToColorTable(b.style.color, f), null === q && 0 < f.length && (q = this.addToColorTable(r, f)), k !== a && (g += "\\f" + k, a = k), q !== d && (g += "\\cf" + q, "text" !== b.nodeType || "text" === b.nodeType && "" !== b.value) && (d = q), b.style.italic && (g += "\\i", l = "\\i0" + l), b.style.bold && (g += "\\b", l = "\\b0" + l), b.style.underline &&
            (g += "\\ul", l = "\\ulnone" + l), b.style.overline && (g += "\\ol", l = "\\olnone" + l), "text" === b.nodeType && "" !== b.value ? (b.value = b.value.replace(/\\{/g, "{").replace(/\\}/g, "}").replace(/{/g, "\\{").replace(/}/g, "\\}"), tmpRTF = "" !== g ? g + " " + b.value + l : "}" !== h.charAt(h.length - 1) ? " " + b.value : b.value, h += tmpRTF) : "dynamicText" === b.nodeType ? (b.value = "" === b.value ? " " : b.value, h += g + "{\\expr " + b.value + "\\decimals " + (b.decimals || 2) + "\\fixed" + (b.fixed ? 1 : 0) + "}" + l) : "fraction" === b.nodeType || "radical" === b.nodeType || "index" === b.nodeType ||
            "radicand" === b.nodeType || "sum" === b.nodeType || "integral" === b.nodeType || "prod" === b.nodeType || "limit" === b.nodeType || "from" === b.nodeType || "to" === b.nodeType || "what" === b.nodeType || "element" === b.nodeType ? h += "{\\" + b.nodeType + b.formulaToRTF(a, c, d, e, f) + "}" : "numerator" === b.nodeType ? h += "{\\num" + b.formulaToRTF(a, c, d, e, f) + "}" : "denominator" === b.nodeType ? h += "{\\den" + b.formulaToRTF(a, c, d, e, f) + "}" : "superIndex" === b.nodeType ? h += "{\\supix" + b.formulaToRTF(a, c, d, e, f) + "}" : "subIndex" === b.nodeType ? h += "{\\subix" + b.formulaToRTF(a,
                c, d, e, f) + "}" : "matrix" === b.nodeType ? h += "{\\matrix\\rows " + (b.rows || 2) + "\\columns " + (b.columns || 2) + b.formulaToRTF(a, c, d, e, f) + "}" : "defparts" === b.nodeType && (h += "{\\defparts\\parts " + (b.parts || 2) + b.formulaToRTF(a, c, d, e, f) + "}");
        return h
    };
    k.prototype.addToFontTable = function(a, c) {
        var b;
        a.match(/times/i) ? b = "Times New Roman" : a.match(/courier/i) ? b = "Courier New" : a.match(/arial/i) && (b = "Arial");
        a = c.indexOf(b); - 1 === a && (a = c.length, c.push(b));
        return a
    };
    k.prototype.addToColorTable = function(a, c) {
        if (a) {
            a = "\\red" + parseInt(a.substring(1,
                3), 16) + "\\green" + parseInt(a.substring(3, 5), 16) + "\\blue" + parseInt(a.substring(5, 7), 16) + ";";
            var b = c.indexOf(a); - 1 === b && (b = c.length, c.push(a));
            return b
        }
        return null
    };
    k.prototype.mergeTextNodes = function() {
        for (var a = [], c = null, d = 0, e = this.children.length; d < e; d++) "text" === this.children[d].nodeType ? null !== c && "text" === c.nodeType && c.style.equals(this.children[d].style) && (this.children[d].value = c.value + this.children[d].value, a.push(c)) : this.children[d].mergeTextNodes(), c = this.children[d];
        d = 0;
        for (e = a.length; d <
            e; d++) this.removeChild(a[d])
    };
    var l = { sansserif: { ascent: 1854, descent: -434, lineGap: 67, capHeight: 1409, xHeight: 1082, unitsPerEm: 2048 }, serif: { ascent: 1825, descent: -443, lineGap: 87, capHeight: 1341, xHeight: 940, unitsPerEm: 2048 }, monospace: { ascent: 1705, descent: -615, lineGap: 0, capHeight: 1349, xHeight: 1082, unitsPerEm: 2048 } };
    a.TextNode = k;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = String.fromCharCode,
        f, e, r, p, c, k, l, b, h, d, v, q = function() {};
    q.prototype.tokenize = function(a) {
        if (a) a = a.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quote;/g, "''").replace(/&squot;/g, "'").replace(/\\rquote /g, "'").replace(/\\endash /g, "-").replace(/\n/g, " ").replace(/\r/g, "").replace(/\\uc(\d+) /g, "").replace(/\\uc(\d+)/g, "");
        else return [];
        f = [];
        e = "";
        p = r = 0;
        k = a.charAt(0);
        l = !1;
        for (b = "text"; r < a.length;) c = k, k = a.charAt(r + 1), l ? "\\" === k || "{" === k || "}" ===
            k || " " === k || ";" === k ? (l = !1, e += c, " " === k ? (r++, k = a.charAt(r + 1), v = !0) : v = !1, (h = e.match(/^'([0-9a-f]{2})/)) ? (d = "", "text" === b && (d = f.pop().value), e = d += g(parseInt(h[1], 16)) + e.substring(3)) : (h = e.match(/^u[0-9]+/)) ? (d = "", "text" === b && (d = f.pop().value), e = d += g(h[0].substring(1))) : ("{" === e || "}" === e || "\\" == c ? (f.push({ type: "text", value: e + (v ? " " : "") }), b = "text") : (f.push({ type: "controlWord", value: e }), b = "controlWord"), e = "")) : "{" == c || "}" == c || "\\" == c ? (l = !1, f.push({ type: "text", value: c }), b = "text") : e += c : "\\" === c ? (l = !0, "" !==
                e && (f.push({ type: "text", value: e }), b = "text", e = "")) : "{" === c ? (p++, "" !== e && (f.push({ type: "text", value: e }), e = ""), f.push({ type: "openBlock", value: p }), b = "openBlock") : "}" === c ? ("" !== e && (f.push({ type: "text", value: e }), e = ""), f.push({ type: "closeBlock", value: p }), b = "closeBlock", p--) : e += c, r++;
        "" !== e && f.push({ type: "text", value: e });
        return f
    };
    a.RTFTokenizer = q;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.max,
        f, e, r, p, c, k, l, b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F, D, B, L, I, M, O, H, P = function(b) {
            this.evaluator = b;
            this.tokenizer = new a.RTFTokenizer
        };
    P.prototype.parse = function(C) {
        f = this.tokenizer.tokenize(C);
        e = {};
        p = 2;
        if ("openBlock" === f[0].type && "fonttbl" === f[1].value) {
            for (r = f[0].value;
                "closeBlock" !== f[p].type && f[p].value !== r;) e[f[p].value] = f[p + 2].value.substring(0, f[p + 2].value.length - 1), p += 3;
            p++
        }
        c = {};
        k = 0;
        if ("openBlock" === f[p].type && "colortbl" === f[p + 1].value) {
            r =
                f[p++].value;
            for (p++;
                "closeBlock" !== f[p].type && f[p].value !== r;) l = parseInt(f[p++].value.substring(3)).toString(16), b = parseInt(f[p++].value.substring(5)).toString(16), h = parseInt(f[p++].value.substring(4)).toString(16), ";" === f[p].value && p++, c[k++] = "#" + (2 > l.length ? "0" + l : l) + (2 > b.length ? "0" + b : b) + (2 > h.length ? "0" + h : h);
            p++
        }
        A = u = q = null;
        M = I = L = G = z = y = x = w = m = n = !1;
        J = [new a.TextStyle];
        E = J[0];
        D = F = -1;
        B = [];
        d = O = new a.TextNode("", "textBlock", E, this.evaluator);
        v = new a.TextNode("", "textLineBlock", E, this.evaluator);
        d.addChild(v);
        O.stableWidth = !0;
        O.hasFormula = !1;
        C = p;
        for (var N = f.length; C < N; C++) {
            if ("controlWord" == f[C].type)
                if (e[f[C].value]) E.set({ family: e[f[C].value] });
                else if (f[C].value.match(/^fs(\d+)/)) E.set({ size: parseInt(f[C].value.match(/^fs(\d+)/)[1] / 2) });
            else if ("b" == f[C].value) E.set({ bold: !0 }), 0 < B.length && B[B.length - 1].style.set({ bold: !0 });
            else if ("b0" == f[C].value) E.set({ bold: !1 }), 0 < B.length && B[B.length - 1].style.set({ bold: !1 });
            else if ("i" == f[C].value) E.set({ italic: !0 }), 0 < B.length && B[B.length - 1].style.set({ italic: !0 });
            else if ("i0" == f[C].value) E.set({ italic: !1 }), 0 < B.length && B[B.length - 1].style.set({ italic: !1 });
            else if ("ul" == f[C].value) E.set({ underline: !0 }), 0 < B.length && B[B.length - 1].style.set({ underline: !0 });
            else if ("ulnone" == f[C].value) E.set({ underline: !1 }), 0 < B.length && B[B.length - 1].style.set({ underline: !1 });
            else if ("ol" == f[C].value) E.set({ overline: !0 }), 0 < B.length && B[B.length - 1].style.set({ overline: !0 });
            else if ("olnone" == f[C].value) E.set({ overline: !1 }), 0 < B.length && B[B.length - 1].style.set({ overline: !1 });
            else if (f[C].value.match(/^cf(\d+)/)) E.set({ color: c[parseInt(f[C].value.substring(2))] }),
                0 < B.length && (B[B.length - 1].style.color = E.color);
            else if ("par" == f[C].value) {
                d = new a.TextNode("", "textLineBlock", E.clone(), this.evaluator);
                if ("textBlock" != v.nodeType)
                    for (v = v.parent;
                        "textBlock" != v.nodeType;) v = v.parent;
                v.addChild(d);
                v = d
            } else if ("mjaformula" == f[C].value) O.hasFormula = !0, D = F, n = !0, d = new a.TextNode("", "formula", E.clone(), this.evaluator), v.addChild(d), v = d, B[B.length - 1] = d;
            else if ("fraction" == f[C].value || "radicand" == f[C].value || "radical" == f[C].value || "what" == f[C].value || "sum" == f[C].value || "integral" ==
                f[C].value || "limit" == f[C].value) {
                var K = B[B.length - 2].style.clone();
                d = new a.TextNode("", f[C].value, K, this.evaluator);
                B[B.length - 2].addChild(d);
                B[B.length - 1] = d
            } else "index" == f[C].value ? (K = B[B.length - 2].style.clone(), K.size = g(parseInt(K.size - .5 * K.size), 8), d = new a.TextNode("", f[C].value, K, this.evaluator), B[B.length - 2].addChild(d), B[B.length - 1] = d) : "to" == f[C].value || "from" == f[C].value ? (K = B[B.length - 2].style.clone(), K.size = g(parseInt(K.size - .2 * K.size), 8), d = new a.TextNode("", f[C].value, K, this.evaluator), B[B.length -
                    2].addChild(d), B[B.length - 1] = d) : "num" == f[C].value || "den" == f[C].value ? (K = B[B.length - 2].style.clone(), K.size = g(Math.round(K.size - .1 * K.size), 8), "num" == f[C].value ? d = new a.TextNode("", "numerator", K, this.evaluator) : "den" == f[C].value && (d = new a.TextNode("", "denominator", K, this.evaluator)), B[B.length - 2].addChild(d), B[B.length - 1] = d) : "subix" == f[C].value || "supix" == f[C].value ? (K = B[B.length - 2].style.clone(), K.size = g(Math.floor(K.size - .33 * K.size), 8), "subix" == f[C].value ? d = new a.TextNode("", "subIndex", K, this.evaluator) :
                    "supix" == f[C].value && (d = new a.TextNode("", "superIndex", K, this.evaluator)), d.originalStyle = B[B.length - 2].style.clone(), B[B.length - 2].addChild(d), B[B.length - 1] = d) : "defparts" == f[C].value || "matrix" == f[C].value || "element" == f[C].value ? (K = B[B.length - 2].style.clone(), d = new a.TextNode("", f[C].value, K, this.evaluator), B[B.length - 2].addChild(d), B[B.length - 1] = d, "defparts" == f[C].value ? A = d : "matrix" == f[C].value && (u = d, u.matrix_type = 0)) : "parts" == f[C].value ? G = !0 : "type" == f[C].value ? x = !0 : "rows" == f[C].value ? y = !0 : "columns" ==
                f[C].value ? z = !0 : "expr" == f[C].value ? (O.stableWidth = !1, m = !0) : "decimals" == f[C].value ? w = !0 : "fixed1" == f[C].value ? q.fixed = !0 : "fixed0" == f[C].value ? q.fixed = !1 : "component" != f[C].value && ("NumCtrl" == f[C].value ? L = !0 : "Space" == f[C].value ? I = !0 : "hyperlink" == f[C].value && (M = !0));
            if ("text" == f[C].type)
                if (G) A.parts = parseInt(f[C].value), G = !1;
                else if (x) u.matrix_type = parseInt(f[C].value), x = !1;
            else if (y) u.rows = parseInt(f[C].value), y = !1;
            else if (z) u.columns = parseInt(f[C].value), z = !1;
            else if (w) q.decimals = this.evaluator.parser.parse(f[C].value +
                ""), w = !1;
            else if (M) {
                H = f[C].value.split("|")[0];
                K = E.clone();
                d = new a.TextNode(H, "hyperlink", K, this.evaluator);
                d.URL = f[C].value.split("|")[1];
                if ("textLineBlock" != v.nodeType)
                    for (v = v.parent;
                        "textLineBlock" != v.nodeType;) v = v.parent;
                v.addChild(d);
                M = !1
            } else if (L) d = new a.TextNode(f[C].value, "componentNumCtrl", E.clone(), this.evaluator), v.addChild(d), L = !1;
            else if (I) d = new a.TextNode(f[C].value, "componentSpace", E.clone(), this.evaluator), v.addChild(d), I = !1;
            else if (m) K = B[B.length - 2].style.clone(), H = this.evaluator.parser.parse(f[C].value),
                d = new a.TextNode(H, "dynamicText", K, this.evaluator), B[B.length - 2].addChild(d), q = B[B.length - 1] = d, m = !1;
            else if (m || n) !m && n && (H = f[C].value, d = new a.TextNode(H, "text", B[B.length - 1].style.clone(), this.evaluator), B[B.length - 1].addChild(d));
            else {
                H = f[C].value;
                d = new a.TextNode(H, "text", E.clone(), this.evaluator);
                if ("textLineBlock" != v.nodeType)
                    for (v = v.parent;
                        "textLineBlock" != v.nodeType;) v = v.parent;
                v.addChild(d)
            } else if ("openBlock" == f[C].type) F = f[C].value, E = E.clone(), J.push(E), B.push(null);
            else if ("closeBlock" ==
                f[C].type) f[C].value == D && (D = -1, n = !1, v = v.parent), J.pop(), E = J[J.length - 1], B.pop();
            else if ("(" == f[C].type || ")" == f[C].type) K = B[B.length - 1].style.clone(), K.italic = "", d = new a.TextNode(f[C].type, "mathSymbol", K, this.evaluator), B[B.length - 1].addChild(d);
            else if ("+" == f[C].type || "-" == f[C].type || "*" == f[C].type || "=" == f[C].type) d = new a.TextNode(f[C].type, "mathSymbol", B[B.length - 1].style.clone(), this.evaluator), B[B.length - 1].addChild(d)
        }
        return O.normalize()
    };
    a.RTFParser = P;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k, l, b, h, d, v = function(b, c) {
        this.parent = b;
        f = this.evaluator = this.parent.evaluator;
        e = f.parser;
        this.id = "";
        this.type = "2D";
        this.xExpr = e.parse("0");
        this.yExpr = e.parse("0");
        this.w = parseInt(b.container.width);
        this.h = parseInt(b.container.height);
        this.drawif = e.parse("1");
        this.fixed = !1;
        this.scale = 48;
        this.Oy = this.Ox = 0;
        this.image = new Image;
        this.image.onload = function() { this.ready = 1 };
        this.imageSrc = "";
        this.bg_display = "topleft";
        this.background = new a.Color("ffffff");
        this.net = new a.Color("b8c4c8");
        this.net10 = new a.Color("889498");
        this.axes = new a.Color("405860");
        this.numbers = this.text = !1;
        this.y_axis = this.x_axis = "";
        this.sensitive_to_mouse_movements = !1;
        this.cID = "";
        this.mouse_y = this.mouse_x = 0;
        this.ctrs = [];
        this.graphicsCtr = [];
        this.graphics = [];
        this.backGraphics = [];
        this.zIndex = b.zIndex;
        this.border_width = 0;
        this.border_color = new a.Color("000000");
        this.border_radius = 0;
        this.plecaHeight = b.plecaHeight || 0;
        this.displaceRegionNorth = b.displaceRegionNorth || 0;
        this.displaceRegionWest =
            b.displaceRegionWest || 0;
        Object.assign(this, c);
        this.initSpace()
    };
    v.prototype.initSpace = function() {
        var a = this;
        g = a.parent;
        f = a.evaluator;
        r = a.id;
        a.resizable || (a.displaceRegionNorth = g.displaceRegionNorth || 0, a.displaceRegionSouth = g.displaceRegionSouth || 0, a.displaceRegionEast = g.displaceRegionEast || 0, a.displaceRegionWest = g.displaceRegionWest || 0, l = parseInt(g.container.width), k = parseInt(g.container.height), void 0 != a.wExpr && (a.w = parseInt(l - a.displaceRegionWest - a.displaceRegionEast) * parseFloat(a.wExpr) / 100), void 0 !=
            a.hExpr && (a.h = parseInt(k - a.displaceRegionNorth - a.displaceRegionSouth) * parseFloat(a.hExpr) / 100), void 0 != a.xPercentExpr && (a.xExpr = f.parser.parse((parseInt(l - a.displaceRegionWest - this.displaceRegionEast) * parseFloat(a.xPercentExpr) / 100).toString())), void 0 != a.yPercentExpr && (a.yExpr = f.parser.parse((parseInt(k - a.displaceRegionNorth - a.displaceRegionSouth) * parseFloat(a.yPercentExpr) / 100).toString())), a.x = f.eval(a.xExpr) + a.displaceRegionWest, a.y = f.eval(a.yExpr) + a.plecaHeight + a.displaceRegionNorth, a.container &&
            (a.container.style.left = a.x + "px", a.container.style.top = a.y + "px"), 0 <= a.y ? (p = k - a.y, a.h > p && (a.h = p)) : (p = a.h + a.y, a.h = p >= k ? k : p), 0 <= a.x ? (c = l - a.x, a.w > c && (a.w = c)) : (c = a.w + a.x, a.w = c >= l ? l : c));
        "" == a.imageSrc && /vacio.gif$/i.test(a.imageSrc.trim()) || (a.image = g.getImage(a.imageSrc));
        a.OxExpr && (h = a.OxExpr, "%" === h[h.length - 1] ? a.Ox = a.w * parseFloat(h) / 100 : (b = parseFloat(h), b != h && (b = 0), a.Ox = b));
        a.OyExpr && (d = a.OyExpr, "%" === d[d.length - 1] ? a.Oy = a.h * parseFloat(d) / 100 : (b = parseFloat(d), b != d && (b = 0), a.Oy = b));
        "" !== a.id && 2 !== g.version ?
            (f.setVariable(r + "._w", a.w), f.setVariable(r + "._h", a.h), f.setVariable(r + ".escala", a.scale), f.setVariable(r + ".Ox", a.Ox), f.setVariable(r + ".Oy", a.Oy), f.setVariable(r + ".mouse_x", 0), f.setVariable(r + ".mouse_y", 0), f.setVariable(r + ".mouse_pressed", 0), f.setVariable(r + ".mouse_clicked", 0), f.setVariable(r + ".clic_izquierdo", 0)) : (b = f.getVariable("_w"), void 0 === b && (b = a.w), f.setVariable("_w", b), b = f.getVariable("_h"), void 0 === b && (b = a.h), f.setVariable("_h", b), b = f.getVariable("escala"), void 0 === b && (b = a.scale), f.setVariable("escala",
                b), b = f.getVariable("Ox"), void 0 === b && (b = a.Ox), f.setVariable("Ox", b), b = f.getVariable("Oy"), void 0 === b && (b = a.Oy), f.setVariable("Oy", b), f.setVariable("mouse_x", 0), f.setVariable("mouse_y", 0), f.setVariable("mouse_pressed", 0), f.setVariable("mouse_clicked", 0), f.setVariable("clic_izquierdo", 0), 2 == g.version && "" === a.x_axis && "" === a.y_axis && (a.axes = ""));
        a.w_2 = a.w / 2;
        a.h_2 = a.h / 2;
        f.setFunction(r + ".download_image", function(b) { a.evaluator.functions._SaveSpace_(b, a.canvas.toDataURL("image/png")) })
    };
    v.prototype.addCtr =
        function(a) { "GraphicControl" === a.type ? this.graphicsCtr.push(a) : this.ctrs.push(a) };
    v.prototype.addGraph = function(a, b) { "2D" === this.type && b || "3D" === this.type && !b || (a.background && "3D" !== this.type ? this.backGraphics.push(a) : this.graphics.push(a)) };
    v.prototype.clearClick = function() {
        this.evaluator.setVariable(this.mclickedString, 0);
        this.evaluator.setVariable(this.mclicizquierdoString, 0)
    };
    v.prototype.getRelativeX = function(a) { return (parseInt(a) - this.w_2 - this.Ox) / this.scale };
    v.prototype.getRelativeY = function(a) {
        return (-parseInt(a) +
            this.h_2 + this.Oy) / this.scale
    };
    v.prototype.getAbsoluteX = function(a) { return a * this.scale + this.w_2 + this.Ox };
    v.prototype.getAbsoluteY = function(a) { return -a * this.scale + this.h_2 + this.Oy };
    a.Space = v;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f = function(e) {
        g = this;
        g.parent = e;
        g.width = 228;
        g.vSpace = 25;
        g.container = a.newHTML("div", { style: "box-sizing:border-box;border-style:ridge;border-width:5px;border-color:gray;box-shadow:#000 0 0 25px 5px;overflow-y:scroll;overflow-x:hidden;position:fixed;left:0;top:0;z-index:10000;background-color:#63b4fb;width:" + (g.width + 27) + "px;height:460px;" });
        g.movable = a.newHTML("div", {
            style: "position:absolute;left:0;top:0;width:" + (g.width + 27) + "px;height:" + g.vSpace +
                "px;line-height:" + g.vSpace + "px;background-color:#ddd;cursor:move;padding-left:75px;font-family:" + a.sansserif_font + ";font-size:18px;"
        });
        g.movable.innerHTML = "Descartes";
        g.container.appendChild(g.movable);
        g.ctrs = []
    };
    f.prototype.init = function() {
        function e(c) {
            g.newPos = a.getCursorPosition(c, document.body);
            g.container.style.left = g.initialPosition.x + (g.newPos.x - g.oldPos.x) * a.cssScale + "px";
            g.container.style.top = g.initialPosition.y + (g.newPos.y - g.oldPos.y) * a.cssScale + "px"
        }

        function f(a) {
            a.preventDefault();
            document.body.removeEventListener("mousemove",
                e);
            document.body.removeEventListener("mouseup", f)
        }
        g = this;
        document.body.appendChild(this.container);
        for (var p = g.parent.evaluator.parser, c = 0, k = g.ctrs.length; c < k; c++) g.ctrs[c].expresion = p.parse("(0," + (g.vSpace + 23 + 35 * c) + "," + g.width + ",35)"), g.ctrs[c].update();
        g.numCtr = k;
        c = new a.Button(g.parent, { region: "external", name: "english" == g.language ? "about" : "cr\u00e9ditos", font_size: p.parse("15"), expresion: p.parse("(0," + g.vSpace + "," + g.width / 2 + ",25)") });
        c.actionExec = { execute: a.showAbout };
        c.update();
        (new a.Button(g.parent, { region: "external", name: "config", font_size: p.parse("15"), action: "config", expresion: p.parse("(" + g.width / 2 + "," + g.vSpace + "," + g.width / 2 + ",25)") })).update();
        (new a.Button(g.parent, { region: "external", name: "english" == g.language ? "init" : "inicio", font_size: p.parse("15"), action: "init", expresion: p.parse("(0," + (g.vSpace + 23 + 35 * k) + "," + g.width / 2 + ",25)") })).update();
        (new a.Button(g.parent, {
            region: "external",
            name: "english" == g.language ? "clear" : "limpiar",
            font_size: p.parse("15"),
            action: "clear",
            expresion: p.parse("(" + g.width /
                2 + "," + (g.vSpace + 23 + 35 * k) + "," + g.width / 2 + ",25)")
        })).update();
        p = new a.Button(g.parent, { region: "external", name: "english" == g.language ? "close" : "cerrar", font_size: p.parse("15"), expresion: p.parse("(" + g.width / 4 + "," + (g.vSpace + 46 + 35 * k) + "," + g.width / 2 + ",25)") });
        p.update();
        p.btn.addEventListener("click", function(a) { g.hide() });
        g.setPositionAndSize();
        g.movable.addEventListener("mousedown", function(c) {
            c.preventDefault();
            g.oldPos = a.getCursorPosition(c, document.body);
            g.initialPosition = { x: g.container.offsetLeft, y: g.container.offsetTop };
            document.body.addEventListener("mousemove", e);
            document.body.addEventListener("mouseup", f)
        });
        g.hide()
    };
    f.prototype.addCtr = function(a) { this.ctrs.push(a) };
    f.prototype.show = function() {
        this.setPositionAndSize();
        this.container.style.display = "block"
    };
    f.prototype.hide = function() { this.container.style.display = "none" };
    f.prototype.setPositionAndSize = function() {
        g = this;
        var a = g.vSpace + 46 + 35 * g.numCtr + 25 + 10;
        g.container.style.left = Math.max(parseInt(window.innerWidth - g.width) / 2, 0) + "px";
        g.container.style.top = "5px";
        g.container.style.height =
            window.innerHeight < g.vSpace + 75 ? g.vSpace + 75 + "px" : a > window.innerHeight - 10 ? window.innerHeight - 10 : a + "px"
    };
    a.SpaceExternal = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = Math.floor,
        f = Math.round,
        e = 2 * Math.PI,
        r = a.convertFont("Serif,BOLD+ITALIC,16"),
        p = a.convertFont("Monospaced,PLAIN,12"),
        c, k, l, b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F, D, B, L, I, M, O, H, P, C, N, K, Q, R = function(b, d) {
            c = d = a.Space.call(this, b, d) || this;
            c.ratio = b.ratio;
            c.canvas = a.newHTML("canvas", { id: c.id + "_canvas", class: "DescartesSpace2DCanvas", width: c.w * c.ratio });
            c.backCanvas = a.newHTML("canvas", { id: c.id + "_background", width: c.w * c.ratio });
            c.canvas.style = c.backCanvas.style =
                (0 < c.border_width ? "border:" + c.border_width + "px solid " + c.border_color.getColor() + ";" : "") + (c.border_radius ? "border-radius:" + c.border_radius + "px;" : "");
            c.canvas.style.zIndex = c.zIndex;
            c.canvas.style.width = c.backCanvas.style.width = c.w + "px";
            c.canvas.style.height = c.backCanvas.style.height = c.h + "px";
            c.ctx = c.canvas.getContext("2d");
            c.backCtx = c.backCanvas.getContext("2d");
            c.ctx.imageSmoothingEnabled = c.backCtx.imageSmoothingEnabled = !1;
            c.graphicControlContainer = a.newHTML("div", {
                id: c.id + "_graphicControls",
                style: "position:absolute;left:0;top:0;z-index:" +
                    c.zIndex + ";"
            });
            c.numericalControlContainer = a.newHTML("div", { id: c.id + "_numericalControls", style: "position:absolute;left:0;top:0;z-index:" + c.zIndex + ";" });
            c.container = a.newHTML("div", { id: c.id, class: "DescartesSpace2DContainer", style: "z-index:" + c.zIndex + ";" });
            c.parent.arquimedes && "#f0f8fa" === c.background.getColor() && (c.container.style.boxShadow = "0 0 5px 0 #b8c4c8");
            c.container.appendChild(c.backCanvas);
            c.container.appendChild(c.canvas);
            c.container.appendChild(c.graphicControlContainer);
            c.container.appendChild(c.numericalControlContainer);
            b.container.insertBefore(c.container, b.loader);
            var e = c.id + ".image";
            c.parent.images[e] = c.canvas;
            c.parent.images[e].ready = 1;
            c.parent.images[e].complete = c.parent.images[e].canvas = !0;
            c.evaluator.setVariable(e, e);
            e = c.id + ".back";
            c.parent.images[e] = c.backCanvas;
            c.parent.images[e].ready = 1;
            c.parent.images[e].complete = c.parent.images[e].canvas = !0;
            c.evaluator.setVariable(e, e);
            e = "" !== c.id && 2 !== b.version ? c.id + "." : "";
            c.OxStr = e + "Ox";
            c.OyStr = e + "Oy";
            c.scaleStr = e + "escala";
            c.wStr = e + "_w";
            c.hStr = e + "_h";
            c.mxStr = e + "mouse_x";
            c.myStr = e + "mouse_y";
            c.mpressedStr = e + "mouse_pressed";
            c.mclickedStr = e + "mouse_clicked";
            c.mclickIzqStr = e + "clic_izquierdo";
            c.click = 0;
            c.resizable && (c.wModExpr = b.evaluator.parser.parse(c.wModExpr), c.hModExpr = b.evaluator.parser.parse(c.hModExpr));
            "descartesJS_stage" !== c.id ? c.addEvents() : c.canvas.oncontextmenu = function(a) { return !1 };
            return d
        };
    $jscomp.inherits(R, a.Space);
    R.prototype.init = function() {
        c = this;
        this.initSpace();
        c.canvas && (c.old_w = c.w, c.old_h = c.h, c.canvas.width = c.backCanvas.width = c.w * c.ratio, c.canvas.height =
            c.backCanvas.height = c.h * c.ratio, c.canvas.style.width = c.backCanvas.style.width = c.w + "px", c.canvas.style.height = c.backCanvas.style.height = c.h + "px")
    };
    R.prototype.update = function(a) {
        c = this;
        k = c.evaluator;
        l = c.parent;
        if (c.resizable) {
            if (C = c.evaluator.eval(c.wModExpr), N = c.evaluator.eval(c.hModExpr), c.old_w != C || c.old_h != N) c.w = C, c.h = N, c.w_2 = c.w / 2, c.h_2 = c.h / 2, k.setVariable(c.wStr, c.w), k.setVariable(c.hStr, c.h), c.old_w = c.w, c.old_h = c.h, c.canvas.width = c.backCanvas.width = c.w * c.ratio, c.canvas.height = c.backCanvas.height =
                c.h * c.ratio, c.canvas.style.width = c.backCanvas.style.width = c.w + "px", c.canvas.style.height = c.backCanvas.style.height = c.h + "px", a = !0
        } else k.setVariable(c.wStr, c.w), k.setVariable(c.hStr, c.h);
        c.drawIfValue = 0 < k.eval(c.drawif);
        if (c.drawIfValue) {
            h = c.x !== k.eval(c.xExpr) + c.displaceRegionWest;
            d = c.y !== k.eval(c.yExpr) + l.plecaHeight + c.displaceRegionNorth;
            c.spaceChange = a || h || d || c.drawBefore !== c.drawIfValue || c.Ox !== k.getVariable(c.OxStr) || c.Oy !== k.getVariable(c.OyStr) || c.scale !== k.getVariable(c.scaleStr) || c.backColor !==
                c.background.getColor();
            c.x = h ? k.eval(c.xExpr) + c.displaceRegionWest : c.x;
            c.y = d ? k.eval(c.yExpr) + l.plecaHeight + c.displaceRegionNorth : c.y;
            c.Ox = k.getVariable(c.OxStr);
            c.Oy = k.getVariable(c.OyStr);
            c.scale = k.getVariable(c.scaleStr);
            c.drawBefore = c.drawIfValue;
            c.scale = Math.max(1E-6, Math.min(1E6, c.scale));
            k.setVariable(c.scaleStr, c.scale);
            if (h || d) c.container.style.left = c.x + "px", c.container.style.top = c.y + "px";
            c.container.style.display = "block";
            c.drawTrace = !c.spaceChange && (!c.fixed && !c.click || c.fixed);
            c.spaceChange &&
                (c.backCtx.setTransform(c.ratio, 0, 0, c.ratio, 0, 0), c.drawBackground());
            c.ctx.setTransform(c.ratio, 0, 0, c.ratio, 0, 0);
            c.draw()
        } else c.container.style.display = "none"
    };
    R.prototype.drawBackground = function() {
        c = this;
        k = c.evaluator;
        b = c.backCtx;
        b.clearRect(0, 0, c.backCanvas.width, c.backCanvas.height);
        b.fillStyle = c.backColor = c.background.getColor();
        b.fillRect(0, 0, c.backCanvas.width, c.backCanvas.height);
        c.image && "" != c.image.src && c.image.ready && c.image.complete && ("topleft" === c.bg_display ? b.drawImage(c.image, 0, 0) :
            "stretch" === c.bg_display ? b.drawImage(c.image, 0, 0, c.w, c.h) : "patch" === c.bg_display ? (b.fillStyle = b.createPattern(c.image, "repeat"), b.fillRect(0, 0, c.w, c.h)) : "imgcenter" === c.bg_display && b.drawImage(c.image, (c.w - c.image.width) / 2, (c.h - c.image.height) / 2));
        q = c.scale;
        u = 0;
        for (A = 0 > c.w + c.h ? 0 : c.w + c.h; q > A;) q /= 10, u++;
        for (; q < A / 10;) q *= 10;
        b.lineWidth = 1;
        "" !== c.net && (b.strokeStyle = c.net.getColor(), c.drawMarks(b, q / 10, -1));
        if (2 !== c.parent.version && "" !== c.net10 || 2 === c.parent.version && "" !== c.net && "" !== c.net10) b.strokeStyle =
            c.net10.getColor(), c.drawMarks(b, q, -1);
        if ("" !== c.axes) {
            var a = "";
            "no" == c.x_axis && (a += "x");
            "no" == c.y_axis && (a += "y");
            b.strokeStyle = c.axes.getColor();
            b.beginPath();
            "no" == c.x_axis || "" === c.x_axis && 2 === c.parent.version || (b.moveTo(0, g(c.h / 2 + c.Oy) + .5), b.lineTo(c.w, g(c.h / 2 + c.Oy) + .5));
            "no" == c.y_axis || "" === c.y_axis && 2 === c.parent.version || (b.moveTo(g(c.w / 2 + c.Ox) + .5, 0), b.lineTo(g(c.w / 2 + c.Ox) + .5, c.h));
            b.lineWidth = 1.2;
            b.stroke();
            b.lineWidth = 1;
            c.drawMarks(b, q, 4, a);
            c.drawMarks(b, q / 2, 2, a);
            c.drawMarks(b, q / 10, 1, a)
        }
        if ("" !==
            c.x_axis || "" !== c.y_axis) b.fillStyle = "" !== c.axes ? c.axes.getColor() : "#000", b.font = r, b.textAlign = "right", b.textBaseline = "alphabetic", "no" != c.x_axis && b.fillText(c.x_axis, g(c.w) - 2, g(c.h / 2 + c.Oy) + 12), "no" != c.y_axis && b.fillText(c.y_axis, g(c.w / 2 + c.Ox) - 2, 12);
        c.numbers && "" != c.axes && (b.fillStyle = c.axes.getColor(), b.font = r, b.textAlign = "start", b.textBaseline = "bottom", q > (c.w + c.h) / 2 ? c.drawNumbers(b, q / 5, q <= c.scale ? u + 1 : u) : q > (c.w + c.h) / 4 ? c.drawNumbers(b, q / 2, q <= c.scale ? u + 1 : u) : c.drawNumbers(b, q, u));
        a = 0;
        for (var d = this.backGraphics.length; a <
            d; a++) this.backGraphics[a].draw()
    };
    R.prototype.draw = function() {
        c = this;
        b = c.ctx;
        b.clearRect(0, 0, c.canvas.width, c.canvas.height);
        for (var a = 0, d = c.graphics.length; a < d; a++) v = c.graphics[a], "" !== v.trace && c.drawTrace && v.drawTrace(), v.draw();
        a = 0;
        for (d = c.graphicsCtr.length; a < d; a++) c.graphicsCtr[a].draw();
        "" != c.text && c.click && "L" === c.whichBtn && (b.save(), b.strokeStyle = b.fillStyle = c.text.getColor(), b.lineWidth = 1, b.font = p, b.textAlign = "center", b.textBaseline = "alphabetic", D = 1 >= c.scale ? c.mouse_x.toFixed(0) : c.mouse_x.toFixed(parseInt(c.scale).toString().length +
            1), B = 1 >= c.scale ? c.mouse_y.toFixed(0) : c.mouse_y.toFixed(parseInt(c.scale).toString().length + 1), L = "(" + D + "," + B + ")", I = g(b.measureText(L).width / 2), M = c.getAbsoluteX(c.mouse_x), O = c.getAbsoluteY(c.mouse_y), H = g(M), P = g(O - 10), H + I > c.w ? H = c.w - I : 0 > H - I && (H = I), P + 1 > c.h ? P = c.h : 0 > P - 14 && (P = 15), b.fillText(L, H, P), b.beginPath(), b.arc(M, O, 2.5, 0, e, !0), b.stroke(), b.restore())
    };
    R.prototype.drawMarks = function(a, b, c, d) {
        n = this.w;
        m = this.h;
        E = G = 0;
        J = n;
        F = m;
        y = g(n / 2 + this.Ox);
        z = g(m / 2 + this.Oy);
        0 <= c && (G = y - c, J = y + c, E = z - c, F = z + c);
        a.beginPath();
        if (!d || d && !d.match("x"))
            for (c = -f(y / b);
                (w = y + f(c * b)) < n; c++) a.moveTo(w + .5, E + .5), a.lineTo(w + .5, F + .5);
        if (!d || d && !d.match("y"))
            for (c = -f(z / b);
                (x = z + f(c * b)) < m; c++) a.moveTo(G + .5, x + .5), a.lineTo(J + .5, x + .5);
        a.stroke()
    };
    R.prototype.drawNumbers = function(a, b, c) {
        n = this.w;
        m = this.h;
        y = g(n / 2 + this.Ox);
        z = g(m / 2 + this.Oy);
        for (c = -f(y / b);
            (w = y + f(c * b)) < n; c++) a.fillText(parseFloat((c * b / this.scale).toFixed(4)), w + 1, z - 2);
        for (c = -f(z / b);
            (x = z + f(c * b)) < m; c++) 0 !== parseFloat(-c * b / this.scale) && a.fillText(parseFloat((-c * b / this.scale).toFixed(4)),
            y + 5, x + 5)
    };
    R.prototype.addEvents = function() {
        function b(a) {
            window.focus();
            document.activeElement.blur();
            if (f.evaluator.variables[f.id + ".DESCARTESJS_no_fixed"] || !f.fixed || f.sensitive_to_mouse_movements) f.click = 0, f.evaluator.setVariable(f.mpressedStr, 0), f.evaluator.setVariable(f.mclickedStr, 1), f.evaluator.setVariable(f.mclickIzqStr, 1), window.removeEventListener("touchmove", h), window.removeEventListener("touchend", b), a.stopPropagation(), a.preventDefault(), f.parent.update()
        }

        function c(b) {
            document.activeElement.blur();
            window.focus();
            b.stopPropagation();
            b.preventDefault();
            f.click = 0;
            f.evaluator.setVariable(f.mpressedStr, 0);
            f.evaluator.setVariable(f.mclickedStr, 1);
            f.evaluator.setVariable(f.mclickIzqStr, 1);
            "R" === f.whichBtn && (window.removeEventListener("mousemove", e), f.posZoom == f.posZoomNew && a.showConfig && (f.parent.externalSpace.show(), f.posZoom = !1, f.posZoomNew = !0));
            window.removeEventListener("mousemove", h);
            window.removeEventListener("mouseup", c);
            f.parent.deactivateGraphicControls();
            f.parent.update()
        }

        function d(b) {
            f.posAnte =
                a.getCursorPosition(b, f.container);
            f.mouse_x = f.getRelativeX(f.posAnte.x);
            f.mouse_y = f.getRelativeY(f.posAnte.y);
            f.evaluator.setVariable(f.mxStr, f.mouse_x);
            f.evaluator.setVariable(f.myStr, f.mouse_y);
            f.evaluator.setVariable(f.mclickedStr, 0);
            f.evaluator.setVariable(f.mclickIzqStr, 0);
            f.parent.update()
        }

        function e(b) {
            b.preventDefault();
            f.posZoomNew = a.getCursorPosition(b, f.container).y;
            f.evaluator.setVariable(f.scaleStr, f.tempScale + f.tempScale / 45 * ((f.posZoom - f.posZoomNew) / 10));
            f.parent.update()
        }

        function h(b) {
            b.preventDefault();
            b.stopPropagation();
            f.fixed || (f.posNext = a.getCursorPosition(b, f.container), K = f.posAnte.x - f.posNext.x, Q = f.posAnte.y - f.posNext.y, f.evaluator.setVariable(f.OxStr, f.Ox - K), f.evaluator.setVariable(f.OyStr, f.Oy - Q));
            d(b)
        }
        var f = this;
        f.posZoom = f.posZoomNew = null;
        f.canvas.oncontextmenu = function(a) { return !1 };
        this.sensitive_to_mouse_movements && this.canvas.addEventListener("touchmove", d);
        this.canvas.addEventListener("touchstart", function(a) {
            window.focus();
            document.activeElement.blur();
            if (f.evaluator.variables[f.id +
                    ".DESCARTESJS_no_fixed"] || !f.fixed || f.sensitive_to_mouse_movements) f.parent.clearClick(), f.click = 1, f.evaluator.setVariable(f.mpressedStr, 1), f.evaluator.setVariable(f.mclickedStr, 0), f.evaluator.setVariable(f.mclickIzqStr, 0), f.parent.deactivateGraphicControls(), d(a), window.addEventListener("touchmove", h), window.addEventListener("touchend", b), a.stopPropagation(), a.preventDefault()
        });
        this.sensitive_to_mouse_movements && this.canvas.addEventListener("mousemove", d);
        this.canvas.addEventListener("mousedown",
            function(b) {
                window.focus();
                document.activeElement.blur();
                b.stopPropagation();
                b.preventDefault();
                f.parent.clearClick();
                f.click = 1;
                f.parent.deactivateGraphicControls();
                f.whichBtn = a.whichBtn(b);
                "R" === f.whichBtn ? (window.addEventListener("mouseup", c), f.posZoom = a.getCursorPosition(b, f.container).y, f.posZoomNew = f.posZoom, f.fixed || (f.tempScale = f.scale, window.addEventListener("mousemove", e))) : "L" === f.whichBtn && (f.evaluator.setVariable(f.mpressedStr, 1), f.evaluator.setVariable(f.mclickedStr, 0), f.evaluator.setVariable(f.mclickIzqStr,
                    0), d(b), window.addEventListener("mousemove", h), window.addEventListener("mouseup", c))
            });
        document.addEventListener("visibilitychange", function(a) { c(a) });
        document.addEventListener("mouseleave", function(a) {
            f.click = 0;
            f.evaluator.setVariable(f.mpressedStr, 0);
            f.evaluator.setVariable(f.mclickedStr, 1);
            f.evaluator.setVariable(f.mclickIzqStr, 1);
            window.removeEventListener("mousemove", h);
            window.removeEventListener("mouseup", c)
        })
    };
    a.Space2D = R;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    var g, f, e;

    function r(b, c) {
        H = a.subtract3D(b, a.scalarProduct3D(c, a.dotProduct3D(b, c)));
        P = a.add3D(b, a.scalarProduct3D(H, -2));
        C = a.norm3D(P);
        return 0 !== C ? a.scalarProduct3D(P, 1 / C) : a.scalarProduct3D(b, -1)
    }
    if (a.loadLib) return a;
    var p = Math.floor,
        c = Math.max,
        k = Math.cos,
        l = Math.sin,
        b, h, d, v, q, u, A, n, m, w, x, y, z, G, J, E, F = [],
        D, B, L, I, M, O, H, P, C, N, K, Q = function(b, c) {
            d = c = a.Space.call(this, b, c) || this;
            d.backCanvas = a.newHTML("canvas", { id: d.id + "_background", width: d.w + "px", height: d.h + "px" });
            d.canvas = a.newHTML("canvas", { id: d.id + "_canvas", width: d.w + "px", height: d.h + "px", class: "DescartesSpace3DCanvas", style: "z-index: " + d.zIndex + ";" });
            d.ctx = d.canvas.getContext("2d");
            d.ctx.imageSmoothingEnabled = !1;
            d.canvas.style = d.backCanvas.style = (0 < d.border_width ? "border:" + d.border_width + "px solid " + d.border_color.getColor() + ";" : "") + (d.border_radius ? "border-radius:" + d.border_radius + "px;" : "");
            var e = d.id + ".image";
            d.parent.images[e] = d.canvas;
            d.parent.images[e].ready = 1;
            d.parent.images[e].complete = !0;
            d.parent.images[e].canvas = !0;
            d.evaluator.setVariable(e,
                e);
            d.graphicControlContainer = a.newHTML("div", { id: d.id + "_graphicControls", style: "position:absolute;left:0px;top:0px;z-index:" + d.zIndex + ";" });
            d.numericalControlContainer = a.newHTML("div", { id: d.id + "_numericalControls", style: "position:absolute;left:0px;top:0px;z-index:" + d.zIndex + ";" });
            d.container = a.newHTML("div", { id: d.id, class: "DescartesSpace3DContainer", style: "z-index:" + d.zIndex + ";" });
            d.container.appendChild(d.backCanvas);
            d.container.appendChild(d.canvas);
            d.container.appendChild(d.graphicControlContainer);
            d.container.appendChild(d.numericalControlContainer);
            b.container.insertBefore(d.container, b.loader);
            d.eye = { x: 0, y: 0, z: 0 };
            d.lights = [{ x: 50, y: 50, z: 70 }, { x: 50, y: -50, z: 30 }, { x: 20, y: 0, z: -80 }, { x: 0, y: 0, z: 0 }];
            e = 0;
            for (var f = d.lights.length; e < f; e++) d.lights[e] = a.normalize3D(d.lights[e]);
            d.light3 = { x: 0, y: 0, z: 0 };
            d.intensity = [.4, .5, .3, 0];
            d.userIntensity = 0;
            d.dim = 1;
            d.tmpIntensity = [];
            d.OxStr = d.id + ".Ox";
            d.OyStr = d.id + ".Oy";
            d.scaleStr = d.id + ".escala";
            d.wStr = d.id + "._w";
            d.hStr = d.id + "._h";
            d.obsStr = d.id + ".observador";
            d.ojoXStr =
                d.id + ".Ojo.x";
            d.ojoYStr = d.id + ".Ojo.y";
            d.ojoZStr = d.id + ".Ojo.z";
            d.rotZStr = d.id + ".rot.z";
            d.rotYStr = d.id + ".rot.y";
            d.userIDimStr = d.id + ".userIlum.dim";
            d.userIIStr = d.id + ".userIlum.I";
            d.userIxStr = d.id + ".userIlum.x";
            d.userIyStr = d.id + ".userIlum.y";
            d.userIzStr = d.id + ".userIlum.z";
            d.evaluator.setVariable(d.rotZStr, 0);
            d.evaluator.setVariable(d.rotYStr, 0);
            d.evaluator.setVariable(d.userIDimStr, d.dim);
            d.evaluator.setVariable(d.userIIStr, d.userIntensity);
            d.evaluator.setVariable(d.userIxStr, 0);
            d.evaluator.setVariable(d.userIyStr,
                0);
            d.evaluator.setVariable(d.userIzStr, 0);
            K = new a.Primitive3D({ vertices: [new a.Vector4D(0, 0, 0, 1)], type: "vertex" }, d);
            d.evaluator.setFunction(d.id + "._X3D2D_", function(a, b, c) {
                K.vertices[0].x = a;
                K.vertices[0].y = b;
                K.vertices[0].z = c;
                K.computeDepth(d);
                return K.projVert[0].x
            });
            d.evaluator.setFunction(d.id + "._Y3D2D_", function(a, b, c) {
                K.vertices[0].x = a;
                K.vertices[0].y = b;
                K.vertices[0].z = c;
                K.computeDepth(d);
                return K.projVert[0].y
            });
            d.resizable && (d.wModExpr = b.evaluator.parser.parse(d.wModExpr), d.hModExpr = b.evaluator.parser.parse(d.hModExpr));
            d.ratio = 1;
            d.addEvents();
            return c
        };
    $jscomp.inherits(Q, a.Space);
    Q.prototype.init = function(a) {
        d = this;
        d.initSpace();
        d.canvas && (d.canvas.width = d.backCanvas.width = d.w, d.canvas.height = d.backCanvas.height = d.h, d.canvas.style.width = d.backCanvas.style.width = d.w + "px", d.canvas.style.height = d.backCanvas.style.height = d.h + "px");
        d.w_2 = d.w / 2;
        d.h_2 = d.h / 2;
        d.w_plus_h = d.w + d.h;
        d.oldMouse = { x: 0, y: 0 };
        d.S = { x: d.h / 1080 * -20.6 * (40 / d.scale), y: 0, z: 0 };
        d.Ojo = { x: 3 * d.w_2, y: 0, z: 0 };
        d.evaluator.setVariable(d.ojoXStr, d.Ojo.x);
        d.evaluator.setVariable(d.ojoYStr,
            d.Ojo.y);
        d.evaluator.setVariable(d.ojoZStr, d.Ojo.z)
    };
    Q.prototype.update = function(a) {
        d = this;
        b = d.evaluator;
        h = d.parent;
        b.setVariable(d.wStr, d.w);
        b.setVariable(d.hStr, d.h);
        d.drawIfValue = 0 < b.eval(d.drawif);
        if (d.drawIfValue) {
            d.resizable && (wModExpr = d.evaluator.eval(d.wModExpr), hModExpr = d.evaluator.eval(d.hModExpr), d.old_w != wModExpr || d.old_h != hModExpr) && (d.w = wModExpr, d.h = hModExpr, d.w_2 = d.w / 2, d.h_2 = d.h / 2, b.setVariable(d.wStr, d.w), b.setVariable(d.hStr, d.h), d.old_w = d.w, d.old_h = d.h, d.canvas.width = d.backCanvas.width =
                d.w * d.ratio, d.canvas.height = d.backCanvas.height = d.h * d.ratio, d.canvas.style.width = d.backCanvas.style.width = d.w + "px", d.canvas.style.height = d.backCanvas.style.height = d.h + "px", a = !0, d.S = { x: d.h / 1080 * -20.6 * (40 / d.scale), y: 0, z: 0 }, d.Ojo = { x: 3 * d.w_2, y: 0, z: 0 }, d.evaluator.setVariable(d.ojoXStr, d.Ojo.x), d.evaluator.setVariable(d.ojoYStr, d.Ojo.y), d.evaluator.setVariable(d.ojoZStr, d.Ojo.z));
            u = d.x !== b.eval(d.xExpr) + d.displaceRegionWest;
            A = d.y !== b.eval(d.yExpr) + h.plecaHeight + d.displaceRegionNorth;
            d.spaceChange = a || u ||
                A || d.drawBefore !== d.drawIfValue || d.Ox !== b.getVariable(d.OxStr) || d.Oy !== b.getVariable(d.OyStr) || d.Ojo.x !== b.getVariable(d.ojoXStr) || d.Ojo.y !== b.getVariable(d.ojoYStr) || d.Ojo.z !== b.getVariable(d.ojoZStr) || d.scale !== b.getVariable(d.scaleStr);
            d.x = u ? b.eval(d.xExpr) + d.displaceRegionWest : d.x;
            d.y = A ? b.eval(d.yExpr) + h.plecaHeight + d.displaceRegionNorth : d.y;
            d.Ojo.x = b.getVariable(d.ojoXStr);
            d.Ojo.y = b.getVariable(d.ojoYStr);
            d.Ojo.z = b.getVariable(d.ojoZStr);
            d.Ox = b.getVariable(d.OxStr);
            d.Oy = b.getVariable(d.OyStr);
            d.scale = b.getVariable(d.scaleStr);
            d.drawBefore = d.drawIfValue;
            if (a || void 0 == d.observer) {
                a = 0;
                for (var e = d.parent.controls.length; a < e; a++) d.parent.controls[a].id === d.obsStr && (N = !0);
                d.observer = N ? b.getVariable(d.obsStr) || 2.5 * d.w_plus_h : 2.5 * d.w_plus_h;
                d.observer = c(d.observer, .25 * d.w_plus_h);
                b.setVariable(d.obsStr, d.observer)
            }
            1E-6 > d.scale ? (d.scale = 1E-6, b.setVariable(d.scaleStr, 1E-6)) : 1E6 < d.scale && (d.scale = 1E6, b.setVariable(d.scaleStr, 1E6));
            if (u || A) d.container.style.left = d.x + "px", d.container.style.top = d.y +
                "px";
            d.container.style.display = "block";
            d.dim = b.getVariable(d.userIDimStr);
            d.userIntensity = b.getVariable(d.userIIStr);
            d.light3 = { x: parseInt(b.getVariable(d.userIxStr)), y: parseInt(b.getVariable(d.userIyStr)), z: parseInt(b.getVariable(d.userIzStr)) };
            d.updateCamera();
            d.draw()
        } else d.container.style.display = "none"
    };
    Q.prototype.updateCamera = function() { this.eye = a.scalarProduct3D(this.Ojo, 1 / this.scale) };
    Q.prototype.rotateVertex = function(b) {
        w = a.degToRad(d.evaluator.getVariable(d.rotZStr));
        x = k(w);
        y = l(w);
        g = b.x *
            x - b.y * y;
        f = b.x * y + b.y * x;
        e = b.z;
        w = a.degToRad(d.evaluator.getVariable(d.rotYStr));
        x = k(w);
        y = l(w);
        return { x: e * y + g * x, y: f, z: e * x - g * y }
    };
    Q.prototype.project = function(a) {
        d = this;
        this.evaluator.getVariable("URL.oldProj");
        var b = d.eye.x / (a.x - d.eye.x);
        return { x: d.getAbsoluteX(b * (d.eye.y - a.y)), y: d.getAbsoluteY(b * (d.eye.z - a.z)), z: d.eye.x - a.x }
    };
    Q.prototype.computeColor = function(b, c, d) {
        b.match("rgba") ? b = a.RGBAToHexColor(b) : b.match("#") && (b = new a.Color(b.substring(1)));
        I = a.subtract3D(this.eye, c.average);
        M = a.norm3D(I);
        O = a.scalarProduct3D(I,
            1 / M);
        this.lights[3] = a.subtract3D(this.light3, c.average);
        E = a.norm3D(this.lights[3]);
        for (var e = 0, f = this.intensity.length - 1; e < f; e++) F[e] = this.intensity[e] * this.dim;
        F[3] = this.userIntensity * this.userIntensity / E || 0;
        D = d ? this.dim / 2 : this.dim / 4;
        B = 0;
        L = 0 > c.direction ? c.normal : a.scalarProduct3D(c.normal, -1);
        e = 0;
        for (f = this.lights.length; e < f; e++) d ? (B = Math.max(0, a.dotProduct3D(r(this.lights[e], L), O)), B *= B * B) : B = Math.max(0, a.dotProduct3D(this.lights[e], L)), D += F[e] * B;
        D = Math.min(D, 1);
        z = p(b.r * D);
        G = p(b.g * D);
        J = p(b.b * D);
        return "rgba(" + z + "," + G + "," + J + "," + b.a + ")"
    };
    Q.prototype.draw = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.background.getColor();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.image && "" != this.image.src && this.image.ready && this.image.complete && ("topleft" === this.bg_display ? this.ctx.drawImage(this.image, 0, 0) : "stretch" === this.bg_display ? this.ctx.drawImage(this.image, 0, 0, this.w, this.h) : "patch" === this.bg_display ? (this.ctx.fillStyle = ctx.createPattern(this.image,
            "repeat"), this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)) : "center" === this.bg_display && this.ctx.drawImage(this.image, (this.w - this.image.width) / 2, (this.h - this.image.height) / 2));
        if (!this.click) {
            for (var a = 0, b = this.graphics.length; a < b; a++) this.graphics[a].update();
            this.primitives = [];
            if (this.split)
                for (a = 0, b = this.graphics.length; a < b; a++) {
                    v = this.graphics[a];
                    for (var c = a + 1; c < b; c++) q = this.graphics[c], v.splitFace(q), q.splitFace(v);
                    this.primitives = this.primitives.concat(v.primitives || [])
                } else
                    for (a =
                        0, b = this.graphics.length; a < b; a++) {
                        v = this.graphics[a];
                        if (v.split)
                            for (c = a + 1; c < b; c++) q = this.graphics[c], q.split && v.splitFace(q);
                        this.primitives = this.primitives.concat(v.primitives || [])
                    }
        }
        a = 0;
        for (b = this.primitives.length; a < b; a++) this.primitives[a].computeDepth(this);
        this.primitives = this.primitives.sort(function(a, b) { return b.depth - a.depth });
        if ("painter" === this.render) this.drawPainter(this.primitives);
        else
            for (a = 0, b = this.primitives.length; a < b; a++) this.primitives[a].draw(this.ctx, this);
        a = 0;
        for (b = this.graphicsCtr.length; a <
            b; a++) this.graphicsCtr[a].draw()
    };
    Q.prototype.drawPainter = function(a) {
        for (var b = a.length, c = 0; c < b; c++) a[c].drawn = !1, a[c].draw(this.ctx, this);
        for (var d = [], e = [], f = 0, h = a.length, g = .001, l, k;;) {
            l = h;
            for (c = 0; c < b; c++)
                if (!a[c].drawn) {
                    k = !0;
                    for (var m = 0; m < b; m++)
                        if (m != c && !a[m].drawn && a[c].inFrontOf(d, a[m], g)) { k = !1; break }
                    k && (h--, e[f++] = a[c], a[c].drawn = !0)
                }
            if (0 == h) break;
            else if (h == l) { if (g *= 10, .1 < g) { for (c = 0; c < b; c++) a[c].drawn || (e[f++] = a[c], a[c].drawn = !0); break } } else g = .001
        }
        for (c = 0; c < b; c++) e[c].draw(this.ctx, this)
    };
    Q.prototype.rayFromEye = function(a, b) { return { x: -this.eye.x, y: (a - (this.w_2 + this.Ox)) / this.scale - this.eye.y, z: (this.h_2 + this.Oy - b) / this.scale - this.eye.z } };
    Q.prototype.addEvents = function() {
        function b(a) {
            window.focus();
            document.activeElement.blur();
            h.click = 0;
            h.evaluator.setVariable(h.id + ".mouse_pressed", 0);
            window.removeEventListener("touchmove", f, !1);
            window.removeEventListener("touchend", b, !1);
            a.preventDefault();
            h.parent.update()
        }

        function c(b) {
            document.body.focus();
            h.click = 0;
            h.evaluator.setVariable(h.id +
                ".mouse_pressed", 0);
            b.preventDefault();
            "R" === h.whichBtn && (window.removeEventListener("mousemove", e, !1), h.posZoom == h.posZoomNew && a.showConfig && h.parent.externalSpace.show());
            window.removeEventListener("mousemove", f, !1);
            window.removeEventListener("mouseup", c, !1);
            h.parent.update()
        }

        function d(b) {
            h.posAnte = a.getCursorPosition(b, h.container);
            h.mouse_x = h.getRelativeX(h.posAnte.x);
            h.mouse_y = h.getRelativeY(h.posAnte.y);
            h.evaluator.setVariable(h.id + ".mouse_x", h.mouse_x);
            h.evaluator.setVariable(h.id + ".mouse_y",
                h.mouse_y);
            h.parent.update()
        }

        function e(b) {
            b.preventDefault();
            h.posZoomNew = a.getCursorPosition(b, h.container).y;
            h.evaluator.setVariable(h.scaleStr, h.tempScale + h.tempScale / 45 * ((h.posZoom - h.posZoomNew) / 10));
            h.posObserverNew = a.getCursorPosition(b, h.container).x;
            h.evaluator.setVariable(h.obsStr, h.tempObserver - 2.5 * (h.posObserver - h.posObserverNew));
            h.parent.update()
        }

        function f(b) {
            if (!h.fixed && h.click) {
                n = (h.getAbsoluteX(h.oldMouse.x) - h.getAbsoluteX(h.mouse_x)) / 4;
                m = (-h.getAbsoluteY(h.oldMouse.y) + h.getAbsoluteY(h.mouse_y)) /
                    4;
                if (n !== h.disp.x || m !== h.disp.y) h.alpha = a.degToRad(h.evaluator.getVariable(h.rotZStr)), h.beta = a.degToRad(-h.evaluator.getVariable(h.rotYStr)), h.alpha = a.radToDeg(h.alpha) - n, h.beta = a.radToDeg(h.beta) - m, h.evaluator.setVariable(h.rotZStr, h.alpha), h.evaluator.setVariable(h.rotYStr, -h.beta), h.disp.x = n, h.disp.y = m, h.oldMouse.x = h.getRelativeX(h.posAnte.x), h.oldMouse.y = h.getRelativeY(h.posAnte.y);
                d(b);
                b.preventDefault()
            }
        }
        var h = this;
        this.canvas.oncontextmenu = function() { return !1 };
        this.canvas.addEventListener("touchstart",
            function(c) {
                window.focus();
                document.activeElement.blur();
                h.click = 1;
                h.evaluator.setVariable(h.id + ".mouse_pressed", 1);
                h.parent.deactivateGraphicControls();
                h.posAnte = a.getCursorPosition(c, h.container);
                h.oldMouse.x = h.getRelativeX(h.posAnte.x);
                h.oldMouse.y = h.getRelativeY(h.posAnte.y);
                d(c);
                window.addEventListener("touchmove", f);
                window.addEventListener("touchend", b);
                c.preventDefault()
            });
        this.canvas.addEventListener("mousedown", function(b) {
            document.body.focus();
            h.click = 1;
            h.parent.deactivateGraphicControls();
            h.whichBtn = a.whichBtn(b);
            "R" === h.whichBtn ? (window.addEventListener("mouseup", c), h.posObserver = a.getCursorPosition(b, h.container).x, h.posObserverNew = h.posObserver, h.posZoom = a.getCursorPosition(b, h.container).y, h.posZoomNew = h.posZoom, h.fixed || (h.tempScale = h.scale, h.tempObserver = h.observer, window.addEventListener("mousemove", e))) : "L" == h.whichBtn && (h.evaluator.setVariable(h.id + ".mouse_pressed", 1), h.posAnte = a.getCursorPosition(b, h.container), h.oldMouse.x = h.getRelativeX(h.posAnte.x), h.oldMouse.y = h.getRelativeY(h.posAnte.y),
                d(b), window.addEventListener("mousemove", f), window.addEventListener("mouseup", c));
            b.preventDefault()
        });
        this.disp = { x: 0, y: 0 };
        document.addEventListener("visibilitychange", function(a) { c(a) });
        document.addEventListener("mouseleave", function(a) { c(a) })
    };
    a.Space3D = Q;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g, f, e, r, p, c, k = function(c, b) {
        var e = a.Space.call(this, c, b) || this;
        g = e.parent.evaluator;
        void 0 != e._w_ && (c = g.parser.parse(e._w_), e._w_ = "number" != c.type ? c : void 0);
        void 0 != e._h_ && (c = g.parser.parse(e._h_), e._h_ = "number" != c.type ? c : void 0);
        e.isFirefox = /firefox/i.test(window.navigator.userAgent);
        e.file = e.file ? e.file.trim() : "";
        e.file.match(/^\[/) && e.file.match(/\]$/) ? e.file = g.parser.parse(e.file.substring(1, e.file.length - 1)) : e.file.match(/^'/) && e.file.match(/'$/) ?
            e.file = g.parser.parse(e.file) : e.file = g.parser.parse("'" + e.file + "'");
        e.oldFile = g.eval(e.file);
        e.MyIFrame = a.newHTML("iframe", { marginheight: 0, marginwidth: 0, frameborder: 0, scrolling: "auto", style: "position:absolute;left:0;top:0;" });
        0 != e.oldFile && e.MyIFrame.setAttribute("src", e.oldFile);
        e.container = a.newHTML("div", {
            id: e.id,
            style: (a.isIOS ? "overflow:scroll;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;" : "") + "position:absolute;width:" + e.w + "px;height:" + e.h + "px;left:" + e.x + "px;top:" + e.y + "px;z-index:" +
                e.zIndex + ";background-repeat:no-repeat;background-position:center;"
        });
        e.container.appendChild(e.MyIFrame);
        e.imageSrc && (e.container.style.backgroundImage = "url(" + e.imageSrc + ")");
        e.parent.container.insertBefore(e.container, e.parent.loader);
        e.MyIFrame.onload = function(b) {
            var c = this;
            e.evaluator.setFunction(e.id + ".set", function(a, b) { c.contentWindow.postMessage({ type: "set", name: a, value: b }, "*"); return 0 });
            e.evaluator.setFunction(e.id + ".update", function() { c.contentWindow.postMessage({ type: "update" }, "*"); return 0 });
            e.evaluator.setFunction(e.id + ".exec", function(a, b) { c.contentWindow.postMessage({ type: "exec", name: a, value: b }, "*"); return 0 });
            e.evaluator.setFunction(e.id + ".changeConf", function(b) {
                if (b) {
                    if (a.cacheFiles[b]) var d = a.cacheFiles[b];
                    else d = (d = document.getElementById(b)) && "descartes/embed" === d.type ? d.textContent : a.openExternalFile(b), d = (d = (new DOMParser).parseFromString(d, "text/html").querySelector("ajs")) ? d.innerHTML : "", a.cacheFiles[b] = d;
                    c.contentWindow.postMessage({ type: "change_config", filename: b, content: d },
                        "*")
                }
                return 0
            });
            e.ImReady = !e.isFirefox;
            e.isFirefox || (e.container.style.visibility = "visible", e.container.style.opacity = "1", e.container.style.zIndex = e.zIndex, e.container.style.display = e.drawIfValue ? "block" : "none");
            e.MyIFrame.style.visibility = "visible";
            e.container.style.backgroundImage = ""
        };
        e.update = e.iframeUpdate;
        e.evaluator.setVariable(e.id + "._scroll", 0);
        return e
    };
    $jscomp.inherits(k, a.Space);
    k.prototype.init = function() {
        p = this;
        p.initSpace();
        p.MyIFrame && Object.assign(p.MyIFrame.style, {
            width: p.w + "px",
            height: p.h + "px"
        })
    };
    k.prototype.iframeUpdate = function(a) {
        g = this.evaluator;
        this.drawIfValue = 0 < g.eval(this.drawif);
        this.ImReady ? this.container.style.display = this.drawIfValue ? "block" : "none" : (this.container.style.visibility = this.drawIfValue ? "visible" : "hidden", this.container.style.opacity = this.drawIfValue ? "1" : "0", this.container.style.zIndex = this.drawIfValue ? this.zIndex : -1E3);
        if (this.drawIfValue) {
            a && (this.x = this.y = Infinity);
            f = this.x !== g.eval(this.xExpr) + this.displaceRegionWest;
            e = this.y !== g.eval(this.yExpr) +
                this.parent.plecaHeight + this.displaceRegionNorth;
            this.x = f ? g.eval(this.xExpr) + this.displaceRegionWest : this.x;
            this.y = e ? g.eval(this.yExpr) + this.parent.plecaHeight + this.displaceRegionNorth : this.y;
            void 0 != this._w_ && (a = g.eval(this._w_), this.w !== a && (this.container.style.width = this.MyIFrame.style.width = a + "px", this.w = a));
            void 0 != this._h_ && (a = g.eval(this._h_), this.h !== a && (this.container.style.height = this.MyIFrame.style.height = a + "px", this.h = a));
            if (f || e) this.container.style.left = this.x + "px", this.container.style.top =
                this.y + "px";
            r = g.eval(this.file);
            r !== this.oldFile && (this.ImReady = !1, this.isFirefox || (this.container.style.display = "block", this.container.style.visibility = this.drawIfValue ? "visible" : "hidden", this.container.style.opacity = this.drawIfValue ? "1" : "0", this.container.style.zIndex = this.drawIfValue ? this.zIndex : -1E3), this.imageSrc && (this.container.style.backgroundImage = "url(" + this.imageSrc + ")"), this.MyIFrame.style.visibility = "hidden", this.oldFile = r, this.MyIFrame.contentWindow.location.replace(r));
            c = g.getVariable(this.id +
                "._scroll");
            1 == c ? (this.MyIFrame.setAttribute("scrolling", "yes"), this.MyIFrame.style.overflow = "") : -1 == c ? (this.MyIFrame.setAttribute("scrolling", "no"), this.MyIFrame.style.overflow = "hidden") : (this.MyIFrame.setAttribute("scrolling", "auto"), this.MyIFrame.style.overflow = "")
        } else this.MyIFrame.contentWindow.blur()
    };
    a.SpaceHTMLIFrame = k;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    var g = 1,
        f = function(e) {
            this.children = e.children;
            this.lessonParser = e.lessonParser;
            this.images = e.images;
            this.images.length = e.images.length;
            this.audios = e.audios;
            this.audios.length = e.audios.length;
            this.descartesApp = e;
            this.imgLoader = a.newHTML("div", { class: "DescartesLoaderImage" });
            this.progress = a.newHTML("progress", { class: "PBL", value: 0, max: 100 });
            e.imgLoader ? (e.loader.style.backgroundColor = "rgba(0,0,0,0)", this.imgLoader.setAttribute("style", "background-image:url(" +
                e.imgLoader + ");background-size:contain;")) : (g = e.width < e.height ? e.width / 1144 : e.height / 1092, g = 2.5 < g ? 2.5 : g, this.imgLoader.setAttribute("style", "background-image:url(" + a.loaderImg.src + ");background-position:50% 33.5%;background-size:" + 880 * g + "px;"), this.progress.setAttribute("style", "visibility:visible; left:" + (e.width - 726 * g) / 2 + "px; top:" + (33.5 * e.height / 100 + 940 * g / 2) + "px; width:" + 726 * g + "px; height:" + 14 * g + "px;"));
            e.loader.appendChild(this.imgLoader);
            e.loader.appendChild(this.progress);
            e.firstRun = !1;
            this.initPreloader()
        };
    f.prototype.initPreloader = function() {
        var e = this,
            f = e.children,
            g = e.images,
            c = e.audios,
            k = /[\w\.\-//]*(\.png|\.jpg|\.gif|\.svg)/gi,
            l = /[\w\.\-//]*(\.ogg|\.oga|\.mp3|\.wav)/gi;
        g["lib/DescartesCCLicense.png"] = a.getCCLImg();
        g["lib/DescartesCCLicense.png"].ready = 1;
        var b, h;
        var d = 0;
        for (b = f.length; d < b; d++)
            if ("rtf" !== f[d].name) {
                if (f[d].value.match(/'macro'|'makro'/g)) {
                    var v = "";
                    var q = e.lessonParser.split(f[d].value);
                    var u = 0;
                    for (h = q.length; u < h; u++) "expresion" === babel[q[u][0]] && (v = q[u][1]);
                    if (v) var A = (A = document.getElementById(v)) &&
                        "descartes/macro" == A.type ? A.text : a.openExternalFile(v);
                    if (A && (q = A.match(k)))
                        for (v = 0, h = q.length; v < h; v++) u = q[v], u.toLowerCase().match(/vacio.gif$/) || "" == u.substring(0, u.length - 4) || (g[u] = new Image, g[u].addEventListener("load", function() { this.ready = 1 }), g[u].addEventListener("error", function() { this.errorload = 1 }), g[u].src = u)
                }
                if (q = f[d].value.match(k))
                    for (v = 0, h = q.length; v < h; v++) u = q[v], u.toLowerCase().match(/vacio.gif$/) || "" == u.substring(0, u.length - 4) || (g[u] = new Image, g[u].addEventListener("load", function() {
                        this.ready =
                            1
                    }), g[u].addEventListener("error", function() { this.errorload = 1 }), g[u].src = u);
                if (q = f[d].value.match(l))
                    for (v = 0, u = q.length; v < u; v++) e.initAudio(q[v])
            }
        for (var n in g) g.hasOwnProperty(n) && e.images.length++;
        for (n in c) c.hasOwnProperty(n) && e.audios.length++;
        var m = e.images.length + e.audios.length;
        0 < m && e.progress.setAttribute("max", m);
        var w, x = function() {
            w = 0;
            for (var b in g) g.hasOwnProperty(b) && (g[b].ready || g[b].errorload) && w++;
            for (b in c) c.hasOwnProperty(b) && (c[b].ready || c[b].errorload) && w++;
            e.progress.setAttribute("value",
                w);
            w != m ? e.timer = a.setTimeout(x, 1) : e.descartesApp.initBuildApp()
        };
        x()
    };
    f.prototype.initAudio = function(e) {
        var f = this.audios;
        f[e] = new Audio(e);
        f[e].filename = e;
        var g = function() { this.ready = 1 },
            c = function() {
                this.canPlayType("audio/" + this.filename.substring(this.filename.length - 3)) || "mp3" != this.filename.substring(this.filename.length - 3) ? (console.warn("El archivo '" + e + "' no puede ser reproducido"), this.errorload = 1) : (f[e] = new Audio(this.filename.replace("mp3", "ogg")), f[e].filename = this.filename.replace("mp3",
                    "ogg"), f[e].addEventListener("canplaythrough", g), f[e].addEventListener("load", g), f[e].addEventListener("error", c), f[e].load())
            };
        f[e].addEventListener("canplaythrough", g);
        f[e].addEventListener("load", g);
        f[e].addEventListener("error", c);
        a.hasTouchSupport ? (f[e].load(), f[e].play(), a.setTimeout(function() { f[e].pause() }, 20), f[e].ready = 1) : f[e].load()
    };
    a.DescartesLoader = f;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g(a) { for (var b = "[", c = 0, d = a.length; c < d; c++) Array.isArray(a[c]) ? b += g(a[c]) : (e = a[c] || 0, "string" == typeof e && (e = "'" + e + "'"), b += e), c < d - 1 && (b += ","); return b + "]" }

    function f() {
        r = window.innerWidth / this.width;
        p = window.innerHeight / this.height;
        a.cssScale = c = Math.min(r, p);
        this.container.style.transformOrigin = "0 0";
        r < p ? (this.container.style.left = "0", this.container.style.transform = "translate3d(0px, 0px, 0px) scale(" + c + ")") : (this.container.style.left = "50%", this.container.style.transform =
            "translate3d(0px, 0px, 0px) scale(" + c + ") translate(-50%, 0)")
    }
    if (a.loadLib) return a;
    var e, r, p, c, k = function(c) {
        this.animation = { playing: !1, play: function() {}, stop: function() {}, reinit: function() {} };
        this.ratio = a._ratio;
        this.applet = c;
        this.parentC = c.parentNode;
        this.width = parseFloat(c.getAttribute("width"));
        this.height = parseFloat(c.getAttribute("height"));
        this.decimal_symbol = ".";
        this.decimal_symbol_regexp = /\./g;
        this.language = "espa\u00f1ol";
        this.children = c.getElementsByTagName("param");
        a.ccLicense = !0;
        for (var b =
                0, e = this.children.length; b < e; b++) "CreativeCommonsLicense" === this.children[b].name && (a.ccLicense = "no" !== this.children[b].value);
        this.code = c.getAttribute("code");
        this.saveState = [];
        this.images = { length: -1 };
        this.audios = { length: -1 };
        this.firstRun = !0;
        this.scaleToFit = function() {};
        this.init()
    };
    k.prototype.init = function() {
        this.stop();
        this.evaluator = new a.Evaluator(this);
        this.getURLParameters();
        this.lessonParser = new a.LessonParser(this);
        this.arquimedes = /DescartesWeb2_0|Arquimedes|Discurso/i.test(this.code);
        this.licenseA =
            a.ccLicense ? "{\\rtf1\\uc0{\\fonttbl\\f0\\fcharset0 Arial;}{\\f0\\fs34 __________________________________________________________________________________\\par \\fs22                                        Los contenidos de esta unidad did\u00e1ctica interactiva est\u00e1n bajo una licencia {\\*\\hyperlink Creative Commons|https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es}, si no se indica lo contrario.\\par                                        La unidad did\u00e1ctica fue creada con Descartes, que es un producto de c\u00f3digo abierto, {\\*\\hyperlink Creditos|http://arquimedes.matem.unam.mx/Descartes5/creditos/conCCL.html}\\par }" :
            "";
        for (var c = this.children, b, e = 0, d = 0, g = a.ccLicense ? 90 : 0, k = 0, p = c.length; k < p; k++) b = c[k], "rtf_height" == b.name && (e = parseInt(b.value) + 120 || this.height), "Buttons" == babel[b.name] && (this.buttonsConfig = this.lessonParser.parseButtonsConfig(b.value), d = this.buttonsConfig.height), "image_loader" == b.name && (this.imgLoader = b.value), "expand" == b.name && (this.expand = b.value), "docBase" == b.name && (this.docBase = b.value, b = a.newHTML("base", { id: "descartesJS_base", href: this.docBase }), document.head.appendChild(b));
        "cover" == this.expand &&
            (this.width = window.innerWidth, this.height = window.innerHeight);
        this.arquimedes && (this.ratio = 1, e && (this.height = e + d + g));
        this.externalSpace && document.body.removeChild(this.externalSpace.container);
        this.externalSpace = new a.SpaceExternal(this);
        this.northSpace = { container: a.newHTML("div"), controls: [] };
        this.southSpace = { container: a.newHTML("div"), controls: [] };
        this.eastSpace = { container: a.newHTML("div"), controls: [] };
        this.westSpace = { container: a.newHTML("div"), controls: [] };
        this.editableRegion = {
            container: a.newHTML("div"),
            textFields: []
        };
        this.controls = [];
        this.auxiliaries = [];
        this.events = [];
        this.nIframes = this.plecaHeight = this.tabindex = this.zIndex = 0;
        void 0 != this.container && (this.cleanCanvasImages(), this.parentC.removeChild(this.container), delete this.container, delete this.loader);
        this.container = a.newHTML("div");
        this.loader = a.newHTML("div", { class: "DescartesLoader" });
        this.parentC.insertBefore(this.container, this.parentC.firstChild);
        this.container.width = this.loader.width = this.width;
        this.container.height = this.loader.height =
            this.height;
        this.container.className = "DescartesAppContainer";
        this.container.setAttribute("style", "width:" + this.width + "px;height:" + this.height + "px;");
        this.container.appendChild(this.loader);
        "fit" == this.expand && (this.container.parentNode.removeAttribute("align"), this.container.parentNode.style.overflow = "hidden", this.container.parentNode.style.width = "100vw", this.container.parentNode.style.height = "100vh", this.scaleToFit = f, this.scaleToFit());
        this.spaces = [];
        this.firstRun ? (this.loader.style.display = "block",
            new a.DescartesLoader(this)) : this.initBuildApp()
    };
    k.prototype.initBuildApp = function() {
        a.showConfig = !0;
        for (var c = this.children, b, e = this.lessonParser, d = [], f = [], g = [], k = [], p = [], n = [], m = 0, r = c.length; m < r; m++)
            if (b = c[m], "editable" == babel[b.name]) a.showConfig = "false" == babel[b.value] ? !1 : !0;
            else if ("language" == babel[b.name]) this.language = b.value;
        else if ("pleca" == b.name) b = e.parsePleca(b.value, this.width), this.container.insertBefore(b, this.loader), this.plecaHeight = b.imageHeight ? b.imageHeight : b.offsetHeight;
        else if ("Buttons" ==
            babel[b.name]) this.buttonsConfig = e.parseButtonsConfig(b.value);
        else if ("decimal_symbol" == babel[b.name]) this.decimal_symbol = b.value, this.decimal_symbol_regexp = new RegExp("\\" + this.decimal_symbol, "g");
        else if ("version" == babel[b.name]) this.version = parseInt(b.value);
        else if ("language" == babel[b.name]) this.language = b.value;
        else if ("rtf" == b.name) {
            var x = (this.width - 780) / 2,
                y = parseInt(this.height) - this.plecaHeight - this.buttonsConfig.height - 45;
            k.push("space='descartesJS_stage' type='text' abs_coord='yes' expresion='[10,20]' background='yes' text='" +
                b.value.replace(/'/g, "&squot;") + "'");
            k.push("space='descartesJS_stage' type='text' abs_coord='yes' expresion='[" + x + "," + (y - 25) + "]' background='yes' text='" + this.licenseA + "'");
            a.ccLicense && k.push("space='descartesJS_stage' type='image' expresion='[" + (x + 15) + "," + y + "]' background='yes' abs_coord='yes' file='lib/DescartesCCLicense.png'")
        } else "E" == b.name.charAt(0) ? (b.value.match(/'HTMLIFrame'/) && this.nIframes++, d.push(b.value)) : /^C_/.test(b.name) ? f.push(b.value) : /^A_/.test(b.name) ? g.push(b.value) : /^G_/.test(b.name) ?
            (b.value.match(/type='fill'|tipo='relleno'|tipus='ple'|mota='betea'|type='plein'|tipo='recheo'|tipo='curva_piena'|tipo='preencher'|tipus='ple'/) && (this.ratio = 1), k.push(b.value)) : /^S_/.test(b.name) ? p.push(b.value) : "Animation" == babel[b.name] && n.push(b.value);
        this.arquimedes && (this.stage = { container: a.newHTML("div", { id: "descartesJS_Stage" }), scroll: 0 }, this.stage.stageSpace = this.lessonParser.parseSpace("tipo='R2' id='descartesJS_stage' fondo='" + (a.TextController ? "ffffffff" : "blanco") + "' x='0' y='0' fijo='yes' red='no' red10='no' ejes='no' text='no' ancho='" +
            this.width + "' alto='" + this.height + "'"), this.stage.container.appendChild(this.stage.stageSpace.container), this.container.appendChild(this.stage.container), this.spaces.push(this.stage.stageSpace));
        m = 0;
        for (r = d.length; m < r; m++) c = e.parseSpace(d[m]), this.arquimedes && this.stage.container.appendChild(c.container), this.spaces.push(c), this.zIndex++;
        m = 0;
        for (r = k.length; m < r; m++)
            if (a.DEBUG.elemIndex = m, d = e.parseGraphic(k[m])) this.editableRegionVisible = this.editableRegionVisible || d.visible, d.space.addGraph(d);
        m = 0;
        for (r = p.length; m < r; m++)(d = e.parse3DGraphic(p[m])) && d.space.addGraph(d, !0);
        m = 0;
        for (r = f.length; m < r; m++) this.controls.push(e.parseControl(f[m]));
        m = 0;
        for (r = g.length; m < r; m++) e.parseAuxiliar(g[m]);
        m = 0;
        for (r = n.length; m < r; m++) this.animation = e.parseAnimation(n[m]);
        this.configRegions();
        this.updateAuxiliaries();
        this.updateAuxiliaries();
        m = 0;
        for (r = this.controls.length; m < r; m++) this.controls[m].init();
        this.updateControls();
        this.updateSpaces(!0);
        var z = this;
        this.nIframes ? a.setTimeout(function() { z.finishInit() }, 200 *
            this.nIframes) : this.finishInit()
    };
    k.prototype.finishInit = function() {
        this.evaluator.setVariable("decimalSymbol", this.decimal_symbol);
        this.update();
        this.loader.style.display = "none";
        window.parent !== window && (this.parentC.style.margin = this.parentC.style.padding = "0px", "fit" == this.expand && window.addEventListener("touchmove", function(a) {
            a.preventDefault();
            a.stopPropagation()
        }), window.parent.postMessage({ type: "reportSize", href: window.location.href, width: this.width, height: this.height }, "*"), window.parent.postMessage({
            type: "ready",
            value: window.location.href
        }, "*"), a.onResize());
        window.opener && window.opener.postMessage({ type: "isResizeNeeded", href: window.location.href }, "*");
        this.externalSpace.init();
        try {
            var c = new CustomEvent("descartesReady", { detail: this });
            window.dispatchEvent(c)
        } catch (b) { console.warn("CustomEvents not supported in this browser") }
        this.readyApp = !0
    };
    k.prototype.adjustSize = function() {
        document.body.style.margin = document.body.style.padding = this.parentC.style.margin = this.parentC.style.padding = "0px";
        var c = parseInt(this.width) +
            30,
            b = parseInt(this.height) + 90;
        window.moveTo((parseInt(screen.width) - c) / 2, (parseInt(screen.height) - b) / 2);
        window.resizeTo(c, b);
        a.onResize()
    };
    k.prototype.configRegions = function() {
        var c = this.evaluator.parser,
            b = this.buttonsConfig || {},
            e = this.container,
            d = "15",
            f = 100,
            g = 100,
            k = 100,
            p = 100;
        2 == this.version && (d = "14", f = 63, g = 50, k = 44, p = 53);
        var n = 0,
            m = 0,
            r = 0,
            x = 0,
            y = 0,
            z = this.northSpace.controls,
            G = this.southSpace.controls,
            J = this.eastSpace.controls,
            E = this.westSpace.controls;
        if (0 < b.rowsNorth || 0 < z.length || b.about || b.config) {
            0 >=
                b.rowsNorth ? (n = b.height, b.rowsNorth = 1) : n = b.height * b.rowsNorth;
            var F = this.northSpace.container;
            F.id = "descartesJS_north";
            F.setAttribute("style", "width:" + e.width + "px;height:" + n + "px;left:0;top:" + this.plecaHeight + "px;");
            e.insertBefore(F, this.loader);
            F = e.width;
            var D = 0;
            b.about ? (D = f, F -= D) : f = 0;
            b.config && (F -= g);
            var B = Math.ceil(z.length / b.rowsNorth),
                L = F / B;
            var I = 0;
            for (var M = z.length; I < M; I++) z[I].expresion = c.parse("(" + (D + I % B * L) + "," + b.height * Math.floor(I / B) + "," + L + "," + b.height + ")"), z[I].drawif = c.parse("1"), z[I].init();
            b.about && (I = new a.Button(this, { region: "north", name: "english" == this.language ? "about" : "cr\u00e9ditos", font_size: c.parse(d), expresion: c.parse("(0, 0, " + f + ", " + n + ")") }), I.actionExec = { execute: a.showAbout }, I.update());
            b.config && (new a.Button(this, { region: "north", name: "config", font_size: c.parse(d), action: "config", expresion: c.parse("(" + (F + f) + ", 0, " + g + ", " + n + ")") })).update()
        }
        if (0 < b.rowsSouth || 0 < G.length || b.init || b.clear) {
            0 >= b.rowsSouth ? (m = b.height, b.rowsSouth = 1) : m = b.height * b.rowsSouth;
            f = e.width;
            D = 0;
            b.init ?
                (D = k, f -= D) : k = 0;
            b.clear && (f -= p);
            F = this.southSpace.container;
            F.id = "descartesJS_south";
            F.setAttribute("style", "width:" + e.width + "px;height:" + m + "px;left:0;bottom:0;");
            e.insertBefore(F, this.loader);
            B = Math.ceil(G.length / b.rowsSouth);
            L = f / B;
            I = 0;
            for (M = G.length; I < M; I++) G[I].expresion = c.parse("(" + (D + I % B * L) + "," + b.height * Math.floor(I / B) + "," + L + "," + b.height + ")"), G[I].drawif = c.parse("1"), G[I].init();
            b.init && (new a.Button(this, {
                region: "south",
                name: "english" == this.language ? "init" : "inicio",
                font_size: c.parse(d),
                action: "init",
                expresion: c.parse("(0, 0, " + k + ", " + m + ")")
            })).update();
            b.clear && (new a.Button(this, { region: "south", name: "english" == this.language ? "clear" : "limpiar", font_size: c.parse(d), action: "clear", expresion: c.parse("(" + (f + k) + ", 0, " + p + ", " + m + ")") })).update()
        }
        if (0 < J.length)
            for (I = e.height - n - m, x = b.widthEast, F = this.eastSpace.container, F.id = "descartesJS_east", F.setAttribute("style", "width:" + x + "px;height:" + I + "px;right:0;top:" + n + "px;"), e.insertBefore(F, this.loader), I = 0, M = J.length; I < M; I++) J[I].expresion = c.parse("(0," + b.height *
                I + "," + x + "," + b.height + ")"), J[I].drawif = c.parse("1"), J[I].init();
        if (0 < E.length)
            for (I = e.height - n - m, y = b.widthWest, F = this.westSpace.container, F.id = "descartesJS_west", F.setAttribute("style", "width: " + y + "px;height:" + I + "px;left:0;top:" + n + "px;"), e.insertBefore(F, this.loader), I = 0, M = E.length; I < M; I++) E[I].expresion = c.parse("(0," + b.height * I + "," + y + "," + b.height + ")"), E[I].drawif = c.parse("1"), E[I].init();
        if (this.editableRegionVisible)
            for (r = b.height, F = this.editableRegion.container, F.id = "descartesJS_editableRegion",
                F.setAttribute("style", "position:absolute;width:" + e.width + "px;height:" + r + "px;left:0;top:" + (e.height - m - b.height) + "px;"), e.insertBefore(F, this.loader), c = this.editableRegion.textFields, e = e.width / c.length, b = a.getFieldFontSize(r), I = 0, M = c.length; I < M; I++) "div" == c[I].type ? (F.appendChild(c[I].container), c[I].container.setAttribute("style", "font-family:" + a.sansserif_font + ";width:" + (e - 4) + "px;height:" + r + "px;position:absolute;left:" + I * e + "px;top:0;"), E = c[I].container.firstChild, E.setAttribute("style", "font-family:" +
                a.sansserif_font + ";font-size:" + b + "px;padding-top:0;background-color:#e0e4e8;position:absolute;left:0;top:0;height:" + r + "px;text-align:center;line-height:" + r + "px;"), J = E.offsetWidth, E.style.width = J + "px", E.firstChild.textContent = E.firstChild.textContent.substring(3, E.firstChild.textContent.length - 3), c[I].container.lastChild.setAttribute("style", "font-family:" + a.monospace_font + ";font-size:" + b + "px;width:" + (e - J) + "px;height:" + r + "px;position:absolute;left:" + J + "px;top:0;border:2px groove white;")) : (F.appendChild(c[I]),
                c[I].setAttribute("style", "font-family:" + a.monospace_font + ";font-size:" + b + "px;width:" + e + "px;height:" + r + "px;position:absolute;left:" + I * e + "px;top:0;border:2px groove white;"));
        this.displaceRegionNorth = n;
        this.displaceRegionSouth = m + (r || 0);
        this.displaceRegionEast = x;
        this.displaceRegionWest = y;
        I = 0;
        for (M = this.spaces.length; I < M; I++) this.spaces[I].init()
    };
    k.prototype.update = function() {
        this.updateAuxiliaries();
        this.updateControls();
        this.updateEvents();
        this.updateControls();
        this.updateSpaces()
    };
    k.prototype.clearClick =
        function() { for (var a = 0, b = this.spaces.length; a < b; a++) this.spaces[a].clearClick() };
    k.prototype.removeButtonClick = function() { a.newBlobContent = null; for (var c = 0, b = this.controls.length; c < b; c++) this.controls[c].buttonClick = !1 };
    k.prototype.deactivateGraphicControls = function() { for (var a, b = 0, c = this.controls.length; b < c; b++) a = this.controls[b], "GraphicControl" == a.type && a.deactivate() };
    k.prototype.updateAuxiliaries = function() { for (var a = 0, b = this.auxiliaries.length; a < b; a++) this.auxiliaries[a].update() };
    k.prototype.updateEvents =
        function() { for (var a = 0, b = this.events.length; a < b; a++) this.events[a].update() };
    k.prototype.updateControls = function() { for (var a = 0, b = this.controls.length; a < b; a++) this.controls[a].update() };
    k.prototype.updateSpaces = function(a) { for (var b = 0, c = this.spaces.length; b < c; b++) this.spaces[b].update(a) };
    k.prototype.clear = function() { for (var a = 0, b = this.spaces.length; a < b; a++) this.spaces[a].spaceChange = !0, this.spaces[a].drawBackground && this.spaces[a].drawBackground() };
    k.prototype.play = function() { this.animation.play() };
    k.prototype.stop = function() { this.animation.stop() };
    k.prototype.reinitAnimation = function() { this.animation.reinit() };
    k.prototype.stopAudios = function() { this.stop(); for (var a in this.audios) this.audios.hasOwnProperty(a) && this.audios[a].pause && (this.audios[a].pause(), this.audios[a].currentTime = 0) };
    k.prototype.getImage = function(a) {
        var b = this.images;
        return a ? (b[a] || (b[a] = new Image, b[a].addEventListener("load", function() { this.ready = 1 }), b[a].addEventListener("error", function() {
            this.ready = 0;
            this.errorload =
                1
        }), b[a].src = a), b[a]) : new Image
    };
    k.prototype.getAudio = function(c) {
        var b = this.audios;
        if (c) {
            if (!b[c]) {
                c.lastIndexOf(".");
                b[c] = new Audio(c);
                var e = function(a) { this.ready = 1 };
                b[c].addEventListener("canplaythrough", e);
                var d = function(a) {
                    this.canPlayType("audio/" + c.substring(c.length - 3)) || "mp3" != c.substring(c.length - 3) ? (console.warn("El archivo '" + c + "' no puede ser reproducido"), this.errorload = 1) : (b[c] = new Audio(c.replace("mp3", "ogg")), b[c].addEventListener("canplaythrough", e), b[c].addEventListener("load",
                        e), b[c].addEventListener("error", d), b[c].load())
                };
                b[c].addEventListener("error", d);
                b[c].play();
                a.setTimeout(function() { b[c].pause() }, 15)
            }
            return b[c]
        }
        return new Audio
    };
    k.prototype.getControlByCId = function(a) { return this.getControlById(a, !0) };
    k.prototype.getControlById = function(a, b) {
        b = b ? "cID" : "id";
        for (var c, d = 0, e = this.controls.length; d < e; d++)
            if (c = this.controls[d], c[b] == a) return c;
        return { update: function() {}, w: 0, h: 0 }
    };
    k.prototype.getSpaceByCId = function(a) { return this.getSpaceById(a, !0) };
    k.prototype.getSpaceById =
        function(a, b) {
            b = b ? "cID" : "id";
            for (var c, d = 0, e = this.spaces.length; d < e; d++)
                if (c = this.spaces[d], c[b] == a) return c;
            return { update: function() {}, w: 0, h: 0 }
        };
    k.prototype.getURLParameters = function() {
        var a = window.location.href,
            b = a.indexOf("?");
        if (-1 != b) { a = decodeURIComponent(a.substring(b + 1)).split("&"); for (var c = 0, d = a.length; c < d; c++) b = a[c].split("="), 2 == b.length && (+b[1] == +b[1] && (b[1] = parseFloat(b[1])), this.evaluator.setVariable("URL." + b[0], b[1])) }
    };
    k.prototype.getState = function() {
        var a = "",
            b = this.evaluator.variables,
            c;
        for (c in b)
            if (b.hasOwnProperty(c)) {
                var d = b[c];
                "string" == typeof d && (d = "'" + d + "'");
                void 0 != d && "rnd" != c && "\u03c0" != c && "pi" != c && "e" != c && "Infinity" != c && "-Infinity" != c && "object" != typeof d && (a = "" != a ? a + "\n" + c + "=" + d : c + "=" + d)
            }
        d = this.evaluator.vectors;
        for (var e in d) d.hasOwnProperty(e) && (a += "\n" + e + "=" + g(d[e]));
        e = this.evaluator.matrices;
        for (var f in e) e.hasOwnProperty(f) && (a += "\n" + f + "=" + g(e[f]));
        return a
    };
    k.prototype.setState = function(a, b) {
        a = a.split("\n");
        for (var c, d, e = 0, f = a.length; e < f; e++) c = a[e].split("="),
            2 <= c.length && (d = eval(c[1]), -1 != c[1].indexOf("[[") ? (this.evaluator.matrices[c[0]] = d, this.evaluator.matrices[c[0]].rows = d.length, this.evaluator.matrices[c[0]].cols = d[0].length) : -1 != c[1].indexOf("[") ? (this.evaluator.vectors[c[0]] = d, this.evaluator.variables[c[0] + ".long"] = d.length) : this.evaluator.variables[c[0]] = d);
        b || this.update()
    };
    k.prototype.getEvaluation = function() {
        for (var a = correct = 0, b = "", c = 0, d = this.controls.length; c < d; c++) "textfield" == this.controls[c].gui && this.controls[c].evaluate && (a++, correct +=
            this.controls[c].ok, this.controls[c].value = "" == this.controls[c].value ? "''" : this.controls[c].value, b += " \\n " + this.controls[c].id + "=" + this.controls[c].value + "|" + this.controls[c].ok);
        return "questions=" + a + " \\n correct=" + correct + " \\n wrong=" + (a - correct) + b
    };
    k.prototype.showSolution = function() {
        for (var a = this.controls, b = 0, c = a.length; b < c; b++) "textfield" == a[b].gui && a[b].evaluate && a[b].changeValue(a[b].getFirstAnswer());
        this.update()
    };
    k.prototype.showAnswer = function() {
        for (var a = 0, b = this.saveState.length; a <
            b; a++) this.evaluator.eval(this.saveState[a]);
        this.update()
    };
    k.prototype.cleanCanvasImages = function() {
        this.container.querySelectorAll("canvas").forEach(function(a) {
            a.width = a.height = 1;
            a.style.width = a.style.height = "1px"
        });
        this.spaces.forEach(function(a) {
            a.canvas && (a.canvas = a.ctx = null);
            a.backCanvas && (a.backCanvas = a.backCtx = null)
        });
        for (var a in this.images) this.images[a].nodeName && "canvas" === this.images[a].nodeName.toLowerCase() && delete this.images[a]
    };
    a.DescartesApp = k;
    return a
}(descartesJS || {});
descartesJS = function(a) {
    if (a.loadLib) return a;
    a.DEBUG = {
        PARENTHESIS_CLOSING: "Faltan par\u00e9ntesis por cerrar",
        PARENTHESIS_OPENING: "Faltan par\u00e9ntesis por abrir",
        BRACKET_CLOSING: "Faltan corchetes por cerrar",
        BRACKET_OPENING: "Faltan corchetes por abrir",
        INCOMPLETE_IF: "Condicional incompleta",
        EXPRESSION: "En la expresi\u00f3n",
        setError: function(g, f) {
            g = "Error: " + g + " en\u300a " + f + " \u300b";
            var e = "";
            switch (a.DEBUG.objectName) {
                case "Auxiliar":
                    f = "event" === a.DEBUG.typeName || "algorithm" === a.DEBUG.typeName ||
                        "constant" === a.DEBUG.typeName ? "En el programa " : "En la definici\u00f3n ";
                    if ("doExpr" == babel[a.DEBUG.paramName] || "init" == babel[a.DEBUG.paramName]) e = " en la l\u00ednea " + (a.DEBUG.lineCount + 1);
                    g += f + "\u300c" + a.DEBUG.idName + "\u300d, en el param\u00e9tro \u300c" + a.DEBUG.paramName + "\u300d" + e + ".";
                    break;
                case "Graphic":
                    g += "En el gr\u00e1fico #" + (a.DEBUG.elemIndex + 1) + " de tipo \u300c" + a.DEBUG.idName + "\u300d, en el param\u00e9tro \u300c" + a.DEBUG.paramName + "\u300d."
            }
            console.info(g)
        }
    };
    return a
}(descartesJS || {});
descartesJS = function(a) {
    function g() {
        f().forEach(function(c) {
            a.apps.push(new a.DescartesApp(c));
            c.className = "DescartesJS"
        })
    }

    function f() { return [].concat($jscomp.arrayFromIterable(document.querySelectorAll("applet,ajs"))).filter(function(a) { return /Descartes|DescartesJS|descinst.DescartesWeb2_0.class|Arquimedes|Discurso/i.test(a.getAttribute("code")) }) }

    function e() { document.querySelectorAll(".DescartesAppContainer").forEach(function(a) { a.remove() }) }

    function r(c) {
        c = a.newHTML("div");
        var f = '<div style="font-size:12px;visibility:hidden;">';
        "descartesJS_serif descartesJS_sansserif descartesJS_monospace DJS_symbol DJS_sansserif DJS_serif DJS_monospace DJS_math".split(" ").forEach(function(a) { f += '<div style="font-family:' + a + ';"><span>_</span><span style="font-weight:bold;">_</span><span style="font-style:italic;">_</span><span style="font-weight:bold;font-style:italic;">_</span></div>' });
        c.innerHTML = f + "</div>";
        document.body.appendChild(c);
        a.getFeatures();
        a.hasCanvas ? (window.scrollTo(0, 10), e(), g(), window.addEventListener("resize", a.onResize),
            window.scrollTo(0, 0)) : document.getElementById("StyleDescartesApps").innerHTML = "applet.DescartesJS,applet,ajs.DescartesJS,ajs{display:block;}";
        c.remove()
    }
    if (a.loadLib) return a;
    a.apps = [];
    a.getDescartesApps = function() { return a.apps };
    (function() {
        var c = document.getElementById("StyleDescartesApps");
        c && c.remove();
        c = a.newHTML("style", { id: "StyleDescartesApps", type: "text/css", rel: "stylesheet" });
        c.innerHTML = "applet.DescartesJS,applet,ajs.DescartesJS,ajs{display:none;}";
        document.head.appendChild(c)
    })();
    a.onResize =
        function(c) { 0 < a.apps.length && a.apps[0].scaleToFit() };
    var p = Object.create(null);
    a.onMessage = function(c) {
        if (0 < a.apps.length) {
            var e = c.data;
            if (e)
                if ("set" === e.type) "string" == typeof e.value || "number" == typeof e.value ? a.apps[0].evaluator.setVariable(e.name, e.value) : e.value && void 0 != e.value.rows ? a.apps[0].evaluator.matrices[e.name] = e.value : a.apps[0].evaluator.vectors[e.name] = e.value;
                else if ("update" === e.type) a.apps[0].update();
            else if ("exec" === e.type)(c = a.apps[0].evaluator.getFunction(e.name)) && c.apply(a.apps[0].evaluator,
                e.value.toString().split(","));
            else if ("isResizeNeeded" === e.type) c.source.postMessage({ type: "doResize" }, "*");
            else if ("doResize" === e.type) 0 < a.apps.length && a.apps[0].adjustSize();
            else if ("change_config" === e.type) {
                p[e.filename] ? c = p[e.filename] : (c = a.newHTML("div"), c.innerHTML = e.content, c = c.getElementsByTagName("param"), p[e.filename] = c);
                var f = document.querySelector("base");
                f || (f = a.newHTML("base"), document.body.appendChild(f));
                f.setAttribute("href", e.filename);
                a.apps[0].children = c;
                a.apps[0].init()
            }
        }
    };
    void 0 ==
        a.loadLib && (a.loadLib = !0, window.addEventListener("load", r), window.addEventListener("message", a.onMessage), ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd"].forEach(function(c) { window.addEventListener(c, function(c) { a.onResize(c) }) }), document.fonts.ready.then(function() {
            setTimeout(function() {
                a.apps.forEach(function(a) {
                    a.updateControls();
                    a.updateSpaces(!0)
                })
            }, 500)
        }));
    return a
}(descartesJS || {});