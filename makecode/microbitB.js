radio.onReceivedValue(function (name, value) {
    if (name == "servo") {
        servoAngle = value
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range2, 1, servoAngle, 500)
        StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range2, 2, servoAngle, 500)
    }
})
let colorCode = 0
let distance = 0
let light2 = 0
let servoAngle = 0
StartbitV2.startbit_Init()
StartbitV2.photosensitiveSensor_init(StartbitV2.startbit_PhotosensitiveSensor.port1)
StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port2)
StartbitV2.startbit_init_colorSensor(StartbitV2.startbit_iic.port4)
radio.setGroup(23)
radio.setTransmitPower(7)
servoAngle = 0
StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range2, 1, servoAngle, 500)
StartbitV2.setPwmServo(StartbitV2.startbit_servorange.range2, 2, servoAngle, 500)
basic.forever(function () {
    light2 = StartbitV2.startbit_getphotosensitiveValue(StartbitV2.startbit_photosensitivePort.port1)
    distance = StartbitV2.startbit_ultrasonic(StartbitV2.startbit_ultrasonicPort.port2)
    colorCode = 0
    if (StartbitV2.startbit_checkCurrentColor(StartbitV2.startbit_Colors.Red)) {
        colorCode = 1
    } else if (StartbitV2.startbit_checkCurrentColor(StartbitV2.startbit_Colors.Green)) {
        colorCode = 2
    } else if (StartbitV2.startbit_checkCurrentColor(StartbitV2.startbit_Colors.Blue)) {
        colorCode = 3
    } else if (StartbitV2.startbit_checkCurrentColor(StartbitV2.startbit_Colors.White)) {
        colorCode = 4
    } else if (StartbitV2.startbit_checkCurrentColor(StartbitV2.startbit_Colors.Black)) {
        colorCode = 5
    } else {
        colorCode = 0
    }
    radio.sendValue("D", distance)
    basic.pause(20)
    radio.sendValue("L", light2)
    basic.pause(20)
    radio.sendValue("C", colorCode)
    basic.pause(500)
})
