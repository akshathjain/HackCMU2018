/*
Name: Akshath Jain
Date: 9/22/18
Purpose: 
*/

import processing.serial.*;
import java.util.*;

import http.requests.*;

Serial port;
int w = 1000;
int h = 750;
PostRequest post;
int numDataPoints;

void setup(){
  //println(Serial.list());
  size(1000, 750);
  textSize(50);
  port = new Serial(this, Serial.list()[2], 9600);
  post = new PostRequest("localhost:3000/api/flow?id=42069");
}

void draw(){
  String output;
  if(port.available() > 0){
    output = port.readString();
    
    post.addData("value", output);
    post.addData("timestamp", System.currentTimeMillis() + "");
    post.send();
    
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
