/**
 * 可爱风格特效系统 - Cute Effects System
 * 专为三丽鸥梦幻消消乐设计的柔和2D动画效果
 */

// 柔和 pastel 配色，符合三丽鸥甜美风格
const CUTE_COLORS = {
  pink: '#FFB8C9',
  pinkDark: '#FF6FAE',
  yellow: '#FFE4A0',
  yellowDark: '#FFD700',
  blue: '#B8E0FF',
  blueDark: '#7EC8FF',
  green: '#B8E8C8',
  greenDark: '#8FDC8F',
  purple: '#E8D5FF',
  purpleDark: '#C5A3FF',
  white: '#FFF8FA',
  sparkle: '#FFFEF0'
};

const EFFECT_SPRITES = {
  bomb: [1, 2, 3, 4, 5, 6].map(i => `assets/images/effects/bomb/bomb_${i}.png`),
  rainbow: [1, 2, 3, 4, 5, 6].map(i => `assets/images/effects/rainbow/rainbow_${i}.png`)
};

const effectImageCache = {};

function getEffectImage(src) {
  if (!effectImageCache[src]) {
    const image = wx.createImage();
    image.onload = () => {
      image.ready = true;
    };
    image.src = src;
    effectImageCache[src] = image;
  }
  return effectImageCache[src];
}

function drawEllipse(ctx, x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
  if (ctx.ellipse) {
    ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation || 0);
  ctx.scale(1, radiusY / radiusX);
  ctx.arc(0, 0, radiusX, startAngle, endAngle);
  ctx.restore();
}

class CuteParticle {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.vx = config.vx || 0;
    this.vy = config.vy || 0;
    this.life = config.life || 60;
    this.maxLife = this.life;
    this.size = config.size || 8;
    this.color = config.color || CUTE_COLORS.pink;
    this.type = config.type || 'circle';
    this.gravity = config.gravity || 0.1;
    this.alpha = 1;
    this.rotation = 0;
    this.rotationSpeed = config.rotationSpeed || 0;
    this.scale = 1;
    this.scaleSpeed = config.scaleSpeed || -0.01;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.rotation += this.rotationSpeed;
    this.scale += this.scaleSpeed;
    this.life--;

    // 柔和淡出
    this.alpha = Math.pow(this.life / this.maxLife, 0.8);

    return this.life > 0 && this.scale > 0;
  }

  render(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha * 0.9;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);

    // 柔和阴影
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = this.color;

    switch (this.type) {
      case 'circle':
        this.drawCuteCircle(ctx, 0, 0, this.size);
        break;
      case 'star':
        this.drawSoftStar(ctx, 0, 0, this.size);
        break;
      case 'heart':
        this.drawRoundHeart(ctx, 0, 0, this.size);
        break;
      case 'bubble':
        this.drawBubble(ctx, 0, 0, this.size);
        break;
      case 'note':
        this.drawNote(ctx, 0, 0, this.size);
        break;
      case 'flower':
        this.drawFlower(ctx, 0, 0, this.size);
        break;
    }

    ctx.restore();
  }

  drawCuteCircle(ctx, x, y, size) {
    // 主体
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // 高光（增加可爱感）
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    drawEllipse(ctx, x - size * 0.3, y - size * 0.3, size * 0.3, size * 0.2, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawSoftStar(ctx, x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const px = x + Math.cos(angle) * size;
      const py = y + Math.sin(angle) * size;
      if (i === 0) ctx.moveTo(px, py);
      else {
        const prevAngle = ((i - 1) * 4 * Math.PI) / 5 - Math.PI / 2;
        const midAngle = (angle + prevAngle) / 2;
        const midR = size * 0.4;
        const cpX = x + Math.cos(midAngle) * midR;
        const cpY = y + Math.sin(midAngle) * midR;
        ctx.quadraticCurveTo(cpX, cpY, px, py);
      }
    }
    ctx.closePath();
    ctx.fill();

    // 中心高光
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawRoundHeart(ctx, x, y, size) {
    const s = size * 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y - s * 0.3, x - s, y - s * 0.3, x - s, y - s * 0.1);
    ctx.bezierCurveTo(x - s, y + s * 0.3, x - s * 0.2, y + s * 0.7, x, y + s);
    ctx.bezierCurveTo(x + s * 0.2, y + s * 0.7, x + s, y + s * 0.3, x + s, y - s * 0.1);
    ctx.bezierCurveTo(x + s, y - s * 0.3, x, y - s * 0.3, x, y + s * 0.3);
    ctx.fill();

    // 高光
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    drawEllipse(ctx, x - s * 0.3, y - s * 0.1, s * 0.2, s * 0.15, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBubble(ctx, x, y, size) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawNote(ctx, x, y, size) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    drawEllipse(ctx, x - size * 0.2, y + size * 0.3, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x + size * 0.1, y - size * 0.7, size * 0.15, size * 1);
  }

  drawFlower(ctx, x, y, size) {
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = x + Math.cos(angle) * size * 0.5;
      const py = y + Math.sin(angle) * size * 0.5;
      ctx.beginPath();
      drawEllipse(ctx, px, py, size * 0.3, size * 0.5, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = CUTE_COLORS.yellow;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }
}

class CuteEffectManager {
  constructor() {
    this.particles = [];
    this.floatTexts = [];
    this.overlays = [];
  }

  // 消除效果
  createMatchEffect(x, y, pieceType) {
    const colors = this.getPieceColors(pieceType);
    const count = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 2;

      this.particles.push(new CuteParticle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 40 + Math.random() * 20,
        size: 6 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'star' : 'heart',
        gravity: 0.15,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      }));
    }

    // 添加一个小气泡
    this.particles.push(new CuteParticle({
      x: x,
      y: y,
      vx: 0,
      vy: -1,
      life: 30,
      size: 10,
      color: 'rgba(255, 255, 255, 0.5)',
      type: 'bubble'
    }));
  }

  // 连击效果
  createComboEffect(x, y, comboCount) {
    const colors = [CUTE_COLORS.pink, CUTE_COLORS.yellow, CUTE_COLORS.blue, CUTE_COLORS.purple];
    const count = Math.min(comboCount * 2, 12);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 2;

      this.particles.push(new CuteParticle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 50 + Math.random() * 20,
        size: 5 + Math.random() * 5,
        color: colors[i % colors.length],
        type: i % 3 === 0 ? 'flower' : 'star',
        gravity: 0.12,
        rotationSpeed: 0.05
      }));
    }

    this.createFloatText(x, y - 30, `连击 x${comboCount}!`, CUTE_COLORS.pinkDark);
  }

  // 特殊糖果生成效果
  createSpecialEffect(x, y, specialType) {
    const colors = {
      striped_h: [CUTE_COLORS.pink, CUTE_COLORS.pinkDark],
      striped_v: [CUTE_COLORS.blue, CUTE_COLORS.blueDark],
      color_bomb: [CUTE_COLORS.yellow, CUTE_COLORS.purple, CUTE_COLORS.pink]
    };

    const effectColors = colors[specialType] || [CUTE_COLORS.yellow];

    for (let i = 0; i < 8; i++) {
      this.particles.push(new CuteParticle({
        x: x,
        y: y,
        vx: Math.cos(i * Math.PI / 4) * 3,
        vy: Math.sin(i * Math.PI / 4) * 3,
        life: 40,
        size: 4,
        color: effectColors[i % effectColors.length],
        type: 'star',
        scaleSpeed: -0.02
      }));
    }
  }

  // 道具效果
  createPowerUpEffect(type, x, y) {
    switch (type) {
      case 'freeze':
        this.createFreezeEffect(x, y);
        break;
      case 'hammer':
        this.createHammerEffect(x, y);
        break;
      case 'bomb':
        this.createBombEffect(x, y);
        break;
      case 'rainbow':
        this.createRainbowEffect(x, y);
        break;
      case 'plus_five':
        this.createPlusFiveEffect(x, y);
        break;
    }
  }

  createFreezeEffect(x, y) {
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      this.particles.push(new CuteParticle({
        x: x,
        y: y,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        life: 60,
        size: 8,
        color: CUTE_COLORS.blue,
        type: 'star',
        rotationSpeed: 0.1
      }));
    }

    for (let i = 0; i < 10; i++) {
      this.particles.push(new CuteParticle({
        x: x + (Math.random() - 0.5) * 100,
        y: y - Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 1 + Math.random(),
        life: 80,
        size: 3 + Math.random() * 3,
        color: 'rgba(255, 255, 255, 0.8)',
        type: 'star',
        rotationSpeed: 0.05
      }));
    }
  }

  createHammerEffect(x, y) {
    for (let i = 0; i < 5; i++) {
      this.particles.push(new CuteParticle({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 5,
        life: 25,
        size: 5,
        color: i % 2 === 0 ? CUTE_COLORS.yellow : CUTE_COLORS.pink,
        type: 'star',
        gravity: 0.3
      }));
    }
  }

  createBombEffect(x, y) {
    const colors = [CUTE_COLORS.pink, CUTE_COLORS.yellow, CUTE_COLORS.white];

    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 4 + Math.random() * 3;

      this.particles.push(new CuteParticle({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 35,
        size: 6 + Math.random() * 4,
        color: colors[i % colors.length],
        type: 'heart',
        scaleSpeed: -0.03
      }));
    }
  }

  createBombBlastEffect(x, y, cellSize, radius) {
    this.overlays.push({
      type: 'bomb_blast',
      x,
      y,
      cellSize,
      radius,
      startTime: Date.now(),
      duration: 420
    });

    this.overlays.push({
      type: 'sprite',
      spriteType: 'bomb',
      x,
      y,
      size: cellSize * 4.2,
      startTime: Date.now(),
      duration: 520
    });

    const burstCount = 18;
    const colors = [CUTE_COLORS.pink, CUTE_COLORS.yellow, CUTE_COLORS.white, '#FFB36B'];
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount;
      const speed = 3 + Math.random() * 5;
      this.particles.push(new CuteParticle({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 38,
        size: 5 + Math.random() * 6,
        color: colors[i % colors.length],
        type: i % 2 === 0 ? 'star' : 'heart',
        gravity: 0.05,
        scaleSpeed: -0.025,
        rotationSpeed: 0.1
      }));
    }
  }

  createRainbowEffect(x, y) {
    const rainbow = [
      CUTE_COLORS.pink,
      CUTE_COLORS.yellow,
      CUTE_COLORS.green,
      CUTE_COLORS.blue,
      CUTE_COLORS.purple
    ];

    rainbow.forEach((color, i) => {
      for (let j = 0; j < 3; j++) {
        const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.5;
        const speed = 2 + j;

        this.particles.push(new CuteParticle({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 50,
          size: 5,
          color: color,
          type: 'star',
          rotationSpeed: 0.1
        }));
      }
    });
  }

  createRainbowLinkEffect(startX, startY, targets) {
    this.overlays.push({
      type: 'rainbow_links',
      startX,
      startY,
      targets,
      startTime: Date.now(),
      duration: 520
    });

    this.overlays.push({
      type: 'rainbow_sprites',
      startX,
      startY,
      targets,
      startTime: Date.now(),
      duration: 560
    });

    targets.forEach((target, index) => {
      setTimeout(() => {
        this.particles.push(new CuteParticle({
          x: target.x,
          y: target.y,
          vx: 0,
          vy: -0.6,
          life: 32,
          size: 7,
          color: [CUTE_COLORS.pink, CUTE_COLORS.yellow, CUTE_COLORS.blue, CUTE_COLORS.purple][index % 4],
          type: 'star',
          gravity: 0,
          rotationSpeed: 0.12
        }));
      }, Math.min(index * 18, 180));
    });
  }

  createPlusFiveEffect(x, y) {
    this.createFloatText(x, y, '+5 步', CUTE_COLORS.greenDark);

    for (let i = 0; i < 5; i++) {
      this.particles.push(new CuteParticle({
        x: x + (Math.random() - 0.5) * 30,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: -2 - Math.random() * 2,
        life: 40,
        size: 5,
        color: CUTE_COLORS.green,
        type: 'heart'
      }));
    }
  }

  // 分数飘字
  createFloatText(x, y, text, color) {
    this.floatTexts.push({
      x, y, text, color,
      life: 60,
      maxLife: 60,
      vy: -1.5
    });
  }

  createScorePopup(x, y, score) {
    this.createFloatText(x, y, `+${score}`, CUTE_COLORS.yellowDark);
  }

  // 环境效果
  createAmbientParticle(width, height) {
    if (Math.random() < 0.02) {
      this.particles.push(new CuteParticle({
        x: Math.random() * width,
        y: height + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.5 - Math.random() * 0.5,
        life: 300,
        size: 2 + Math.random() * 3,
        color: 'rgba(255, 255, 255, 0.4)',
        type: 'circle'
      }));
    }
  }

  // 角色情绪效果
  createHappyEffect(x, y) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.particles.push(new CuteParticle({
          x: x + (Math.random() - 0.5) * 40,
          y: y,
          vx: (Math.random() - 0.5) * 1,
          vy: -1.5 - Math.random(),
          life: 50,
          size: 6 + Math.random() * 4,
          color: CUTE_COLORS.pink,
          type: 'heart'
        }));
      }, i * 150);
    }
  }

  createSurpriseEffect(x, y) {
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      this.particles.push(new CuteParticle({
        x: x + Math.cos(angle) * 20,
        y: y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        life: 30,
        size: 5,
        color: CUTE_COLORS.yellow,
        type: 'star'
      }));
    }
  }

  getPieceColors(pieceType) {
    const colorMap = {
      1: [CUTE_COLORS.pink, CUTE_COLORS.pinkDark],
      2: [CUTE_COLORS.yellow, CUTE_COLORS.yellowDark],
      3: [CUTE_COLORS.purple, CUTE_COLORS.purpleDark],
      4: [CUTE_COLORS.green, CUTE_COLORS.greenDark],
      5: [CUTE_COLORS.blue, CUTE_COLORS.blueDark],
      6: [CUTE_COLORS.yellow, '#FFB36B']
    };
    return colorMap[pieceType] || [CUTE_COLORS.pink];
  }

  update() {
    this.particles = this.particles.filter(p => p.update());

    const now = Date.now();
    this.overlays = this.overlays.filter(effect => now - effect.startTime < effect.duration);

    this.floatTexts = this.floatTexts.filter(text => {
      text.y += text.vy;
      text.life--;
      return text.life > 0;
    });
  }

  render(ctx) {
    this.renderOverlays(ctx);
    this.particles.forEach(p => p.render(ctx));

    this.floatTexts.forEach(text => {
      const alpha = text.life / text.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = text.color;
      ctx.font = 'bold 24px "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(text.text, text.x, text.y);
      ctx.restore();
    });
  }

  renderOverlays(ctx) {
    const now = Date.now();
    this.overlays.forEach(effect => {
      const progress = Math.min(1, (now - effect.startTime) / effect.duration);
      const alpha = 1 - progress;

      if (effect.type === 'bomb_blast') {
        const radius = effect.cellSize * (effect.radius + 1.25) * (0.6 + progress * 0.55);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = 'rgba(255, 214, 102, 0.26)';
        ctx.strokeStyle = 'rgba(255, 111, 97, 0.72)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.82)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI * 2 * i) / 10 + progress * 0.8;
          const inner = radius * 0.45;
          const outer = radius * 0.9;
          ctx.beginPath();
          ctx.moveTo(effect.x + Math.cos(angle) * inner, effect.y + Math.sin(angle) * inner);
          ctx.lineTo(effect.x + Math.cos(angle) * outer, effect.y + Math.sin(angle) * outer);
          ctx.stroke();
        }
        ctx.restore();
        return;
      }

      if (effect.type === 'sprite') {
        this.renderSpriteOverlay(ctx, effect, progress, alpha);
        return;
      }

      if (effect.type === 'rainbow_sprites') {
        this.renderRainbowSpriteOverlay(ctx, effect, progress, alpha);
        return;
      }

      if (effect.type === 'rainbow_links') {
        const colors = ['#FF6FAE', '#FFD54F', '#78D97B', '#5EC8FF', '#B990FF'];
        ctx.save();
        ctx.globalAlpha = Math.min(0.92, alpha + 0.08);
        ctx.lineCap = 'round';
        effect.targets.forEach((target, index) => {
          const reach = Math.min(1, progress * 1.4 - index * 0.015);
          if (reach <= 0) return;

          const endX = effect.startX + (target.x - effect.startX) * Math.min(1, reach);
          const endY = effect.startY + (target.y - effect.startY) * Math.min(1, reach);
          ctx.strokeStyle = colors[index % colors.length];
          ctx.lineWidth = 3;
          ctx.shadowColor = colors[index % colors.length];
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(effect.startX, effect.startY);
          const midX = (effect.startX + endX) / 2;
          const midY = (effect.startY + endY) / 2 - 18;
          ctx.quadraticCurveTo(midX, midY, endX, endY);
          ctx.stroke();
        });
        ctx.restore();
      }
    });
  }

  renderSpriteOverlay(ctx, effect, progress, alpha) {
    const frames = EFFECT_SPRITES[effect.spriteType] || [];
    if (!frames.length) return;

    const frameIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    const image = getEffectImage(frames[frameIndex]);
    if (!image || !(image.ready || image.complete || image.width)) return;

    const size = effect.size * (0.9 + progress * 0.18);
    ctx.save();
    ctx.globalAlpha = Math.min(1, alpha + 0.15);
    ctx.drawImage(image, effect.x - size / 2, effect.y - size / 2, size, size);
    ctx.restore();
  }

  renderRainbowSpriteOverlay(ctx, effect, progress, alpha) {
    const frames = EFFECT_SPRITES.rainbow;
    if (!frames.length || !effect.targets?.length) return;

    effect.targets.forEach((target, index) => {
      const localProgress = Math.min(1, Math.max(0, progress * 1.25 - index * 0.012));
      if (localProgress <= 0) return;

      const frameIndex = Math.min(frames.length - 1, Math.floor(localProgress * frames.length));
      const image = getEffectImage(frames[frameIndex]);
      if (!image || !(image.ready || image.complete || image.width)) return;

      const x = effect.startX + (target.x - effect.startX) * localProgress;
      const y = effect.startY + (target.y - effect.startY) * localProgress;
      const size = 38 + 18 * (1 - Math.abs(localProgress - 0.5));

      ctx.save();
      ctx.globalAlpha = Math.min(0.9, alpha + 0.2);
      ctx.drawImage(image, x - size / 2, y - size / 2, size, size);
      ctx.restore();
    });
  }

  clear() {
    this.particles = [];
    this.floatTexts = [];
    this.overlays = [];
  }
}

module.exports = { CuteEffectManager, CUTE_COLORS };
