const CACHE_NAME = 'sotay-vợ-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap'
];

// Cài đặt Service Worker và lưu file vào bộ nhớ máy
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Xử lý khi không có mạng: Lấy file từ bộ nhớ ra chạy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Trả về bản Offline nếu có trong cache
        }
        return fetch(event.request); // Nếu không có thì tải từ mạng
      })
  );
});
