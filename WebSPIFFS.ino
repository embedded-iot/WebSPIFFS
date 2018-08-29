#include <arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
//#include <DHT.h>
//#include <Adafruit_BMP085.h>
#include <FS.h>

#define D4 4
#define D5 5
#define D6 6
#define D7 7
#define D8 8

// #define ssid      "VIENKHNL22"      // WiFi SSID
// #define password  "iesvn12345"  // WiFi password
#define ssid      "TTQ"      // WiFi SSID
#define password  "0987654321"  // WiFi password
#define DHTTYPE   DHT22           // DHT type (DHT11, DHT22)
#define DHTPIN    D4              // Broche du DHT / DHT Pin
const uint8_t GPIOPIN[4] = {D5,D6,D7,D8};  // Led
float   t = 0 ;
float   h = 0 ;
float   pa = 0;
int     sizeHist = 100;           // Nombre de points dans l'historique - History size

bool isLogin = false;

ESP8266WebServer server ( 80 );

void setup() {
  for ( int x = 0 ; x < 5 ; x++ ) {
//    pinMode(GPIOPIN[x], OUTPUT);
  }
  
  Serial.begin ( 115200 );

  WiFi.begin ( ssid, password );
  // Attente de la connexion au réseau WiFi / Wait for connection
  while ( WiFi.status() != WL_CONNECTED ) {
    delay ( 500 ); Serial.print ( "." );
  }
  // Connexion WiFi établie / WiFi connexion is OK
  Serial.println ( "" );
  Serial.print ( "Connected to " ); Serial.println ( ssid );
  Serial.print ( "IP address: " ); Serial.println ( WiFi.localIP() );

  if (!SPIFFS.begin())
  {
    // Serious problem
    Serial.println("SPIFFS Mount failed");
  } else {

    Serial.println("SPIFFS Mount succesfull");
  }

  server.on("/tabmesures.json", sendTabMesures);
  server.on("/mesures.json", sendMesures);
  server.on("/gpio", updateGpio);
//  server.on("/login", login);
  server.on("/login", login);

  /*HTTP_POST, []() {
    updateGpio();
  });
  */
  server.serveStatic("/js", SPIFFS, "/js");
  server.serveStatic("/css", SPIFFS, "/css");
  server.serveStatic("/fonts", SPIFFS, "/fonts");
  server.serveStatic("/img", SPIFFS, "/img");
  server.serveStatic("/resources", SPIFFS, "/resources");
  server.serveStatic("/lib", SPIFFS, "/lib");
  server.serveStatic("/", SPIFFS, "/index.html");
  server.begin();
  Serial.println ( "HTTP server started" );

}

void loop() {
  server.handleClient();
}

void login() {
  String message = "Number of args received:";
  message += server.args();            //Get number of parameters
  message += "\n";                            //Add a new line

  for (int i = 0; i < server.args(); i++) {
    message += server.argName(i) + ":";     //Get the name of the parameter
    message += server.arg(i) + "\n";              //Get the value of the parameter

  }
  Serial.println(message);
  String user = server.arg("username");
  String pass = server.arg("password");
  Serial.println(user + "-" + pass);

  if (user.equals("mbell") && pass.equals("1234567890")) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  String json = "{\"isLogin\":\"" + String(isLogin) + "\"}";
  server.send(200, "application/json", json);
}

void updateGpio(){
  String gpio = server.arg("id");
  String etat = server.arg("etat");
  String success = "1";
    int pin = D5;
  if ( gpio == "D5" ) {
  pin = D5;
  } else if ( gpio == "D7" ) {
  pin = D7;
  } else if ( gpio == "D8" ) {
  pin = D8;
  } else {
  pin = D5;
  }
  Serial.println(pin);
  if ( etat == "1" ) {
  digitalWrite(pin, HIGH);
  } else if ( etat == "0" ) {
  digitalWrite(pin, LOW);
  } else {
  success = "1";
  Serial.println("Err Led Value");
  }

  String json = "{\"gpio\":\"" + String(gpio) + "\",";
  json += "\"etat\":\"" + String(etat) + "\",";
  json += "\"success\":\"" + String(success) + "\"}";

  server.send(200, "application/json", json);
  Serial.println("GPIO mis a jour");
}

void sendMesures() {
  String json = "{\"t\":\"" + String(t) + "\",";
  json += "\"h\":\"" + String(h) + "\",";
  json += "\"pa\":\"" + String(pa) + "\"}";

  server.send(200, "application/json", json);
  Serial.println("Mesures envoyees");
}

void sendTabMesures() {
  double temp = 0;      // Récupère la plus ancienne mesure (temperature) - get oldest record (temperature)
  String json = "[";
  json += "{\"mesure\":\"Température\",\"valeur\":\"" + String(t) + "\",\"unite\":\"°C\",\"glyph\":\"glyphicon-indent-left\",\"precedente\":\"" + String(temp) + "\"},";
  temp = 0;             // Récupère la plus ancienne mesure (humidite) - get oldest record (humidity)
  json += "{\"mesure\":\"Humidité\",\"valeur\":\"" + String(h) + "\",\"unite\":\"%\",\"glyph\":\"glyphicon-tint\",\"precedente\":\"" + String(temp) + "\"},";
  temp = 0;             // Récupère la plus ancienne mesure (pression atmospherique) - get oldest record (Atmospheric Pressure)
  json += "{\"mesure\":\"Pression Atmosphérique\",\"valeur\":\"" + String(pa) + "\",\"unite\":\"mbar\",\"glyph\":\"glyphicon-dashboard\",\"precedente\":\"" + String(temp) + "\"}";
  json += "]";
  server.send(200, "application/json", json);
  Serial.println("Tableau mesures envoyees");
}


