
/**
  * Enumeration of motors.
  */
enum MBMotor
{
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="both"
    Both
}

/**
  * Enumeration of directions.
  */
enum MBRobotDirection
{
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
  * Stop modes. Coast or Brake
  */
enum MBStopMode
{
    //% block="no brake"
    Coast,
    //% block="brake"
    Brake
}


/**
 * Ping unit for sensor.
 */
enum MBPingUnit
{
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches,
    //% block="μs"
    MicroSeconds
}

/**
  * Update mode for LEDs
  * setting to Manual requires show LED changes blocks
  * setting to Auto will update the LEDs everytime they change
  */
enum MBMode
{
    Manual,
    Auto
}

/**
  * Pre-Defined LED colours
  */
enum MBColors
{
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}

/**
 * Custom blocks
 */
//% weight=50 color=#e7660b icon="\uf1b9"
namespace minibit
{
    let neoStrip: neopixel.Strip;
    let _updateMode = MBMode.Auto;

// Motor Blocks

    // slow PWM frequency for slower speeds to improve torque
    // only one PWM frequency available for all pins
    function setPWM(speed: number): void
    {
        if (speed < 200)
            pins.analogSetPeriod(AnalogPin.P16, 60000);
        else if (speed < 300)
            pins.analogSetPeriod(AnalogPin.P16, 40000);
        else
            pins.analogSetPeriod(AnalogPin.P16, 30000);
    }

    /**
      * Drive motor(s) forward or reverse.
      * @param motor motor to drive.
      * @param speed speed of motor (-1023 to 1023). eg: 600
      */
    //% blockId="minibit_motor" block="drive %motor|motor(s) at speed %speed"
    //% weight=50
    //% subcategory=Motors
    export function motor(motor: MBMotor, speed: number): void
    {
        let speed0 = 0;
        let speed1 = 0;
        setPWM(Math.abs(speed));
        if (speed == 0)
            stop(MBStopMode.Coast);
        else if (speed > 0)
        {
            speed0 = speed;
            speed1 = 0;
        }
        else
        {
            speed0 = 0;
            speed1 = 0 - speed;
        }
        if ((motor == MBMotor.Left) || (motor == MBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P12, speed0);
            pins.analogWritePin(AnalogPin.P8, speed1);
        }

        if ((motor == MBMotor.Right) || (motor == MBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P16, speed0);
            pins.analogWritePin(AnalogPin.P14, speed1);
        }
    }

    /**
      * Stop robot by coasting slowly to a halt or braking
      * @param mode Brakes on or off
      */
    //% blockId="minibit_stop" block="stop with %mode"
    //% weight=80
    //% subcategory=Motors
    export function stop(mode: MBStopMode): void
    {
        let stopMode = 0;
        if (mode == MBStopMode.Brake)
            stopMode = 1;
        pins.digitalWritePin(DigitalPin.P16, stopMode);
        pins.digitalWritePin(DigitalPin.P14, stopMode);
        pins.digitalWritePin(DigitalPin.P8, stopMode);
        pins.digitalWritePin(DigitalPin.P12, stopMode);
    }

    /**
      * Drive robot forward (or backward) at speed.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      */
    //% blockId="minibit_drive" block="drive at speed %speed"
    //% speed.min=-1023 speed.max=1023
    //% weight=100
    //% subcategory=Motors
    export function drive(speed: number): void
    {
        motor(MBMotor.Both, speed);
    }

    /**
      * Drive robot forward (or backward) at speed for milliseconds.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to drive forward for, then stop. eg: 400
      */
    //% blockId="minibit_drive_milliseconds" block="drive at speed %speed| for %milliseconds|(ms)"
    //% speed.min=-1023 speed.max=1023
    //% weight=70
    //% subcategory=Motors
    export function driveMilliseconds(speed: number, milliseconds: number): void
    {
        drive(speed);
        basic.pause(milliseconds);
        stop(MBStopMode.Coast);
    }

    /**
      * Turn robot in direction at speed.
      * @param direction direction to turn.
      * @param speed speed of motor between 0 and 1023. eg: 600
      */
    //% blockId="minibit_spin" block="spin %direction|at speed %speed"
    //% speed.min=0 speed.max=1023
    //% weight=90
    //% subcategory=Motors
    export function spin(direction: MBRobotDirection, speed: number): void
    {
        if (speed < 0)
            speed = 0;
        if (direction == MBRobotDirection.Left)
        {
            motor(MBMotor.Left, -speed);
            motor(MBMotor.Right, speed);
        }
        else if (direction == MBRobotDirection.Right)
        {
            motor(MBMotor.Left, speed);
            motor(MBMotor.Right, -speed);
        }
    }

    /**
      * Spin robot in direction at speed for milliseconds.
      * @param direction direction to spin
      * @param speed speed of motor between 0 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to spin for, then stop. eg: 400
      */
    //% blockId="minibit_spin_milliseconds" block="spin %direction|at speed %speed| for %milliseconds|(ms)"
    //% speed.min=0 speed.max=1023
    //% weight=60
    //% subcategory=Motors
    export function spinMilliseconds(direction: MBRobotDirection, speed: number, milliseconds: number): void
    {
        spin(direction, speed);
        basic.pause(milliseconds);
        stop(MBStopMode.Coast);
    }

// Sensors and Addons

    /**
    * Read distance from sonar module connected to accessory connector.
    * @param unit desired conversion unit
    */
    //% blockId="bitbot_sonar" block="read sonar as %unit"
    //% weight=100
    //% subcategory=Sensors
    export function sonar(unit: MBPingUnit): number
    {
        // send pulse
        let trig = DigitalPin.P15;
        let echo = DigitalPin.P15;
        let maxCmDistance = 500;
        let d=10;
        pins.setPull(trig, PinPullMode.PullNone);
        for (let x=0; x<10; x++)
        {
            pins.digitalWritePin(trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(trig, 1);
            control.waitMicros(10);
            pins.digitalWritePin(trig, 0);
            // read pulse
            d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
            if (d>0)
                break;
        }
        switch (unit)
        {
            case MBPingUnit.Centimeters: return d / 58;
            case MBPingUnit.Inches: return d / 148;
            default: return d;
        }
    }

// LED Blocks

    // create a neopixel strip if not got one already. Default to brightness 40
    function neo(): neopixel.Strip
    {
        if (!neoStrip)
        {
            neoStrip = neopixel.create(DigitalPin.P13, 4, NeoPixelMode.RGB);
            neoStrip.setBrightness(40);
        }
        return neoStrip;
    }

    // update LEDs if _updateMode set to Auto
    function updateLEDs(): void
    {
        if (_updateMode == MBMode.Auto)
            neo().show();
    }

    /**
      * Sets all LEDs to a given color (range 0-255 for r, g, b).
      * @param rgb RGB color of the LED
      */
    //% blockId="minibit_set_led_color" block="set all LEDs to %rgb=mb_colours"
    //% weight=100
    //% subcategory=LEDs
    export function setLedColor(rgb: number)
    {
        neo().showColor(rgb);
        updateLEDs();
    }

    /**
      * Clear all leds.
      */
    //% blockId="minibit_led_clear" block="clear all LEDs"
    //% weight=90
    //% subcategory=LEDs
    export function ledClear(): void
    {
        neo().clear();
        updateLEDs();
    }

    /**
     * Set single LED to a given color (range 0-255 for r, g, b).
     *
     * @param ledId position of the LED (0 to 11)
     * @param rgb RGB color of the LED
     */
    //% blockId="minibit_set_pixel_color" block="set LED at %ledId|to %rgb=mb_colours"
    //% weight=80
    //% subcategory=LEDs
    export function setPixelColor(ledId: number, rgb: number): void
    {
        neo().setPixelColor(ledId, rgb);
        updateLEDs();
    }

    /**
     * Set the brightness of the LEDs
     * @param brightness a measure of LED brightness in 0-255. eg: 40
     */
    //% blockId="minibit_led_brightness" block="set LED brightness %brightness"
    //% brightness.min=0 brightness.max=255
    //% weight=70
    //% subcategory=LEDs
    export function ledBrightness(brightness: number): void
    {
        neo().setBrightness(brightness);
        updateLEDs();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="minibit_rainbow" block="set led rainbow"
    //% weight=60
    //% subcategory=LEDs
    export function ledRainbow(): void
    {
        neo().showRainbow(1, 360);
        updateLEDs()
    }

    /**
      * Get numeric value of colour
      *
      * @param color Standard RGB Led Colours
      */
    //% blockId="mb_colours" block=%color
    //% weight=50
    //% subcategory=LEDs
    export function MBColours(color: MBColors): number
    {
        return color;
    }

    // Advanced blocks

    /**
      * Set LED update mode (Manual or Automatic)
      * @param updateMode setting automatic will show LED changes automatically
      */
    //% blockId="minibit_set_updateMode" block="set %updateMode|update mode"
    //% weight=100
    //% advanced=true
    export function setUpdateMode(updateMode: MBMode): void
    {
        _updateMode = updateMode;
    }

    /**
      * Show LED changes
      */
    //% blockId="led_show" block="show LED changes"
    //% weight=90
    //% advanced=true
    export function ledShow(): void
    {
        neo().show();
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="minibit_led_rotate" block="rotate LEDs"
    //% weight=80
    //% advanced=true
    export function ledRotate(): void
    {
        neo().rotate(1);
        updateLEDs()
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="minibit_led_shift" block="shift LEDs"
    //% weight=70
    //% subcategory=Leds
    //% advanced=true
    export function ledShift(): void
    {
        neo().shift(1);
        updateLEDs()
    }

    /**
      * Convert from RGB values to colour number
      *
      * @param red Red value of the LED (0 to 255)
      * @param green Green value of the LED (0 to 255)
      * @param blue Blue value of the LED (0 to 255)
      */
    //% blockId="bitbot_convertRGB" block="convert from red %red| green %green| blue %blue"
    //% weight=60
    //% advanced=true
    export function convertRGB(r: number, g: number, b: number): number
    {
        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
    }

}
