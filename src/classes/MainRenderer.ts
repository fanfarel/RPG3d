import { WebGL1Renderer, Scene, FogExp2, Object3D, PerspectiveCamera, Vector3, DirectionalLight, AmbientLight, Camera, Color, WebGLRenderer, ReinhardToneMapping, ACESFilmicToneMapping, Vector2, CameraHelper, PCFSoftShadowMap, BasicShadowMap, PCFShadowMap, VSMShadowMap } from "three";
import { LevelBuilder } from "./LevelBuilder";
import { DEMO_01 } from "../levels/DEMO_01";
import { IAnimated, Level, LevelParams } from "../types";

const level = DEMO_01;

export class MainRenderer extends WebGLRenderer {
  private _scene: Scene;
  private _camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  private _animateTargets: IAnimated[] = [];
  private _sun: DirectionalLight;

  private _currentLevel?: LevelBuilder;

  constructor() {
    super({
      antialias: true,
    });

    this._sun = new DirectionalLight(0xf1ba4a, 4);
    this._sun.add(new AmbientLight(0x4b8bfd, 5));

    this._scene = new Scene();
    this._scene.fog = new FogExp2(0xaaaaaa, 0.07);

    this.setupLighting();
    // this.setClearColor(0x4b8bfd); // BLUE SKY
    this.setClearColor(0xbbbbbb);

    this.changeLevel(level, {});
  }

  public changeLevel = (level: Level, params: LevelParams) => {
    this._currentLevel?.disposeLevel();
    this._currentLevel = new LevelBuilder(level, this, params);
    this.setupLighting();
  }

  private setupLighting = () => {
    this.toneMapping = ReinhardToneMapping;
    this.toneMappingExposure = 0.3;

    this._sun.castShadow = true;
    this._sun.shadow.bias = .0000001;
    this._sun.shadow.camera.top = 10;
    this._sun.shadow.camera.bottom = -10;
    this._sun.shadow.camera.left = 10;
    this._sun.shadow.camera.right = -10;
    this._sun.shadow.mapPass = new Vector2(4048, 4048);

    this.add(this._sun);
  }

  public clearScene() {
    this._scene?.remove(...this._scene.children);
  }

  public add(...objects: Object3D[]) {
    this._scene.add(...objects);
  }

  public remove(...objects: Object3D[]) {
    this._scene.remove(...objects);
  }

  public addAnimated(target: IAnimated) {
    this._animateTargets.push(target);
  }

  public removeAnimated(target: IAnimated) {
    this._animateTargets.splice(this._animateTargets.indexOf(target), 1);
  }

  public setMainCamera(camera: PerspectiveCamera) {
    this._camera = camera;
  }

  public animate() {
    this._animateTargets.forEach((target) => target.animate());

    const cameraWorldPosition = this._camera.position.clone();

    this._sun.position.set(
      cameraWorldPosition.x - 18,
      cameraWorldPosition.y + 30,
      cameraWorldPosition.z - 5,
    );
    this._sun.target = this._camera;

    this.render(this._scene, this._camera);
  }
}
