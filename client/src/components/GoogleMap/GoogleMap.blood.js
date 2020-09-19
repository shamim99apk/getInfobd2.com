import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class GroceryGoogleMap extends Component {
  render() {
    return (
      <div>
        <Map
          style={{ width: "50%", height: "50%", position: "relative" }}
          google={this.props.google}
          initialCenter={{
            lat: 22.8248,
            lng: 89.538,
          }}
          zoom={18}>
          <Marker onClick={this.onMarkerClick} />

          <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAr7KW8enqu6XdP6g78aCTGv8xrCuqaOlI",
})(GroceryGoogleMap);
