//export default Dymo;
//import { strictEqual } from "assert";

//----------------------------------------------------------------------------
//
//  $Id: PreviewAndPrintLabel.js 11419 2010-04-07 21:18:22Z vbuzuev $ 
//
// Project -------------------------------------------------------------------
//
//  DYMO Label Framework
//
// Content -------------------------------------------------------------------
//
//  DYMO Label Framework JavaScript Library Samples: Preview and Print label
//
//----------------------------------------------------------------------------
//
//  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
//
//----------------------------------------------------------------------------
//export loadPrinter;



export function loadPrinter() {
    return dymo.label.framework.getPrinters();
};

//export loadLabelFromWeb;
export function loadLabelFromWeb() {
    return dymo.label.framework.openLabelXml(getAddressLabelXml());
  
    
};

export function renderPreview(label){
    return label.render();
};


export function getFullname(label) {
   return label.getObjectText("Fullname");
};


export function getCompany(label) {
    return label.getObjectText("Company");
};

export function setFullname(label, address){
    return label.setObjectText("Fullname", address);
};


export function setCompany(label, address){
   return label.setObjectText("Company", address);
};


export function getTitle(label) {
    return label.getObjectText("Title");
};

export function setTitle(label, address){
    return label.setObjectText("Title", address);
};


export function getBadge(label) {
    return label.getObjectText("Badge");
};

export function setBadge(label, address){
    return label.setObjectText("Badge", address);
};

export function printLabel(label,printerName){
    try {
        if (!label) {
            alert("Load label before printing");
            return;
        }        
        label.print(printerName);        
    }
    catch (e) {
        alert(e.message || e);
    }
};

export function updatePreview(label) {
   
    var pngData = label.render();
    labelImage.src = "data:image/png;base64," + pngData;
}


export function getAddressLabelXml() {

   return `<?xml version="1.0" encoding="utf-8"?>
   <DieCutLabel Version="8.0" Units="twips">
       <PaperOrientation>Landscape</PaperOrientation>
       <Id>NameBadge</Id>
       <IsOutlined>false</IsOutlined>
       <PaperName>30256 Shipping</PaperName>
       <DrawCommands>
           <Path>
               <FillMode>EvenOdd</FillMode>
               <RoundRectangle X="0" Y="0" Width="3331" Height="5760" Rx="180" Ry="180" />
               <RoundRectangle X="2880" Y="2520" Width="180" Height="720" Rx="120" Ry="120" />
           </Path>
       </DrawCommands>
       <ObjectInfo>
           <TextObject>
               <Name>Fullname</Name>
               <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
               <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
               <LinkedObjectName />
               <Rotation>Rotation0</Rotation>
               <IsMirrored>False</IsMirrored>
               <IsVariable>False</IsVariable>
               <GroupID>-1</GroupID>
               <IsOutlined>False</IsOutlined>
               <HorizontalAlignment>Center</HorizontalAlignment>
               <VerticalAlignment>Middle</VerticalAlignment>
               <TextFitMode>ShrinkToFit</TextFitMode>
               <UseFullFontHeight>True</UseFullFontHeight>
               <Verticalized>False</Verticalized>
               <StyledText>
                   <Element>
                       <String xml:space="preserve">Firstname Lastname</String>
                       <Attributes>
                           <Font Family="Arial" Size="20" Bold="True" Italic="False" Underline="False" Strikeout="False" />
                           <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
                       </Attributes>
                   </Element>
               </StyledText>
           </TextObject>
           <Bounds X="336" Y="391.181121826172" Width="5338" Height="833.385864257813" />
       </ObjectInfo>
       <ObjectInfo>
           <ShapeObject Stroke="SolidLine">
               <Name>Shape</Name>
               <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
               <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
               <LinkedObjectName />
               <Rotation>Rotation0</Rotation>
               <IsMirrored>False</IsMirrored>
               <IsVariable>False</IsVariable>
               <GroupID>-1</GroupID>
               <IsOutlined>False</IsOutlined>
               <ShapeType>HorizontalLine</ShapeType>
               <LineWidth>15</LineWidth>
               <LineAlignment>Center</LineAlignment>
               <FillColor Alpha="0" Red="255" Green="255" Blue="255" />
           </ShapeObject>
           <Bounds X="336" Y="1198.59997558594" Width="5265" Height="15" />
       </ObjectInfo>
       <ObjectInfo>
           <TextObject>
               <Name>Company</Name>
               <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
               <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
               <LinkedObjectName />
               <Rotation>Rotation0</Rotation>
               <IsMirrored>False</IsMirrored>
               <IsVariable>True</IsVariable>
               <GroupID>-1</GroupID>
               <IsOutlined>False</IsOutlined>
               <HorizontalAlignment>Center</HorizontalAlignment>
               <VerticalAlignment>Top</VerticalAlignment>
               <TextFitMode>ShrinkToFit</TextFitMode>
               <UseFullFontHeight>True</UseFullFontHeight>
               <Verticalized>False</Verticalized>
               <StyledText>
                   <Element>
                       <String xml:space="preserve">COMPANY NAME</String>
                       <Attributes>
                           <Font Family="Arial" Size="18" Bold="True" Italic="False" Underline="False" Strikeout="False" />
                           <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
                       </Attributes>
                   </Element>
               </StyledText>
           </TextObject>
           <Bounds X="396" Y="1317.04724121094" Width="5087.1259765625" Height="476.929142372689" />
       </ObjectInfo>
       <ObjectInfo>
           <ImageObject>
               <Name>GRAPHIC</Name>
               <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
               <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
               <LinkedObjectName />
               <Rotation>Rotation0</Rotation>
               <IsMirrored>False</IsMirrored>
               <IsVariable>False</IsVariable>
               <GroupID>-1</GroupID>
               <IsOutlined>False</IsOutlined>
               <Image>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</Image>
               <ScaleMode>Uniform</ScaleMode>
               <BorderWidth>0</BorderWidth>
               <BorderColor Alpha="255" Red="0" Green="0" Blue="0" />
               <HorizontalAlignment>Center</HorizontalAlignment>
               <VerticalAlignment>Center</VerticalAlignment>
           </ImageObject>
           <Bounds X="2839" Y="2100" Width="2835" Height="1149" />
       </ObjectInfo>
       <ObjectInfo>
           <TextObject>
               <Name>Badge</Name>
               <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
               <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
               <LinkedObjectName />
               <Rotation>Rotation0</Rotation>
               <IsMirrored>False</IsMirrored>
               <IsVariable>False</IsVariable>
               <GroupID>-1</GroupID>
               <IsOutlined>False</IsOutlined>
               <HorizontalAlignment>Left</HorizontalAlignment>
               <VerticalAlignment>Top</VerticalAlignment>
               <TextFitMode>ShrinkToFit</TextFitMode>
               <UseFullFontHeight>True</UseFullFontHeight>
               <Verticalized>False</Verticalized>
               <StyledText>
                   <Element>
                       <String xml:space="preserve">1234567-89</String>
                       <Attributes>
                           <Font Family="Arial" Size="12" Bold="True" Italic="False" Underline="False" Strikeout="False" />
                           <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
                       </Attributes>
                   </Element>
               </StyledText>
           </TextObject>
           <Bounds X="424" Y="2595" Width="2340" Height="435" />
       </ObjectInfo>
       <ObjectInfo>
           <TextObject>
               <Name>Title</Name>
               <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
               <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
               <LinkedObjectName />
               <Rotation>Rotation0</Rotation>
               <IsMirrored>False</IsMirrored>
               <IsVariable>False</IsVariable>
               <GroupID>-1</GroupID>
               <IsOutlined>False</IsOutlined>
               <HorizontalAlignment>Center</HorizontalAlignment>
               <VerticalAlignment>Top</VerticalAlignment>
               <TextFitMode>ShrinkToFit</TextFitMode>
               <UseFullFontHeight>True</UseFullFontHeight>
               <Verticalized>False</Verticalized>
               <StyledText>
                   <Element>
                       <String xml:space="preserve">Title goes here</String>
                       <Attributes>
                           <Font Family="Arial" Size="14" Bold="False" Italic="False" Underline="False" Strikeout="False" />
                           <ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" />
                       </Attributes>
                   </Element>
               </StyledText>
           </TextObject>
           <Bounds X="336" Y="1770" Width="5205" Height="360" />
       </ObjectInfo>
   </DieCutLabel>`;
    
};

/*
class Dymo = function() {    
    // stores loaded label info
    var label;

    function loadPrinter() {
        return dymo.label.framework.getPrinters();   
     }
    

    // called when the document completly loaded
    function onload() {
        var labelFile = document.getElementById('labelFile');
        var addressTextArea = document.getElementById('addressTextArea');
        var printersSelect = document.getElementById('printersSelect');
        var printButton = document.getElementById('printButton');


        // initialize cont rols
        printButton.disabled = true;
        addressTextArea.disabled = true;

        // Generates label preview and updates corresponend <img> element
        // Note: this does not work in IE 6 & 7 because they don't support data urls
        // if you want previews in IE 6 & 7 you have to do it on the server side
        function updatePreview() {
            if (!label)
                return;

            var pngData = label.render();

            var labelImage = document.getElementById('labelImage');
            labelImage.src = "data:image/png;base64," + pngData;
        }

    
        // loads all supported printers into a combo box 
        function loadPrinters() {
            var printers = dymo.label.framework.getPrinters();
           
            if (printers.length == 0) {
                alert("No DYMO printers are installed. Install DYMO printers.");
                return;
            }

            for (var i = 0; i < printers.length; i++) {
                var printer = printers[i];
               
                if (printer.printerType == "LabelWriterPrinter") {
                    var printerName = printer.name;
                    console.log(printerName);
                    var option = document.createElement('option');
                    option.value = printerName;
                    option.appendChild(document.createTextNode(printerName));
                    printersSelect.appendChild(option);
                }
            }
           
        }

        // returns current address on the label 
       function getAddress() {
            console.log("in the get address function.");
            if (!label || label.getAddressObjectCount() == 0)
                return "";

            return label.getAddressText(0);
        }

        // set current address on the label 
       function setAddress(address) {
            if (!label || label.getAddressObjectCount() == 0)
                return;

            return label.setAddressText(0, address);
        }


        // updates address on the label when user types in textarea field
        addressTextArea.onkeyup = function () {
            if (!label) {
                alert('Load label before entering address data');
                return;
            }

            setAddress(addressTextArea.value);
            updatePreview();
        }

      

        
       
        
        function loadLabelFromWeb() {
            // use jQuery API to load label
            //$.get("Address.label", function(labelXml)
            //{
            label = dymo.label.framework.openLabelXml(getAddressLabelXml());
            // check that label has an address object
            if (label.getAddressObjectCount() == 0) {
                alert("Selected label does not have an address object on it. Select another label");
                return;
            }

            updatePreview();
            addressTextArea.value = getAddress();
            printButton.disabled = false;
            addressTextArea.disabled = false;
            //}, "text");
        }

        loadLabelFromWeb();

        // load printers list on startup
        loadPrinters();
    };

    function initTests()
	{
		if(dymo.label.framework.init)
		{
			//dymo.label.framework.trace = true;
			dymo.label.framework.init(onload);
		} else {
			onload();
		}
	}

	// register onload event
	if (window.addEventListener)
		window.addEventListener("load", initTests, false);
	else if (window.attachEvent)
		window.attachEvent("onload", initTests);
	else
		window.onload = initTests;
};
*/
