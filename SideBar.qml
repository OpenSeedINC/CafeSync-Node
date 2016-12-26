import QtQuick 2.3
import QtQuick.Window 2.2
//import QtQuick.Controls 1.3
//import QtQuick.Controls.Styles 1.3
import Ubuntu.Components 1.2

import QtQuick.LocalStorage 2.0 as Sql
import "main.js" as Scripts


Item {
    id:slideleft
    property string number: "0"
    property string list:""

    clip: true
    property string name:""
    property string phone:""
    property string email:""
    property string company:""
    property string alias:""
    property string motto:""
    property string website1:""
    property string website2:""
     property string website3:""
    property string avatar:""
    property string cardback:""




    states: [
        State {
            name:"Active"
            PropertyChanges {
                target: slideleft
                z: 3
                x:parent.x
            }

        },
        State {
          name:"InActive"
          PropertyChanges {
              target: slideleft
              z: 3
              x:parent.x - parent.width
          }

        }
    ]

    transitions: Transition {
            NumberAnimation { properties: "x,y"; easing.type: Easing.InOutQuad;duration:1000 }
        }

    Rectangle {
        color:"white"
        border.color:"gray"
        border.width:2
        height:parent.height
        width:parent.width

        Image {
            id:backboard
            source:"img/backing.png"
            anchors.fill:parent

        }

        Image {
            id:cavatar
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.top:parent.top
            anchors.topMargin: 5
            width:parent.width * 0.60
            height: parent.width * 0.60
            source:if(avatar.length > 0) {return avatar} else {return "img/default_avatar.png"}
        }
        Rectangle {
            id:cavatarborder
            color:"gray"
            anchors.top:cavatar.bottom
            anchors.margins:10
            width:parent.width
            height:3

        }
        Column {
            id:infocolumn
            width:parent.width
            height: infoBot.bottom
            anchors.top:cavatarborder.bottom
            anchors.left:parent.left
            //anchors.leftMargin: units.gu(1)
            spacing: units.gu(1)

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text:"<b> "+company+"</b>"
                font.pixelSize: (slideleft.width - company.length) / 10

            }
            Rectangle {
                width:parent.width
                height: 3
                color: "gray"
            }

            Text {
                text:" "+name
                font.pixelSize:(slideleft.width - name.length) / 12

            }
            Text {
                text:" "+phone
                font.pixelSize:(slideleft.width - phone.length) / 14
            }
            Text {
                text:" "+email
                font.pixelSize:(slideleft.width - email.length) / 16
            }
            Rectangle {
                id:infoBot
                width:parent.width
                height:3
                color:"gray"

            }
        }

        Text {
            id:mottoSpot
            text:motto
            anchors.top:infocolumn.bottom
            anchors.topMargin: units.gu(1)
            anchors.left:parent.left
            anchors.leftMargin: units.gu(1)
            width:parent.width
            font.pixelSize: units.gu(3)
            wrapMode: Text.WordWrap
        }

    }
    Image {
        id:cardimage
        source:cardback
        anchors.bottom:parent.bottom
        anchors.bottomMargin:units.gu(1)
        anchors.horizontalCenter: parent.horizontalCenter
        width:parent.width * 0.90
        height:parent.width * 0.50
    }

    onStateChanged: Scripts.cardinfo(currentcard)
}




