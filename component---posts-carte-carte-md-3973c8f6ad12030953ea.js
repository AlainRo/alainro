(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{lIQJ:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return i})),a.d(t,"default",(function(){return o}));var n=a("zLVn"),s=(a("mXGw"),a("/FXl")),r=a("5W5T"),i={},l={_frontmatter:i},u=r.a;function o(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(s.b)(u,Object.assign({},l,a,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h1",null,"Le 'making of' des chantiers"),Object(s.b)("h3",null,"Historique"),Object(s.b)("p",null,"Mon implication dans les chantiers de la ville de Toulouse à commencée lors du ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"/blog/chantiers"}),"Hackaton"),". Elle s'est continuée naturellement dans le concours ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"http://data.toulouse-metropole.fr"}),"Défi Numérique"),". L'équipe a produit une web-app et une app Android: ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"http://infotravaux.fr"}),"Info'Travaux")," qui inclut les idées de visualisation décrites ici et y ajoute des fonctionnalités précieuses comme l'abonnement aux nouveaux chantiers dans les zones d'intérêt et surtout les itinéraires en voiture permettant d'éviter les chantiers. ",Object(s.b)("em",{parentName:"p"},"Le projet ",Object(s.b)("a",Object.assign({parentName:"em"},{href:"http://infotravaux.fr"}),"Info'Travaux"),'  a gagné le prix du "Services aux citoyens".')),Object(s.b)("br",null),Object(s.b)("center",null,Object(s.b)("p",null,Object(s.b)("img",Object.assign({parentName:"p"},{src:"/gifs/chantiers.gif",alt:null})))),Object(s.b)("br",null),Object(s.b)("p",null,"Google Maps et autres Waze peuvent parfois constater un ralentissement dans une rue, mais ni l'un ni l'autre ne sait pourquoi et pour combien de temps, ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"http://infotravaux.fr"}),"Info'Travaux")," lui oui. "),Object(s.b)("h3",null,"A la recherche de la visualisation efficace"),Object(s.b)("p",null,"Quand on essaye de placer sur une carte des centaines de punaises et parfois des dizaines sur 1 cm2, on se rend compte qu'il y a sûrement mieux à faire que de superposer des icônes/marqueurs identiques qui seront illisibles et très difficiles à sélectionner individuellement.\nIl y a maintenant plus de 30 ans qu'",Object(s.b)("a",Object.assign({parentName:"p"},{href:"http://en.wikipedia.org/wiki/Edward_Tufte"}),"Edward Tufte")," a proposé un critère objectif de la bonne utilisation de l'encre: le ",Object(s.b)("strong",{parentName:"p"},"data/ink ratio"),". En français et sur écran: le rapport ",Object(s.b)("em",{parentName:"p"},"nb données/nb de pixels"),". Chaque trait, couleur, surface utilisé doit être questionnée à propos de son apport à la présentation des données en regard de la place qu'elle accapare au détriment des autres sur le papier, l'écran et ultimement sur la rétine et dans le cerveau de l'utilisateur. C'est un tamis très efficace pour apprendre à éliminer le bruit visuel et se concentrer sur l'essentiel.\nEncore mieux, s'il est possible de pondérer chaque donnée par la ",Object(s.b)("em",{parentName:"p"},"valeur")," qu'elle a pour l'utilisateur: ",Object(s.b)("em",{parentName:"p"},"(valeur X donnée) / pixels"),", on peut créer des interfaces et des visualisations optimales pour les familles d'utilisateurs qui partagent les mêmes objectifs.\nLa mission que l'on assigne au marqueur est alors d'attirer l'attention du lecteur d'autant plus que le chantier est important pour lui. Un premier essai inspiré de ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"http://perceptible.fr/blog/chantiers"}),"visualisation")," utilisait la durée restante. Un cercle de diamètre d'autant plus gros que le chantier allait encore longtemps perturber la circulation. Une fois réalisé et expérimenté plusieurs défauts se font jour et notamment deux:\n1. la taille des cercles devient très grande à cause de la forte dynamique des données (de 1j à 3 ans) jusqu'à devenir inutilisable\n2. le critère durée est trop écrasant, une gène énorme courte est totalement masquée par des gènes très légères ou nulles pour certain modes de transport pour peu qu'elles soient longues\nCette deuxième version va plus loin en faisant émerger des données le niveau de gène par mode de transport grâce à une pondération des différents impacts sur la circulation:"),Object(s.b)("br",null),Object(s.b)("p",null,Object(s.b)("span",Object.assign({parentName:"p"},{className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"487px"}}),"\n      ",Object(s.b)("a",Object.assign({parentName:"span"},{className:"gatsby-resp-image-link",href:"/static/3816fb35aa41844b1be8386e6e1c013b/7b439/NiveauxGene.png",style:{display:"block"},target:"_blank",rel:["noopener"]}),"\n    ",Object(s.b)("span",Object.assign({parentName:"a"},{className:"gatsby-resp-image-background-image",style:{paddingBottom:"71.16564417177914%",position:"relative",bottom:"0",left:"0",backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAACWklEQVQ4y32T63LaMBCFef93a2fSSYGEBgMBfJclWb7bnJ5dQtr0RzWzs7Ilfzq7R145E2CNRbTfIytLhBBQFAWMKWGdRds2nBs471DXNXzt9dlaWWtRVQaea/LcdR1WvgoIvkEcx9wc+LLnh3wXGjRNi74f9BCJpmkUImCJvudeWeM+WRuGAavK5hjnFssyYp5HjFP/kVsMIzeNLecdbrfbl1gYQ99hmQZGh3kcME0TVqWNcMmekJQblPaI0h1g/ElzXKyRmR18k0LGAyZjmhcU1yOadIcu3cImEbzzWFl/Rl7tFJpXvyAHFHaPpmOf6ivnkSr+dzyAIXkl8BU23sNZAo07Uckz3pNvSMsXhUpUPCgpNpy/qVp5lvW29wocpxnF5YCawFaBEYGOPfTvBP78C7hTVaIuIzgzr6q6bgsUhIfWfAJzAkO8QVdwf/z2B5gIMP2uwMy8EPhG4IUHbVSl4Z5+qAnL4UKsJmnJ8Qn1lcDyAHvewkkP76Wt2cMfqqwfgjo8zQMd5jUavGYBdr0ltGBPB8zL7d5DMSV79JAKSxdR2VZLTOl0UopC6dkJlmpcfda59FUquOYbdfqrKdt7yaJQyksIFHOk3NTIR896iG8y9i5jTu5XiRXkVfQJlB7WMY1K1qguO9jKicsHPVnKlTsnrqY0ou0q/G/cFZ6ocEeXX+DS4/0eSimiSHJSrnFmL6ePe7csM2PSmD+y9PZ2m9nXEfmZ7l+eFVjRFFMarMQ5KSW0pZb2uIO1lpurUh8SNUOcl7/JMXd9A28KhDyiy1SX8s+6JvgNOGYnmqaSQcIAAAAASUVORK5CYII=')",backgroundSize:"cover",display:"block"}})),"\n  ",Object(s.b)("img",Object.assign({parentName:"a"},{className:"gatsby-resp-image-image",alt:"NiveauxGene",title:"NiveauxGene",src:"/static/3816fb35aa41844b1be8386e6e1c013b/7b439/NiveauxGene.png",srcSet:["/static/3816fb35aa41844b1be8386e6e1c013b/222b7/NiveauxGene.png 163w","/static/3816fb35aa41844b1be8386e6e1c013b/ff46a/NiveauxGene.png 325w","/static/3816fb35aa41844b1be8386e6e1c013b/7b439/NiveauxGene.png 487w"],sizes:"(max-width: 487px) 100vw, 487px",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",top:"0",left:"0"},loading:"lazy"})),"\n  "),"\n    ")),Object(s.b)("br",null),Object(s.b)("p",null,"On peut combiner les deux dimensions :"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"le niveau de gène sur une échelle de 0 à 5"),Object(s.b)("li",{parentName:"ul"},"la durée restante mais bornée à 3 mois pour éviter le défaut de la forte dynamique")),Object(s.b)("p",null,"en un seul indicateur, selon les principes suivants:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"la taille du disque est d'autant plus grande que le chantier est gênant, avec une légende de couleur en redondance"),Object(s.b)("li",{parentName:"ul"},"l'épaisseur de la couronne représente la durée restante. Disque plein si encore plus de 3 mois et un simple cercle pour la semaine. ")),Object(s.b)("br",null),Object(s.b)("p",null,Object(s.b)("span",Object.assign({parentName:"p"},{className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"252px"}}),"\n      ",Object(s.b)("a",Object.assign({parentName:"span"},{className:"gatsby-resp-image-link",href:"/static/f52bafd2fe5cf7818e49a4352a83034d/5e02b/legend.png",style:{display:"block"},target:"_blank",rel:["noopener"]}),"\n    ",Object(s.b)("span",Object.assign({parentName:"a"},{className:"gatsby-resp-image-background-image",style:{paddingBottom:"62.576687116564415%",position:"relative",bottom:"0",left:"0",backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAACfElEQVQ4y31TW27TQBQNHyyEVbAHProHlgASi4BPPvhhAcAXtAkIUFtVrSqSpqFN0tC4cWzXcRI7bvyK7diOZw53Blo1FBjp6s54Zo7PuedOxXFsS1VV3bIsYzKZGmEUGXEc34kr1zVM0zQM3ZB5Op0Y4/HYsKyRMbVtPU1Ty7btnYo3d1H/1kD79BQXgyH+NUzzEt2zDjp07rh5jKGqonfWRbvdhjrU5ZlFFKkVMSl5XlJinDNGTNh87rEwDJnv+yzPMyb2iAHb2d5muqbJtTjMKcqyFFncB905l4C2Z7I0WyBbLtHtdIipCk3ToSgXiOOF/Luh63j29AnevX0j185shtFoBKV/jsnUZr8B+xKwVn/NTtRdeXBJoFQzlIytSWa01rQhgiC4Uw7BdA3wa3uTnVknYAWHZY3RP+9j7vs3QNd5MBjAdd2/lXgdEO0XDPp7EB4xTLFaraT8LM9vbojiV6tb+FirIUkSUE3heR6skUVA0Tpg/GWDrbrPMZsvsLe3i3q9gaNGg1ztkcRQshP1qlWrONjfR1EUEjQIAwno+8E6YKE0Gbd1xPkK6uCCLpuYOQ50dYBe7wcCP5QsyXXJ/v+SG5twH91j/uMHyC5/IKEOKrJMmpNRFiGGKEEURVgsFqBWkQyFecKkgBhS94j9fqX89ArOwwrzNu7zWf0zb7TavNP6zpvNFj88OOTNo2O+olYLg4CnScqpbjzLltyxbW4al5wM5IqisKuruQD81YfZ1kuw+gcUJblsjjAdj+lljKDphnT9egh2xS2j/hwEqFTSZbZMSH7CEZGEiKRSZBFJjfI8p3kqv5NEuUfuyjWB346Q9pf0lls/AcKfx6RlDaxAAAAAAElFTkSuQmCC')",backgroundSize:"cover",display:"block"}})),"\n  ",Object(s.b)("img",Object.assign({parentName:"a"},{className:"gatsby-resp-image-image",alt:"legend",title:"legend",src:"/static/f52bafd2fe5cf7818e49a4352a83034d/5e02b/legend.png",srcSet:["/static/f52bafd2fe5cf7818e49a4352a83034d/222b7/legend.png 163w","/static/f52bafd2fe5cf7818e49a4352a83034d/5e02b/legend.png 252w"],sizes:"(max-width: 252px) 100vw, 252px",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",top:"0",left:"0"},loading:"lazy"})),"\n  "),"\n    ")),Object(s.b)("br",null),Object(s.b)("p",null,"Ainsi combinés, le nombre de pixels occupés sur l'écran est d'autant plus grand que le chantier mérite l'attention du lecteur. Quelques bonnes propriétés de cet indicateur:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"les chantiers proches se superposent pour former une grande tâche de couleur qui indique tout naturellement et sans plus de détails un quartier fortement perturbé et pour un temps certain"),Object(s.b)("li",{parentName:"ul"},"en zoom large les grosses tâches masquent les petites mais se séparent quand l'agrandissement est suffisant"),Object(s.b)("li",{parentName:"ul"},"le caractère quasi aléatoire de la position, taille et épaisseur fait que les marqueurs se distinguent et se sélectionnent facilement")),Object(s.b)("h3",null,"Mode d'emploi"),Object(s.b)("p",null,"Chaque marqueur est un chantier. "),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},Object(s.b)("strong",{parentName:"p"},"Détails"),": ",Object(s.b)("strong",{parentName:"p"},"Clic")," permet de faire apparaître une bulle d'information à propos du chantier. ",Object(s.b)("strong",{parentName:"p"},"Maj clic")," permet d'en ouvrir plusieurs à la suite.")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},Object(s.b)("strong",{parentName:"p"},"Navigation spatiale"),": le curseur en forme de main permet de faire glisser la carte par ",Object(s.b)("strong",{parentName:"p"},"appuyer-glisser"),". ",Object(s.b)("strong",{parentName:"p"},"Clic-clic")," fait un zoom avant, ",Object(s.b)("strong",{parentName:"p"},"maj clic-clic")," un zoom arrière. Tracer un rectangle avec ",Object(s.b)("strong",{parentName:"p"},"maj-appuyer-déplacer-relâcher")," zoom sur cette zone. Et bien sûr les icônes ",Object(s.b)("strong",{parentName:"p"},"+")," et ",Object(s.b)("strong",{parentName:"p"},"-")," en haut à gauche permettent le zoom avant/arrière")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},Object(s.b)("strong",{parentName:"p"},"Filtre"),": les icônes voiture, piéton, vélo permettent de ne considérer que les chantiers qui impactent un mode de transport en particulier. Le i rassemble tous les chantiers y compris ceux sans influence sur la circulation")),Object(s.b)("li",{parentName:"ul"},Object(s.b)("p",{parentName:"li"},Object(s.b)("strong",{parentName:"p"},"Voyage dans le temps"),": la glissière en bas de la carte permet de faire apparaître la situation à une date antérieure ou de se projeter dans le futur pour voir ce que seront les chantiers dans 3 mois. "),Object(s.b)("center",null,Object(s.b)("p",{parentName:"li"}," ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"https://alainro.github.io/sandbox/chantiersTlse/carte.html"}),"Ouvrir dans une fenêtre séparée")),Object(s.b)("p",{parentName:"li"}," ",Object(s.b)("strong",{parentName:"p"},"A lire dans Chrome, Firefox ou Safari")," "),Object(s.b)("iframe",{frameBorder:"0",allowFullScreen:!0,height:"700",width:"690",src:"/sandbox/chantiersTlse/carte.html",scrolling:"no"})))),Object(s.b)("h3",null,"Les Données Ouvertes"),Object(s.b)("p",null,"C'est à l'initiative de la Communauté Urbaine de Toulouse Métropole que les données concernant les chantiers sont rassemblées à l'intérieur d'une application nommée Orion. Chaque jour une partie des données gérées sont exportées vers la zone ",Object(s.b)("a",Object.assign({parentName:"p"},{href:"http://data.toulouse-metropole.fr/"}),"Open Data"),"  où elles deviennent accessibles à tout un chacun qui peut la télécharger en divers formats."),Object(s.b)("h4",null,"Améliorer les données et leur mise à jour"),Object(s.b)("p",null,"La mise à disposition des données est un bénéfice incontestable. Et on en veut immédiatement plus. Au jour d'écriture de ce billet (oct 2014), on aimerait bien ",Object(s.b)("strong",{parentName:"p"},"quelques suppléments"),":"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"Un prévisionnel serait précieux"),": les chantiers sont publiés le jour de leur démarrage prévu. Dommage pour les chantiers qui durent une journée! Disposer d'un prévisionnel pour les chantiers, même s'il est amené à changer, pourrait être très précieux. Est ce possible ?"),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"Quelques anomalies"),": certains jours le fichier n'est pas disponible au téléchargement . Ou identique à celui de la veille. Ou est un fichier valide mais les données qu'il contient sont incomplètes (des chantiers publiés la veille ne sont plus là mais sont à nouveau présent dans le fichier du lendemain). L'exploitation des données ouvertes doit trouver des solutions pour tolérer ces aléas."),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"Pas de mise à jour en cours de route"),": certainement que des modifications ont lieu après la publication des données (chantier annulé ou terminé avant la date prévue, ...). On ne constate pourtant aucune mise à jour dans l'open data. Les paramètres d'un chantier publié restent identiques d'un jour à l'autre jusqu'à ce que le chantier disparaisse de la liste. Pourquoi ?"),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"Pourraient être plus précises"),": l'impact du chantier est pour le moment très grossier: un point GPS, un nom de rue et parfois une fourchette de numéros dans la rue. S'il était possible de récupérer les plans d'emprise alors les trajets d'évitement serait plus précis y compris pour le piéton et la personne à mobilité réduite. ")),Object(s.b)("h4",null,"Les données cachées dans les données"),Object(s.b)("p",null,"Comme très souvent, les données sont instructives pas seulement par leur valeur et leur évolution mais aussi par leur présence (les dates de mises à jour) ou à leur disparition soudaine. Et les chantiers n'échappent pas à la règle. "),Object(s.b)("p",null,"Certains sont très sages: le chantier est répété à l'identique tous les jours entre les dates de début/fin prévues initialement."),Object(s.b)("p",null,"Tandis que d'autres:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"apparaissent plus tard que la date de début déclarée"),Object(s.b)("li",{parentName:"ul"},"disparaissent plus tôt que la date de fin définie")),Object(s.b)("p",null,"Probablement que les données exportées représentent en fait le ",Object(s.b)("strong",{parentName:"p"},"permis de mener un chantier")," qui encadre le déroulement pour éviter de mélanger dans une même tranchée et au même moment des interventions sur l'eau, le gaz et l'électricité... Il serait alors logique qu'aucune mise à jour rétroactive ne soit effectuée. Mais le citoyen préfèrerait certainement des informations plus proches de la réalité de la rue. Sont elles disponibles ?"))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---posts-carte-carte-md-3973c8f6ad12030953ea.js.map