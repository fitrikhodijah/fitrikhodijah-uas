<template>
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="modal-close" @click="close">&times;</button>
        <div class="modal-header">
          <slot name="header">Judul Default</slot>
        </div>
        <div class="modal-body">
          <slot name="body">Konten default.</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button @click="close" class="footer-btn">Tutup</button>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['close']);
  
  function close() {
    emit('close');
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    position: relative;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
  
  .modal-close {
    position: absolute;
    top: 10px;
    right: 15px;
    border: none;
    background: transparent;
    font-size: 2rem;
    color: #aaa;
    cursor: pointer;
  }
  
  .modal-header {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  
  .modal-body {
    margin-bottom: 1rem;
  }
  
  .modal-footer {
    border-top: 1px solid #eee;
    padding-top: 1rem;
    text-align: right;
  }
  
  .footer-btn {
    background-color: #eee;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }
  </style>