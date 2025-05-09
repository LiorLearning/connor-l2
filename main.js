import * as THREE from 'three';
import { initScene, camera, renderer } from './modules/core/scene.js';
import { initHero } from './modules/entities/hero.js';
import { initVillain } from './modules/entities/villain.js';
import { createRooftops } from './modules/environment/rooftops.js';
import { createSkyline } from './modules/environment/skyline.js';
import { initUI } from './modules/ui/interface.js';
import { setupControls } from './modules/core/controls.js';
import { initTrail } from './modules/effects/trail.js';
import { createJumpBoostIndicator } from './modules/environment/jumpBoost.js';
import { createSmokeBombCollectible } from './modules/collectibles/smokeBomb.js';
import { showMathQuiz } from './modules/ui/mathQuiz.js';
import { createMinion } from './modules/entities/minion.js';
import { animationLoop } from './modules/core/animationLoop.js';
import { showUserLoginForm } from './modules/ui/userLogin.js';
// import { setupAudio } from './modules/core/audio.js';

function initGame() {
  // Initialize scene, camera, renderer, and lights
  const scene = initScene();
  
  // Initialize audio
  // const backgroundMusic = setupAudio();
  
  // Create environment elements
  const rooftops = createRooftops(scene);
  const skyline = createSkyline(scene);
  const jumpBoostIndicator = createJumpBoostIndicator(scene);
  
  // Initialize game entities
  const hero = initHero(scene);
  const villain = initVillain(scene);
  
  // Initialize UI elements
  const { 
    updateHealthBar, 
    introOverlay, 
    speechBubble, 
    instructions, 
    levelIndicator 
  } = initUI();
  
  // Setup game phases and state as a shared object (passed by reference)
  const gameState = {
    gamePhase: "intro",
    movementLocked: false,
    minionsFought: 0,
    totalMinions: 20,
    minionsSpawned: false,
    currentLevel: 1
  };
  
  // Create collectibles
  const smokeBombCollectible = createSmokeBombCollectible(scene, hero, gameState, showMathQuiz);
  
  // Initialize effects
  const trail = initTrail(scene);
  
  // Create minions array
  const minions = [];
  
  // Setup keyboard controls
  const keys = setupControls(gameState, hero, introOverlay, speechBubble, instructions, villain, trail);
  
  // Start animation loop
  animationLoop(
    scene, 
    camera, 
    renderer, 
    hero, 
    villain, 
    rooftops, 
    skyline, 
    trail, 
    keys, 
    gameState, 
    minions, 
    jumpBoostIndicator, 
    smokeBombCollectible,
    updateHealthBar,
    createMinion,
    speechBubble,
    instructions,
    levelIndicator
  );
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 250);
  });
}

// Wait for Supabase to be ready, then show login form and start the game when user submits name
document.addEventListener('DOMContentLoaded', () => {
  // If Supabase is already ready, show the login form
  if (window.GameData && window.GameData.ready) {
    showUserLoginForm(username => {
      // Save user to Supabase
      window.GameData.saveUser(username)
        .then(result => {
          console.log('User saved:', result);
          // Start the game after username is submitted
          initGame();
        })
        .catch(error => {
          console.error('Error saving user:', error);
          // Start the game anyway, even if there's an error saving the user
          initGame();
        });
    });
  } else {
    // If Supabase is not ready yet, wait for the 'supabase-ready' event
    document.addEventListener('supabase-ready', () => {
      showUserLoginForm(username => {
        // Save user to Supabase
        window.GameData.saveUser(username)
          .then(result => {
            console.log('User saved:', result);
            // Start the game after username is submitted
            initGame();
          })
          .catch(error => {
            console.error('Error saving user:', error);
            // Start the game anyway, even if there's an error saving the user
            initGame();
          });
      });
    });
  }
});