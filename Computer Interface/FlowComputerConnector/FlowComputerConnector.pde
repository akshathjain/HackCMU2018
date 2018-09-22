/*
Name: Akshath Jain
Date: 9/22/18
Purpose: 
*/

import processing.serial.*;
import java.util.*;

Serial port;
int w = 1000;
int h = 750;

void setup(){
  //println(Serial.list());
  size(1000, 750);
  textSize(50);
  port = new Serial(this, Serial.list()[2], 9600);
}

void draw(){
  String output;
  if(port.available() > 0){
    output = port.readString();
    
    //draw a white rectangle
    fill(255, 255, 255);
    rect(0, 0, w, h/4.0);
    
    //draw a blue rectangle
    fill(96, 157, 255);
    rect(0, h/4, w, 3*h/4.0);
    
    fill(0, 0, 0);
    text(output + " L/s", w/2.0 - 60, h / 8);
  }
}
