import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {Loader} from "@googlemaps/js-api-loader";

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  lat = 34.092201;
  lng = -118.377342;

  loadMap() {
    const loader = new Loader({
      apiKey: environment.geoApiKey,
      version: "weekly",
      libraries: ["marker"]
    });

    const mapOptions = {
      center: {
        lat: this.lat, lng: this.lng
      },
      zoom: 8,
      zoomControl: true,
      disableDoubleClickZoom: true,
      maxZoom: 15,
      minZoom: 8,
    };


    loader.importLibrary("maps")
      .then(async ({Map}) => {
        const map = new Map(document.getElementById('map') as HTMLElement, mapOptions);
        const {Marker} = await loader.importLibrary("marker");
        const marker = new Marker({
          map,
          position: mapOptions.center,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: "Jupiter Restaurant<br>111 Demo Street<br>Los Angeles 12345"
        });

        infoWindow.open(map, marker);
      }).catch((e) => {
      console.log("error: ", e)
    })
  }
}
