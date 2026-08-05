---
layout: /src/layouts/MarkdownAbout.astro
title: "Grappling Besana | Team di Brazilian Jiu-Jitsu"
description: "Un team di Brazilian Jiu-Jitsu fortemente orientato al grappling"
author: "Grappling Besana"
image:
  url: "/images/GB-Logo-Tondo-01.svg"
  alt: "Grappling Besana Logo"
---
## La nostra sede 📍

La sede del team si trova presso la <a href="http://www.polisportivabesanese.it/" target="blank">Polisportiva Besanese</a>, realtà sportiva storica in Brianza, che vanta corsi di qualità da oltre 50 anni, in una struttura bella e immersa nel verde. 

Il nostro indirizzo: 🔗 <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x4786a5508f4f018d:0xf9aef426a001ed0c?sa=X&ved=1t:8290&ictx=111" target="blank">**via Alcide de Gasperi 89, Besana in Brianza (MB)**</a>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<div id="about-map-wrapper" class="relative w-full h-[600px] rounded-xl overflow-hidden bg-neutral-100 dark:bg-zinc-900" data-map-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.98533586759!2d9.27184837661615!3d45.690096618337705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786a5508f4f018d%3A0xf9aef426a001ed0c!2sGrappling%20Besana!5e1!3m2!1sit!2sit!4v1759391591537!5m2!1sit!2sit" data-lat="45.690096618337705" data-lng="9.27184837661615">
  <div id="about-map-preview" class="absolute inset-0"></div>
  <button id="about-map-load-btn" type="button" aria-label="Apri la mappa interattiva" class="group absolute inset-0 z-[1000] flex w-full h-full items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-colors">
    <span class="inline-flex items-center gap-2 rounded-full bg-mint-500 group-hover:bg-mint-600 text-white font-medium px-6 py-3 shadow-lg transition-colors">Apri la mappa interattiva</span>
  </button>
</div>

<script>
  (function () {
    const wrapper = document.getElementById("about-map-wrapper");
    const preview = document.getElementById("about-map-preview");
    const lat = Number(wrapper?.dataset.lat);
    const lng = Number(wrapper?.dataset.lng);

    if (wrapper && preview && !Number.isNaN(lat) && !Number.isNaN(lng)) {
      import("https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js").then((L) => {
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        const map = L.map(preview, {
          center: [lat, lng],
          zoom: 16,
          zoomControl: false,
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false,
          touchZoom: false,
        });

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        L.marker([lat, lng]).addTo(map);
      });
    }

    document.getElementById("about-map-load-btn")?.addEventListener("click", () => {
      const src = wrapper?.dataset.mapSrc;
      if (!wrapper || !src) return;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "600";
      iframe.style.border = "0";
      iframe.style.borderRadius = "12px";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      iframe.title = "Mappa - Grappling Besana";

      wrapper.replaceChildren(iframe);
    });
  })();
</script>

## La nostra idea di Team

Qui a Grappling Besana, il nostro team è una vera e propria famiglia, unita dalla passione per il BJJ. La nostra filosofia si basa su un approccio che combina i fondamenti classici della disciplina con uno sguardo sempre rivolto all'evoluzione dello sport.

Ci impegniamo a offrire un ambiente in cui ogni membro, dal principiante al più esperto, possa sentirsi a casa. Crediamo fermamente che le basi siano la chiave di tutto: per questo dedichiamo particolare attenzione allo studio e alla perfezione dei **fondamentali**, perché è da lì che parte ogni progresso.

Ma non ci fermiamo qui. Il BJJ è una disciplina in continua evoluzione, e noi vogliamo restare al passo. Per questo, siamo costantemente alla ricerca di nuove tecniche, strategie e aggiornamenti per arricchire la nostra pratica. Il nostro obiettivo è creare un luogo in cui tutti possano imparare, crescere e confrontarsi, in un'atmosfera accogliente e rilassata.

I novizi sono sempre i benvenuti e possono stare tranquilli: non sarete mai lasciati allo sbaraglio. Offriamo un percorso guidato, dove sarete seguiti passo dopo passo, per farvi sentire sicuri e a vostro agio fin dal primo giorno.

Unisciti a noi e scopri il piacere di imparare e crescere insieme, in un team che è prima di tutto una comunità.

## I nostri insegnanti

![orari grappling bjj judo s&c Besana Brianza](../assets/images/marco.png "marco beccari bjj grappling besana team jiu-jitsu")


Il coach di Grappling Besana è <a href="https://www.instagram.com/bjj_marcobex/" target="blank">Marco Beccari</a>, cintura nera col grado di **Maestro** nel Brazilian Jiu-Jitsu, riconosciuto da FIJLKAM/CONI e Unione Italiana Jiu-jitsu. Ha conseguito la cintura nera nel giugno 2022 in una delle più blasonate accademie della Brianza. Pratica BJJ dal 2014 ed è anche una cintura nera di Judo, che ha praticato per molti anni fin dalle scuole medie.

Tra i risultati agonistici più significativi:
<ul>
<li>2022 Roma: 🥇 Oro Europeo Master 3 IBJJF - Cinture Marroni</li>
<li>2022 Luxembourg: 🥇 Oro No-gi Master NAGA - Cinture Nere</li>
<li>2019 Barcellona: 🥇 Oro Europe Master Open IBJJF - Cinture Viola</li>
<li>2019 Firenze: 🥇 Oro Italiano Gi Master UIJJ - Cinture Viola</li>
<li>2019 Firenze: 🥇 Oro Italiano No-Gi Master UIJJ - Cinture Viola</li>
<li>2018 Firenze: 🥇 Oro Italiano Gi Master UIJJ - Cinture Viola</li>
<li>2018 Firenze: 🥇 Oro Italiano No-Gi Master UIJJ - Cinture Viola</li>
<li>2017 Firenze: 🥇 Oro Assoluti Italiano No-Gi Master UIJJ - Viola</li>
<li>2016 Lisbona: 🥈 Argento Europeo Master 2 IBJJF - Cinture Blu</li>
</ul>

All'interno del team sono presenti numerose cinture di alto grado tra Marroni e Viola che supportano l'attività di insegnamento nello spirito della collaborazione reciproca che ci contraddistingue!

## 🕒 Orari 2025/2026

![orari grappling bjj judo s&c Besana Brianza](../assets/images/timetable.png "Orari Stagione 2025/26 Grappling Besana")

## 🔍 Anteprima Orari 2026/2027

![orari grappling bjj judo s&c Besana Brianza](../assets/images/Orari-Classi-Grappling-Besana-2026-2027.png "Preview Orari Stagione 2026/27 Grappling Besana")


## Let's Do Amazing Things 🚀 

Ti aspettiamo per una prova, contattaci su <a href="https://www.instagram.com/grappling_besana/" target="blank">instagram</a> o dal link qui sotto! 👇