/*
Name: Akshath Jain
Date: 9/22/18
Purpose: log the user in, b/c we care about "security"
*/

import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget{
  @override
  createState() => new _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>{
  @override
  void initState(){

  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: new Center(
        child: Column(
          children: <Widget>[
            TextField(),
            TextField(),
          ],
        ),
      ),
    );
  }
}