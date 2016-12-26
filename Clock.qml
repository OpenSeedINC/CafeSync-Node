import QtQuick 2.3
import QtQuick.Window 2.2
//import QtQuick.Controls 1.3
//import QtQuick.Controls.Styles 1.3
import Ubuntu.Components 1.2
import QtGraphicalEffects 1.0

import "main.js" as Scripts


Item {
    id:clock
    property string number: "0"
    property string list:""
    z:3

    clip: true

    onStateChanged: Scripts.loadActions(list)
    states: [
        State {
            name:"even"
            PropertyChanges {
                target: popup
               // z: 3
            }

        },
        State {
          name:"odd"
          PropertyChanges {
              target: popup
              //z: 3
          }
        }
    ]

    //anchors.centerIn: parent



    Image {
        source:"img/CafeSync.png"
        anchors.fill:parent

        Text {
            anchors.centerIn: parent
            text:number
            font.pixelSize: parent.width / 3
            horizontalAlignment : Text.AlignHCenter
            color:"white"

        }


    }


}




