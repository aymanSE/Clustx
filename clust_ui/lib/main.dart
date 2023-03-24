import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: Scaffold(
        body: Center(
            child: Container(
          color: Colors.amber,
        )
            // logo(),
            ),
      ),
      routes: {
        // "/start": (context) => start(),
      },
    );
  }
}
