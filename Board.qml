import QtQuick 2.3
import QtQuick.Window 2.2
//import QtQuick.Controls 1.3
//import QtQuick.Controls.Styles 1.3
import Ubuntu.Components 1.2
import Ubuntu.Web 0.2
import Ubuntu.Content 1.1
import Ubuntu.Layouts 1.0

import QtQuick.LocalStorage 2.0 as Sql
import "main.js" as Scripts


Item {
    id:slideright
    property string number: "0"
    property string list:""

    clip: true


    states: [
        State {
            name:"Active"
            PropertyChanges {
                target: slideright
                z: 3

            }

        },
        State {
          name:"InActive"
          PropertyChanges {
              target: slideright
              z: 3
              x:parent.width
          }
        }
    ]

    transitions: Transition {
            NumberAnimation { properties: "x,y"; easing.type: Easing.InOutQuad;duration:1200 }
        }

    Rectangle {
        color:"white"
        border.color:"gray"
        border.width:2
        height:parent.height
        width:parent.width

        WebView {
                                     id:site
                                     width:parent.width * 0.998
                                     height:parent.height * 0.998
                                     url:webview1
                                 }

    }

    //onStateChanged: Scripts.Show_sites(currentcard)

}
