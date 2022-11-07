// Inicializacion Carrusel de productos.
stepcarousel.setup({
autostep: {enable:true, moveby:1, pause:8000},
galleryid: 'noticias', //id of carousel DIV
beltclass: 'belt', //class of inner "belt" DIV containing all the panel DIVs
panelclass: 'panel', //class of panel DIVs each holding content
panelbehavior: {speed:600, wraparound:true, persist:true},
defaultbuttons: {enable: true, moveby: 1, leftnav: ['images/bot_carrusel_left.gif', 0, 0], rightnav: ['images/bot_carrusel_right.gif', -10, 0]},
statusvars: ['statusA', 'statusB', 'statusC'], // Register 3 "status" variables
contenttype: ['inline'] // content type <--No comma following the very last parameter, always!
})