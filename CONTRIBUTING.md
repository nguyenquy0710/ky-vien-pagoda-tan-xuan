# 🤝 Hướng Dẫn Đóng Góp

Cảm ơn bạn đã quan tâm đến dự án **Chùa Kỳ Viên - Xã Tân Xuân**! Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng để cải thiện và phát triển website này.

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Cách Thức Đóng Góp](#cách-thức-đóng-góp)
- [Thiết Lập Môi Trường Phát Triển](#thiết-lập-môi-trường-phát-triển)
- [Quy Tắc Đóng Góp](#quy-tắc-đóng-góp)
- [Quy Trình Pull Request](#quy-trình-pull-request)
- [Hướng Dẫn Về Mã Nguồn](#hướng-dẫn-về-mã-nguồn)
- [Báo Cáo Lỗi](#báo-cáo-lỗi)
- [Đề Xuất Tính Năng Mới](#đề-xuất-tính-năng-mới)
- [Quy Tắc Ứng Xử](#quy-tắc-ứng-xử)
- [Liên Hệ](#liên-hệ)

## 🌟 Giới Thiệu

Dự án này là website tĩnh cho **Chùa Kỳ Viên - Xã Tân Xuân**, một ngôi chùa cổ kính và linh thiêng tại Hóc Môn, TP. Hồ Chí Minh, Việt Nam. Website được xây dựng với HTML, CSS và JavaScript thuần túy, không sử dụng framework phức tạp, giúp dễ dàng bảo trì và triển khai.

### Công Nghệ Sử Dụng
- HTML5
- CSS3 (với external stylesheet)
- JavaScript (vanilla JS)
- GitHub Pages (để hosting)
- GitHub Actions (để CI/CD)

## 🚀 Cách Thức Đóng Góp

Có nhiều cách để bạn có thể đóng góp cho dự án:

1. **Báo cáo lỗi**: Nếu bạn tìm thấy lỗi, hãy tạo một issue mới
2. **Đề xuất tính năng**: Có ý tưởng mới? Chia sẻ với chúng tôi qua issue
3. **Cải thiện tài liệu**: Giúp làm rõ hoặc bổ sung tài liệu
4. **Sửa lỗi**: Submit pull request để sửa các bug
5. **Thêm tính năng**: Phát triển các tính năng mới theo roadmap
6. **Tối ưu hiệu suất**: Cải thiện tốc độ load và trải nghiệm người dùng
7. **Cải thiện SEO**: Tối ưu hóa cho công cụ tìm kiếm
8. **Thêm nội dung**: Bổ sung hình ảnh, mô tả dịch vụ

## 💻 Thiết Lập Môi Trường Phát Triển

### Yêu Cầu Hệ Thống
- Git
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Trình soạn thảo code (VS Code, Sublime Text, v.v.)
- (Tùy chọn) Node.js - nếu bạn muốn sử dụng live server

### Các Bước Thiết Lập

1. **Fork repository**
   ```bash
   # Truy cập https://github.com/nqdev-group/static-map-template
   # Nhấn nút "Fork" ở góc trên bên phải
   ```

2. **Clone repository về máy local**
   ```bash
   git clone https://github.com/YOUR_USERNAME/static-map-template.git
   cd static-map-template
   ```

3. **Thêm remote upstream**
   ```bash
   git remote add upstream https://github.com/nqdev-group/static-map-template.git
   ```

4. **Mở project trong trình soạn thảo**
   ```bash
   code .  # Nếu bạn dùng VS Code
   ```

5. **Chạy project trên local**
   
   **Cách 1: Mở trực tiếp file HTML**
   - Mở file `index.html` trong trình duyệt
   
   **Cách 2: Sử dụng Live Server (Khuyến nghị)**
   - Nếu dùng VS Code, cài đặt extension "Live Server"
   - Click chuột phải vào `index.html` và chọn "Open with Live Server"
   
   **Cách 3: Sử dụng Python HTTP Server**
   ```bash
   python -m http.server 8000
   # Truy cập http://localhost:8000
   ```
   
   **Cách 4: Sử dụng Node.js HTTP Server**
   ```bash
   npx http-server -p 8000
   # Truy cập http://localhost:8000
   ```

## 📝 Quy Tắc Đóng Góp

### Nguyên Tắc Chung
- ✅ Viết code rõ ràng, dễ đọc và có cấu trúc tốt
- ✅ Tuân thủ coding style hiện có của dự án
- ✅ Đảm bảo code tương thích với các trình duyệt chính
- ✅ Tối ưu hóa hiệu suất và tốc độ tải trang
- ✅ Giữ cho commit messages rõ ràng và mô tả đầy đủ
- ✅ Test kỹ lưỡng trước khi submit PR
- ❌ Không commit các file build artifacts hoặc dependencies
- ❌ Không làm thay đổi quá lớn trong một PR

### Ngôn Ngữ
- **Nội dung website**: Tiếng Việt
- **Code comments**: Tiếng Việt hoặc Tiếng Anh (tùy ngữ cảnh)
- **Commit messages**: Tiếng Anh (theo conventional commits)
- **Issues và PR**: Tiếng Việt hoặc Tiếng Anh

### Cấu Trúc Thư Mục
```
static-map-template/
├── .github/              # GitHub workflows và templates
├── assets/               # Tài nguyên tĩnh
│   ├── css/             # Stylesheet (external)
│   ├── js/              # JavaScript files (external)
│   ├── imgs/            # Hình ảnh
│   ├── gallery.json     # Dữ liệu thư viện ảnh
│   └── images.json      # Dữ liệu hình ảnh
├── index.html           # Trang chủ
├── gallery.html         # Trang thư viện
├── README.md            # Tài liệu chính
├── CONTRIBUTING.md      # Hướng dẫn đóng góp (file này)
├── SECURITY.md          # Chính sách bảo mật
├── CHANGELOG.md         # Lịch sử thay đổi
├── LICENSE              # Giấy phép MIT
└── compass.yml          # Cấu hình Compass
```

## 🔄 Quy Trình Pull Request

### Trước Khi Bắt Đầu
1. Tìm hoặc tạo một issue liên quan đến thay đổi của bạn
2. Comment vào issue để cho người khác biết bạn đang làm việc trên đó
3. Đảm bảo bạn đã đồng bộ với branch `main` mới nhất

### Tạo Pull Request

1. **Tạo branch mới từ main**
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/ten-tinh-nang
   # hoặc
   git checkout -b fix/ten-loi-can-sua
   ```

2. **Thực hiện thay đổi**
   - Viết code theo quy tắc của dự án
   - Commit thường xuyên với messages rõ ràng
   
   ```bash
   git add .
   git commit -m "feat: thêm chức năng XYZ"
   # hoặc
   git commit -m "fix: sửa lỗi hiển thị ảnh trên mobile"
   ```

3. **Đồng bộ với upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push code lên fork của bạn**
   ```bash
   git push origin feature/ten-tinh-nang
   ```

5. **Tạo Pull Request**
   - Truy cập GitHub repository của bạn
   - Click "New Pull Request"
   - Chọn base: `main` ← compare: `feature/ten-tinh-nang`
   - Điền đầy đủ mô tả về thay đổi
   - Submit PR

### Mẫu Commit Messages

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Thay đổi tài liệu
- `style`: Thay đổi về CSS/styling
- `refactor`: Refactor code
- `perf`: Cải thiện hiệu suất
- `test`: Thêm hoặc sửa tests
- `chore`: Các thay đổi khác (build, CI, v.v.)

**Ví dụ:**
```bash
feat: thêm trang gallery với chức năng xem ảnh toàn màn hình
fix: sửa lỗi responsive trên thiết bị di động
docs: cập nhật README với hướng dẫn deployment
style: cải thiện màu sắc và spacing của hero section
refactor: tối ưu hóa code JavaScript cho mobile menu
perf: tối ưu kích thước ảnh để tăng tốc độ load
```

### Review Process
1. Maintainer sẽ review PR của bạn
2. Có thể có yêu cầu thay đổi hoặc câu hỏi
3. Thực hiện các thay đổi được yêu cầu
4. PR sẽ được merge sau khi approved

## 📐 Hướng Dẫn Về Mã Nguồn

### HTML Guidelines
- Sử dụng semantic HTML5 tags (`<section>`, `<nav>`, `<header>`, `<footer>`)
- Đảm bảo accessibility với aria-labels và alt texts
- Giữ cấu trúc indentation nhất quán (2 hoặc 4 spaces)
- Sử dụng tiếng Việt có dấu cho nội dung

### CSS Guidelines
- CSS được tổ chức trong external stylesheet: `https://gist.quyit.id.vn/ongsang-fruitgarden/assets/css/styles.css`
- Sử dụng class names có ý nghĩa và nhất quán
- Tuân theo BEM naming convention khi phù hợp
- Đảm bảo responsive design cho mobile, tablet, desktop
- Tránh inline styles trừ khi thực sự cần thiết

### JavaScript Guidelines
- JavaScript được tổ chức trong external file: `https://gist.quyit.id.vn/ongsang-fruitgarden/assets/js/script.js`
- Viết vanilla JavaScript, không dùng jQuery
- Sử dụng ES6+ features khi phù hợp
- Comment code khi logic phức tạp
- Đảm bảo tương thích với các trình duyệt chính

### Responsive Design
- Mobile-first approach
- Breakpoints chuẩn:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Test trên nhiều thiết bị và trình duyệt

### Performance Best Practices
- Tối ưu kích thước hình ảnh
- Lazy loading cho images
- Minify CSS và JavaScript khi deploy
- Sử dụng CDN cho external resources
- Tránh blocking scripts

## 🐛 Báo Cáo Lỗi

Khi báo cáo lỗi, vui lòng sử dụng [Bug Report Template](https://github.com/nqdev-group/static-map-template/issues/new?template=bug_report.md) và cung cấp:

- **Mô tả rõ ràng về lỗi**
- **Các bước để tái hiện lỗi**
- **Kết quả mong đợi**
- **Kết quả thực tế**
- **Screenshots/Screen recordings** (nếu có)
- **Thông tin môi trường:**
  - Trình duyệt và phiên bản
  - Hệ điều hành
  - Thiết bị (mobile/tablet/desktop)
  - Kích thước màn hình

## 💡 Đề Xuất Tính Năng Mới

Để đề xuất tính năng mới, vui lòng:

1. Sử dụng [Feature Request Template](https://github.com/nqdev-group/static-map-template/issues/new?template=feature_request.md)
2. Mô tả rõ ràng vấn đề bạn muốn giải quyết
3. Đề xuất giải pháp cụ thể
4. Cung cấp mockups/wireframes nếu có
5. Giải thích tại sao tính năng này hữu ích

### Roadmap & Priority
Các tính năng ưu tiên cao:
- ✅ Cải thiện SEO và meta tags
- ✅ Tối ưu hiệu suất và tốc độ load
- ✅ Responsive design tốt hơn
- 🔄 Thêm chức năng booking/đặt tour
- 🔄 Tích hợp Google Maps API
- 🔄 Multilingual support (English)
- 📋 Dark mode
- 📋 PWA support

## 🤝 Quy Tắc Ứng Xử

### Cam Kết Của Chúng Tôi

Chúng tôi cam kết tạo ra một môi trường thân thiện, chào đón và không có sự quấy rối cho mọi người, bất kể:
- Tuổi tác, ngoại hình
- Khuyết tật
- Sắc tộc, dân tộc
- Bản dạng và biểu hiện giới tính
- Trình độ kinh nghiệm
- Quốc tịch
- Tôn giáo

### Hành Vi Được Khuyến Khích
- ✅ Sử dụng ngôn ngữ thân thiện và chào đón
- ✅ Tôn trọng quan điểm và kinh nghiệm khác nhau
- ✅ Chấp nhận phản hồi mang tính xây dựng một cách nhã nhặn
- ✅ Tập trung vào những gì tốt nhất cho cộng đồng
- ✅ Thể hiện sự đồng cảm với các thành viên khác

### Hành Vi Không Được Chấp Nhận
- ❌ Sử dụng ngôn ngữ hoặc hình ảnh khiêu dâm
- ❌ Trolling, bình luận xúc phạm hoặc miệt thị
- ❌ Quấy rối công khai hoặc riêng tư
- ❌ Công khai thông tin cá nhân của người khác
- ❌ Hành vi không chuyên nghiệp hoặc không phù hợp khác

### Thực Thi

Maintainers có trách nhiệm làm rõ các tiêu chuẩn về hành vi được chấp nhận và sẽ thực hiện các biện pháp khắc phục công bằng và phù hợp để đáp lại bất kỳ hành vi nào vi phạm quy tắc ứng xử.

## 📞 Liên Hệ

Nếu bạn có câu hỏi hoặc cần hỗ trợ:

- **Email**: quy.nh@engineer.com
- **GitHub Issues**: [Tạo issue mới](https://github.com/nqdev-group/static-map-template/issues/new)
- **Discussions**: [GitHub Discussions](https://github.com/nqdev-group/static-map-template/discussions)

## 📜 Giấy Phép

Bằng cách đóng góp vào dự án này, bạn đồng ý rằng các đóng góp của bạn sẽ được cấp phép theo [MIT License](LICENSE).

## 🙏 Cảm Ơn

Cảm ơn bạn đã dành thời gian đọc hướng dẫn này và đóng góp cho dự án **Vườn Trái Cây Ông Sang**! Mỗi đóng góp, dù lớn hay nhỏ, đều giúp chúng tôi cải thiện trải nghiệm cho du khách và cộng đồng.

---

**Chúc bạn code vui vẻ! 🍊🌳**
