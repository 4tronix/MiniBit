# MakeCode Package for 4tronix MiniBit Robot

This library provides a Microsoft Makecode package for 4tronix MiniBit, see
https://4tronix.co.uk/minibit/

## Driving the robot    
The simplest way to drive robot is by using the `driveMilliseconds(...)` and `driveTurnMilliseconds(...)` blocks.   
Note with `driveMilliseconds(...)`, you can specify a negative speed to reverse.   
```blocks
// Drive forward for 2000 ms
MiniBit.driveMilliseconds(1023, 2000)

// Drive backwards for 2000 ms
MiniBit.driveMilliseconds(-1023, 2000)

// Spin left for 200 ms
MiniBit.spinMilliseconds(MBRobotDirection.Left, 1023, 200)

// Turn right for 200 ms
MiniBit.spinMilliseconds(MBRobotDirection.Right, 1023, 200)
```   

These blocks are also available in non blocking version. The following example performs the same operation as above.   
```blocks
MiniBit.drive(1023)
basic.pause(1000)

MiniBit.drive(0)
basic.pause(1000)

MiniBit.spin(MBRobotDirection.Left, 1023)
basic.pause(250)

MiniBit.spin(MBRobotDirection.Right, 1023)
basic.pause(250)

MiniBit.drive(0)
```

## Stopping
When the motor speed is set to zero then it stops. However, we can also use the motor itself to create a reverse generated current to brake much quicker.
This helps when aiming for more accurate manoeuvres. Use the `MiniBit.stop(...)` command to stop with braking, or coast to a halt
```blocks
MiniBit.robot_stop(MBStopMode.Coast) # slowly coast to a stop
MiniBit.robot_stop(MBStopMode.Brake) # rapidly brake
```

## Driving the motor

If you want more fine grain control of individal motors, use `MiniBit.motor(..)` to drive motor either forward or reverse. The value
indicates speed and is between `-1023` to `1023`. Minus indicates reverse.

```blocks
// Drive 1000 ms forward
MiniBit.motor(MBMotor.All, 1023);
basic.pause(1000);

// Drive 1000 ms reverse
MiniBit.motor(MBMotor.All, -1023);
basic.pause(1000);

// Drive 1000 ms forward on left and reverse on right
MiniBit.motor(MBMotor.Left, 1023);
MiniBit.motor(MBMotor.Right, -1023);
basic.pause(1000);
```

## Read sonar value

If you have mounted the optional sonar sensor for the MiniBit you can
also use the `MiniBit.sonar(..)` function to read the distance to obstacles.

```blocks
// Read sonar values
let v1 = MiniBit.sonar(MBPingUnit.MicroSeconds);
let v2 = MiniBit.sonar(MBPingUnit.Centimeters);
let v3 = MiniBit.sonar(MBPingUnit.Inches);
```

## NeoPixel helpers

The MiniBit has 4 smart RGB LEDs (aka neopixels) fitted. This library defines some helpers
for using them.
By default, the LEDs are Automatically updated after every setting. This makes it easy to understand.
However, it can slow down some effects so there is a block provided to switch the update mode to
Manual or Automatic:

```blocks
// Switch LEDs Update Mode to Manual or Automatic
MiniBit.setUpdateMode(MBMode.Manual);
MiniBit.setUpdateMode(MBMode.Auto);

// Show all leds
MiniBit.setLedColor(MiniBit.MBColours(MBColors.Red));
MiniBit.ledShow();

// Clear all leds
MiniBit.ledClear();
MiniBit.ledShow();

// Show led at position 1 to Red
MiniBit.setPixelColor(0, MiniBit.MBColours(MBColors.Red));
MiniBit.ledShow();

// Show led rainbow
MiniBit.ledRainbow();
MiniBit.ledShow();

// Show led rainbow and shift
MiniBit.ledRainbow();
MiniBit.ledShift();
MiniBit.ledShow();

// Show led rainbow and rotate
MiniBit.ledRainbow();
MiniBit.ledRotate();
MiniBit.ledShow();

// Set brightness of leds
MiniBit.ledBrightness(100);
MiniBit.ledShow();
```

## Supported targets

* for PXT/microbit

## License

MIT
