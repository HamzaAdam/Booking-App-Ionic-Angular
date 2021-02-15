import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  Plugins,
  Capacitor,
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
})
export class ImagePickerComponent implements OnInit {
  selectedImage;
  usePicker = false;
  @ViewChild("filePicker") filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagepick = new EventEmitter<string | File>();

  constructor(private platform: Platform) {}

  ngOnInit() {
    console.log(this.platform.is("android"), "android");
    console.log(this.platform.is("ios"), "ios");
    console.log(this.platform.is("mobile"), "mobile");
    console.log(this.platform.is("hybrid"), "hybrid");
    console.log(this.platform.is("desktop"), "desktop");
    if (
      (!this.platform.is("hybrid") && this.platform.is("mobile")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera") || this.usePicker) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      correctOrientation: true,
      source: CameraSource.Prompt,
      width: 600,
      resultType: CameraResultType.DataUrl,
    })
      .then((image) => {
        this.selectedImage = image.dataUrl;
        this.imagepick.emit(image.dataUrl);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  onFileChoosen(event: Event) {
    console.log(event);
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagepick.emit(pickedFile);
      console.log(typeof pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}
