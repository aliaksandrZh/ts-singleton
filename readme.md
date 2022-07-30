# Singleton

In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one "single" instance. This is useful when exactly one object is needed to coordinate actions across the system.

The singleton design pattern solves problems by allowing it to:

* Ensure that a class only has one instance
* Easily access the sole instance of a class
* Control its instantiation
* Restrict the number of instances 
* Access a global variable


### The singleton design pattern describes how to solve such problems:

* Hide the constructors of the class.
* Define a public static operation (getInstance()) that returns the sole instance of the class.


In essence, the singleton pattern forces it to be responsible for ensuring that it is only instantiated once. A hidden constructor—declared private or protected—ensures that the class can never be instantiated from outside the class. The public static operation can be accessed by using the class name and operation name, e.g., Singleton.getInstance().
