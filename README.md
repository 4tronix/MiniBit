# MakeCode Package for 4tronix MiniBit Robot

This library provides a Microsoft Makecode package for 4tronix MiniBit, see
https://4tronix.co.uk/minibit/

## Driving the robot    
The simplest way to drive robot is by using the `driveMilliseconds(...)` and `driveTurnMilliseconds(...)` blocks.   
Note with `driveMilliseconds(...)`, you can specify a negative speed to reverse.   
```blocks
// Drive forward for 2000 ms
minibit.driveMilliseconds(1023, 2000)

// Drive backwards for 2000 ms
minibit.driveMilliseconds(-1023, 2000)

// Spin left for 200 ms
minibit.spinMilliseconds(MBRobotDirection.Left, 1023, 200)

// Turn right for 200 ms
minibit.spinMilliseconds(MBRobotDirection.Right, 1023, 200)
```   

These blocks are also available in non blocking version. The following example performs the same operation as above.   
```blocks
minibit.drive(1023)
basic.pause(1000)

minibit.drive(0)
basic.pause(1000)

minibit.spin(MBRobotDirection.Left, 1023)
basic.pause(250)

minibit.spin(MBRobotDirection.Right, 1023)
basic.pause(250)

minibit.drive(0)
```

## Stopping
When the motor speed is set to zero then it stops. However, we can also use the motor itself to create a reverse generated current to brake much quicker.
This helps when aiming for more accurate manoeuvres. Use the `minibit.stop(...)` command to stop with braking, or coast to a halt
```blocks
minibit.robot_stop(MBStopMode.Coast) # slowly coast to a stop
minibit.robot_stop(MBStopMode.Brake) # rapidly brake
```

## Driving the motor

If you want more fine grain control of individal motors, use `minibit.motor(..)` to drive motor either forward or reverse. The value
indicates speed and is between `-1023` to `1023`. Minus indicates reverse.

```blocks
// Drive 1000 ms forward
minibit.motor(MBMotor.All, 1023);
basic.pause(1000);

// Drive 1000 ms reverse
minibit.motor(MBMotor.All, -1023);
basic.pause(1000);

// Drive 1000 ms forward on left and reverse on right
minibit.motor(MBMotor.Left, 1023);
minibit.motor(MBMotor.Right, -1023);
basic.pause(1000);
```

## Read sonar value

If you have mounted the optional sonar sensor for the MiniBit you can
also use the `minibit.sonar(..)` function to read the distance to obstacles.

```blocks
// Read sonar values
let v1 = minibit.sonar(MBPingUnit.MicroSeconds);
let v2 = minibit.sonar(MBPingUnit.Centimeters);
let v3 = minibit.sonar(MBPingUnit.Inches);
```

## NeoPixel helpers

The MiniBit has 4 smart RGB LEDs (aka neopixels) fitted. This library defines some helpers
for using them.

```blocks
// Show all leds
minibit.neoSetColor(neopixel.colors(NeoPixelColors.Red));
minibit.neoShow();

// Clear all leds
minibit.neoClear();
minibit.neoShow();

// Show led at position 1
minibit.neoSetPixelColor(0, neopixel.colors(NeoPixelColors.Red));
minibit.neoShow();

// Show led rainbow
minibit.neoRainbow();
minibit.neoShow();

// Show led rainbow and shift
minibit.neoRainbow();
minibit.neoShift();
minibit.neoShow();

// Show led rainbow and rotate
minibit.neoRainbow();
minibit.neoRotate();
minibit.neoShow();

// Set brightness of leds
minibit.neoBrightness(100);
minibit.neoShow();

// Use neo() variable
minibit.neo().clear();
minibit.neo().show();
```

## Supported targets

* for PXT/microbit

## License

MIT
