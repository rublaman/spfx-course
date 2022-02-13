import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneLink
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./PropertyPaneWpWebPart.module.scss";
import * as strings from "PropertyPaneWpWebPartStrings";

export interface IPropertyPaneWpWebPartProps {
  description: string;

  productname: string;
  productdescription: string;
  productcost: number;
  quantity: number;
  billamount: number;
  discount: number;
  netbillamount: number;

  isCertified: boolean;
  rating: number;
  processorType: string;
  invoiceFileType: string;
  newProcessorType: string;
  discountCoupon: boolean;
}

export default class PropertyPaneWpWebPart extends BaseClientSideWebPart<IPropertyPaneWpWebPartProps> {

  protected onInit(): Promise<void> {

    this.properties.productname = "Raton";
    this.properties.productdescription = "Descripcion raton";
    this.properties.quantity = 500;
    this.properties.productcost = 300;
    console.log(this.properties);


    return Promise.resolve();
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.propertyPaneWp}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <table>
                <tr>
                  <td>Product name</td>
                  <td>${this.properties.productname}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>${this.properties.productdescription}</td>
                </tr>
                <tr>
                  <td>Product Cost</td>
                  <td>${this.properties.productcost}</td>
                </tr>
                <tr>
                  <td>Product Quantity</td>
                  <td>${this.properties.quantity}</td>
                </tr>

                <tr>
                  <td>Bill amount</td>
                  <td>${this.properties.billamount = this.properties.productcost * this.properties.quantity}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>${this.properties.discount = this.properties.billamount * 10 / 100}</td>
                </tr>
                <tr>
                  <td>Bill amount</td>
                  <td>${this.properties.netbillamount = this.properties.billamount - this.properties.discount}</td>
                </tr>

                <tr>
                  <td>Is Certified?</td>
                  <td>${this.properties.isCertified}</td>
                </tr>

                <tr>
                  <td>Rating</td>
                  <td>${this.properties.rating}</td>
                </tr>

                <tr>
                  <td>Processor Type</td>
                  <td>${this.properties.processorType}</td>
                </tr>

                <tr>
                  <td>Invoice File Type</td>
                  <td>${this.properties.invoiceFileType}</td>
                </tr>

              <tr>
                <td>New Processor Type</td>
                <td>${this.properties.newProcessorType}</td>
              </tr>

              <tr>
                <td>Do you have a discount coupon?</td>
                <td>${this.properties.discountCoupon}</td>
              </tr>

              </table>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean {
    return false;
  }

  //   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //     return {
  //       pages: [
  //         {
  //           header: {
  //             description: strings.PropertyPaneDescription
  //           },
  //           groups: [
  //             {
  //               groupName: strings.BasicGroupName,
  //               groupFields: [
  //                 PropertyPaneTextField('description', {
  //                   label: strings.DescriptionFieldLabel
  //                 })
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     };
  //   }
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Group 1",
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField("productname", {
                  label: "Product name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product name",
                  description: "Name property field",
                }),

                PropertyPaneTextField("productdescription", {
                  label: "Product description",
                  multiline: true,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product description",
                  description: "Name property field",
                }),

                PropertyPaneTextField("productcost", {
                  label: "Product cost",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product cost",
                  description: "Name property field",
                }),

                PropertyPaneTextField("quantity", {
                  label: "Product quantity",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product quantity",
                  description: "Name property field",
                }),

                PropertyPaneToggle('isCertified', {
                  key: 'isCertified',
                  label: 'It it Certified?',
                  onText: 'ISI Certified',
                  offText: 'Not an ISI Certified Product'
                }),

                PropertyPaneSlider('rating', {
                  label: 'Select your rating',
                  min: 1,
                  max: 10,
                  step: 1,
                  showValue: true,
                  value: 1
                }),

                PropertyPaneChoiceGroup('processorType', {
                  label: 'Choices',
                  options: [
                    { key: 'Intel I5', text: 'Intel I5' },
                    { key: 'Intel I7', text: 'Intel I7', checked: true },
                    { key: 'Intel I9', text: 'Intel I9' },
                  ]
                }),

                PropertyPaneChoiceGroup('invoiceFileType', {
                  label: 'Select Invoice File Type',
                  options: [
                    {
                      key: 'MSWord', text: 'MSWord',
                      imageSrc: 'https://img.icons8.com/ios/50/000000/ms-word.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png'
                    },
                    {
                      key: 'MSExcel', text: 'MSExcel',
                      imageSrc: 'https://img.icons8.com/ios/50/000000/ms-word.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png'
                    },
                    {
                      key: 'MSPowerPoint', text: 'MSPowerPoint',
                      imageSrc: 'https://img.icons8.com/ios/50/000000/ms-word.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png'
                    },
                  ]
                }),

                PropertyPaneDropdown('newProcessorType', {
                  label: "New Processor Type",
                  options: [
                    { key: 'Intel I5', text: 'Intel I5' },
                    { key: 'Intel I7', text: 'Intel I7' },
                    { key: 'Intel I9', text: 'Intel I9' },
                  ],
                  selectedKey: 'Intel I7'
                }),

                PropertyPaneCheckbox('discountCoupon', {
                  text: 'Do you have a discount coupon?',
                  checked: false,
                  disabled: false
                }),

                PropertyPaneLink('', {
                  href: 'https://github.com',
                  text: 'Go to github',
                  target: '_blank',
                  popupWindowProps: {
                    height: 500,
                    width: 500,
                    positionWindowPosition: 2,
                    title: 'github'
                  }
                })
              ],
            },
            {
              groupName: "Group 2",
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField("productname", {
                  label: "Product name",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product name",
                  description: "Name property field",
                }),

                PropertyPaneTextField("productdescription", {
                  label: "Product description",
                  multiline: true,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product description",
                  description: "Name property field",
                }),

                PropertyPaneTextField("productcost", {
                  label: "Product cost",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product cost",
                  description: "Name property field",
                }),

                PropertyPaneTextField("quantity", {
                  label: "Product quantity",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product quantity",
                  description: "Name property field",
                }),

                PropertyPaneToggle('isCertified', {
                  key: 'isCertified',
                  label: 'It it Certified?',
                  onText: 'ISI Certified',
                  offText: 'Not an ISI Certified Product'
                }),

                PropertyPaneSlider('rating', {
                  label: 'Select your rating',
                  min: 1,
                  max: 10,
                  step: 1,
                  showValue: true,
                  value: 1
                }),

                PropertyPaneChoiceGroup('processorType', {
                  label: 'Choices',
                  options: [
                    { key: 'Intel I5', text: 'Intel I5' },
                    { key: 'Intel I7', text: 'Intel I7', checked: true },
                    { key: 'Intel I9', text: 'Intel I9' },
                  ]
                }),

                PropertyPaneChoiceGroup('invoiceFileType', {
                  label: 'Select Invoice File Type',
                  options: [
                    {
                      key: 'MSWord', text: 'MSWord',
                      imageSrc: 'https://img.icons8.com/ios/50/000000/ms-word.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png'
                    },
                    {
                      key: 'MSExcel', text: 'MSExcel',
                      imageSrc: 'https://img.icons8.com/ios/50/000000/ms-word.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png'
                    },
                    {
                      key: 'MSPowerPoint', text: 'MSPowerPoint',
                      imageSrc: 'https://img.icons8.com/ios/50/000000/ms-word.png',
                      imageSize: { width: 32, height: 32 },
                      selectedImageSrc: 'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png'
                    },
                  ]
                }),

                PropertyPaneDropdown('newProcessorType', {
                  label: "New Processor Type",
                  options: [
                    { key: 'Intel I5', text: 'Intel I5' },
                    { key: 'Intel I7', text: 'Intel I7' },
                    { key: 'Intel I9', text: 'Intel I9' },
                  ],
                  selectedKey: 'Intel I7'
                }),

                PropertyPaneCheckbox('discountCoupon', {
                  text: 'Do you have a discount coupon?',
                  checked: false,
                  disabled: false
                }),

                PropertyPaneLink('', {
                  href: 'https://github.com',
                  text: 'Go to github',
                  target: '_blank',
                  popupWindowProps: {
                    height: 500,
                    width: 500,
                    positionWindowPosition: 2,
                    title: 'github'
                  }
                })
              ],
            }
          ],
        },
      ],
    };
  }
}
