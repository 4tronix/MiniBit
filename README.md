# MakeCode Package for 4tronix MiniBit Robot

This library provides a Microsoft Makecode package for 4tronix MiniBit, see
https://4tronix.co.uk/minibit/

## Driving the robot    
The simplest way to drive the robot is by using the `go(...)` or `goms(...)` blocks.
With each of these blocks you specify Forward or Reverse, and a speed from 0 to 100.
Both motors will be driven at the selected speed and direction.
```blocks
// Move forward at speed 60 forever
minibit.go(mbDirection.Forward, 60)

// Move backward at speed 100 for 2000 ms
minibit.goms(mbDirection.Reverse, 100, 2000)
```
You can also spin/rotate the robot with the `rotate(...)` or `rotatems(...)` blocks
```blocks
// Rotate left at speed 70
minibit.rotate(mbRobotDirection.Left, 70)

// Rotate right at speed 50 for 400ms
minibit.rotatems(mbRobotDirection.Right, 50, 400)
```   

## Stopping
When the motor speed is set to zero then it stops. However, we can also use the motor itself to create a reverse generated current to brake much quicker.
This helps when aiming for more accurate manoeuvres. Use the `stop(...)` command to stop with braking, or coast to a halt.
```blocks
minibit.stop(mbStopMode.Coast) # slowly coast to a stop
minibit.stop(mbStopMode.Brake) # rapidly brake
```

## Driving the motors individually

If you want more fine grain control of individal motors, use `minibit.move(...)` to drive each motor either forward or reverse.
You can specify the direction (Forward or Reverse) and speed between 0 and 100.
If the left motor turns slower than the right motor, the robot will turn to the left
```blocks
// Drive both motors forward at speed 60. Equivalent to minibit.go(mbDirection.Forward, 60)
minibit.move(mbMotor.Both, mbDirection.Forward, 60)

// Drive left motor in reverse at speed 30
minibit.move(mbMotor.Left, mbDirection.Reverse, 30)

// Drive forward in a leftward curve
minibit.move(mbMotor.Left, mbDirection.Forward, 40)
minibit.move(mbMotor.Right, mbDirection.Forward, 70)
```

## Making the Robot Drive Straight

The small DC motors used in the Minibit and many other small robots are not guaranteed to go at the same speed as each other.
This can cause the robot to veer off the straight line, either to left or to right, even when both motors are programmed to go
at the same speed.
We can partially correct for this by adding a direction bias to the motor speed settings.
If your robot is veering to the right, then set the bias to the left.
Conversely, if your robot is turning to the left, then set the bias to the right.
It varies with speed and battery condition etc, but an approximation is that a 10% bias will result in about 15cm (6 inches)
change of course over about 2m (6 feet).
Note that the bias setting does not affect the old style motor blocks.

```blocks
// eg. robot leaves straight line to the right by about 10cm over 2m, so bias it to the left by 5%
minibit.mbBias(mbRobotDirection.Left, 5)

// eg. robot leaves straight line to left by 25cm, so bias it to the right by 15%
minibit.mbBias(mbRobotDirection.Right, 15)
```

## Read sonar value

If you have mounted the optional sonar sensor for the MiniBit you can
also use the `MiniBit.sonar(..)` function to read the distance to obstacles.
```blocks
// Read sonar values
let v1 = miniBit.sonar(mbPingUnit.MicroSeconds);
let v2 = miniBit.sonar(mbPingUnit.Centimeters);
let v3 = miniBit.sonar(mbPingUnit.Inches);
```

## FireLed Functions

The MiniBit has 4 FireLeds fitted.
By default, the FireLeds are automatically updated after every setting. This makes it easy to understand.
However, it can slow down some effects so there is a block provided to switch the update mode to
Manual or Automatic:

```blocks
// Set all FireLeds to Green (hard-coded RGB color)
minibit.setLedColor(0x00FF00)
// Set all FireLeds to Green (built-in colour selection)
minibit.setLedColor(mbColors.Green)

// Clear all leds
minibit.ledClear()

// Set the FireLed at position 0 to 3 to selected colour.
// eg. set Fireled 3 to Red
minibit.setPixelColor(3, 0xff0000)

// Set all the FireLeds to Rainbow (uses the colour wheel from Red to Purple)
minibit.ledRainbow()

// Shift FireLeds up one place, blanking the first FireLed
minibit.ledShift()

// Rotate FireLeds by shifting up one and replace the first with the last
minibit.ledRotate()
```

There are some more advanced blocks that allow you to select colours using separate RGB values
and select the brightness of the FireLeds.
The brightness is set to 40 by default, but can go as high as 255.
You should be careful not to look directly at them when they are bright as they can damage eyes.
```blocks
// Switch FireLeds Update Mode to Manual or Automatic
miniBit.setUpdateMode(mbMode.Manual);
miniBit.setUpdateMode(mbMode.Auto);

// Select colour from separate Red, Green and Blue values
// Each of the Red, Green and Blue values can range from 0 to 255
// This example produces a pale blue colour
let myColour = minibit.convertRGB(50, 100, 200);

// Set brightness of FireLeds to 100
miniBit.ledBrightness(100);
```

## Supported targets

* for PXT/microbit

## License

MIT
