input.onButtonPressed(Button.A, function () {
    servoAngle = 0
    radio.sendValue("servo", servoAngle)
})
input.onButtonPressed(Button.B, function () {
    servoAngle = 270
    radio.sendValue("servo", servoAngle)
})
radio.onReceivedValue(function (name, value) {
    if (name == "D") {
        rxDistance = value
    } else if (name == "L") {
        rxLight = value
    } else if (name == "C") {
        rxColor = value
    }
})
let rxColor = 0
let rxLight = 0
let rxDistance = 0
let servoAngle = 0
StartbitV2.startbit_Init()
StartbitV2.startbit_digitaltube(StartbitV2.startbit_digitaltubePort.port1, 7, 4)
radio.setGroup(23)
serial.redirectToUSB()
basic.forever(function () {
    serial.writeLine("distance=" + rxDistance)
    serial.writeLine("light=" + rxLight)
    serial.writeLine("color=" + rxColor)
    serial.writeLine("servo=" + servoAngle)
    serial.writeLine("-----------------")
    StartbitV2.startbit_showNumber(rxDistance)
    basic.pause(500)
})
