import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

function ShaderBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

      {/* Light luxury green base */}
      <div className="absolute inset-0 bg-[#DDE9E1]" />

      {/* Soft cream atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,250,240,0.65),transparent_60%)]" />

      {/* Animated shader */}
      <div className="absolute -right-48 -top-48 h-[750px] w-[750px] opacity-35">
        <ShaderGradientCanvas
          style={{
            width: '100%',
            height: '100%',
          }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            shader="positionMix"
            wireframe={false}
            uTime={0}
            uSpeed={0.065}
            uStrength={0.16}
            uDensity={0.65}
            uFrequency={1.7}
            uAmplitude={1.4}
            color1="#8FB9A2"
            color2="#C3DCCB"
            color3="#D6B982"
            reflection={0.03}
            cameraZoom={15}
            lightType="3d"
            brightness={0.55}
            grain="off"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Moving sage light */}
      <div className="absolute -left-32 top-[10%] h-[450px] w-[450px] animate-[sageFloat_18s_ease-in-out_infinite] rounded-full bg-[#8FBAA2]/30 blur-[130px]" />

      {/* Moving eucalyptus light */}
      <div className="absolute right-[15%] top-[40%] h-[400px] w-[400px] animate-[eucalyptusFloat_20s_ease-in-out_infinite] rounded-full bg-[#6FA58A]/22 blur-[120px]" />

      {/* Subtle champagne light */}
      <div className="absolute bottom-[-120px] left-[25%] h-[400px] w-[400px] animate-[champagneFloat_22s_ease-in-out_infinite] rounded-full bg-[#D8BE8A]/16 blur-[130px]" />

    </div>
  );
}

export default ShaderBackground;