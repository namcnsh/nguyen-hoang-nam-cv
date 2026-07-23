# Spec thiết kế landing page CV Nguyễn Hoàng Nam

Ngày: 2026-07-23

## 1. Phạm vi tài liệu

Tài liệu này mô tả thiết kế landing page mới cho repo GitHub `namcnsh/nguyen-hoang-nam-cv`.

Tài liệu chỉ dựa trên dữ liệu đã đọc trực tiếp từ repo GitHub và các lựa chọn người dùng đã xác nhận trong cuộc trao đổi.

Không đưa thêm thành tích, số liệu, khách hàng, chứng chỉ, giải thưởng, hoặc năng lực nào nếu chưa có trong source hiện tại.

## 2. Nguồn dữ liệu thực tế đã dùng

### 2.1. Repo GitHub

Repo: `https://github.com/namcnsh/nguyen-hoang-nam-cv`

Thông tin nhìn thấy trên GitHub:

- Repo public.
- Branch chính: `main`.
- GitHub hiển thị 10 commits.
- Stars: 0.
- Forks: 0.
- Releases: chưa có release.
- About trỏ tới website: `https://nguyen-hoang-nam-cv.vercel.app`.
- Languages theo GitHub: JavaScript 95.9%, SCSS 4.1%.

### 2.2. File `package.json`

Thông tin đọc được:

- `name`: `developer-portfolio`
- `description`: `Portfolio of Nguyễn Hoàng Nam`
- `private`: `true`
- Scripts:
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint .`
- Dependencies chính:
  - `next`: `16.2.7`
  - `react`: `^19.2.7`
  - `react-dom`: `^19.2.7`
  - `@next/third-parties`: `^16.2.7`
  - `axios`: `^1.17.0`
  - `lottie-react`: `^2.4.1`
  - `nodemailer`: `^8.0.10`
  - `react-fast-marquee`: `^1.6.5`
  - `react-google-recaptcha`: `^3.1.0`
  - `react-icons`: `^5.6.0`
  - `react-toastify`: `^11.1.0`
  - `sharp`: `^0.34.5`
  - `sass`: `^1.100.0`
  - `tailwindcss`: `latest`

### 2.3. File `app/layout.js`

Thông tin đọc được:

- Website dùng `lang="vi"`.
- Font hiện tại: `Inter` từ `next/font/google`.
- Metadata:
  - Title: `Portfolio of Nguyễn Hoàng Nam - Performance Marketing Specialist`
  - Description: `CV Landing Page của Nguyễn Hoàng Nam - Performance Marketing Specialist. Chuyên gia tối ưu quảng cáo, phân tích dữ liệu, thiết kế landing page và ứng dụng AI Marketing.`
- Layout có:
  - `ToastContainer`
  - `Navbar`
  - `ScrollToTop`
  - `Footer`
  - Google Tag Manager nếu có `NEXT_PUBLIC_GTM`
- Main container hiện tại có nền chữ trắng, giới hạn chiều rộng lớn.

### 2.4. File `app/page.js`

Trang chính hiện có các section theo thứ tự:

1. `HeroSection`
2. `AboutSection`
3. `Experience`
4. `Skills`
5. `Projects`
6. `Education`
7. `ContactSection`

### 2.5. File `utils/data/personal-data.js`

Thông tin cá nhân thực tế:

- Tên: `Nguyễn Hoàng Nam`
- Ảnh profile: `/profile-nam.png`
- Chức danh: `Chuyên gia Performance Marketing`
- Email: `namcnsh@gmail.com`
- Số điện thoại: `0879309604`
- Địa chỉ: `Ecopark, Hưng Yên / Hà Nội`
- GitHub: `https://github.com/namcnsh`
- Facebook: `https://www.facebook.com/seil1002`
- LinkedIn: `https://www.linkedin.com/in/namcnsh`
- Twitter: rỗng
- StackOverflow: rỗng
- LeetCode: rỗng
- devUsername: rỗng
- resume: rỗng

Mô tả bản thân hiện có nói rằng Nguyễn Hoàng Nam là Digital Marketer có kinh nghiệm từ năm 2019, triển khai và tối ưu quảng cáo đa nền tảng gồm Meta Ads, Google Ads, TikTok Ads, SEO, landing page và phân tích dữ liệu marketing. Nội dung cũng nêu các lĩnh vực từng chạy gồm bất động sản, F&B, golf, du lịch, y tế, thời trang, mẹ và bé, điện tử, điện lạnh và tài chính.

### 2.6. File `utils/data/experience.js`

Kinh nghiệm thực tế hiện có:

1. Công ty Cổ phần Bất Động Sản Joy Homes
   - Vai trò: Digital Marketing
   - Thời gian: 02/2025 - Hiện tại
   - Nội dung: chạy Google, Meta, TikTok Ads; theo dõi CPC, CTR, CPM; thiết kế landing page phối cảnh 360° bằng Visual Studio Code, Claude Sonnet; chỉnh video bằng Kling AI, Veo 3, Canva; theo dõi hành trình khách hàng qua Google Analytics; làm dashboard; phân tích dữ liệu cơ bản bằng Excel.

2. Công ty Cổ phần Đầu tư Evergreen Invest
   - Vai trò: Digital Marketing / Performance Marketing
   - Thời gian: 01/2023 - 12/2024
   - Nội dung: Facebook Ads, Google Ads, nghiên cứu chân dung khách hàng, nội dung, hình ảnh/video, tối ưu chi phí, Google Shopping, Remarketing, chặn click tặc.

3. Agency
   - Vai trò: Digital Marketing
   - Thời gian: 05/2021 - 01/2023
   - Nội dung: Facebook Ads, Google Ads, landing page, content, Canva, nhiều ngành, quản lý fanpage.

4. VNPAY Group – VNSHOP
   - Vai trò: Nhân viên Digital Marketing
   - Thời gian: 05/2019 - 05/2021
   - Nội dung: SEO website, Facebook Ads, Google Ads, content, landing page, phân tích dữ liệu hành vi người dùng, tối ưu chi phí.

### 2.7. File `utils/data/projects-data.js`

Dự án thực tế hiện có:

1. Landing Page phối cảnh 360° cho dự án bất động sản
   - Vai trò: Digital Marketing Specialist
   - Demo: `https://360ihh.joyhomes.vn/`
   - Tools: VS Code, Claude, HTML, CSS, Vercel, 360° Experience
   - Mô tả: xây landing page phối cảnh 360° phục vụ truyền thông dự án bất động sản, giúp khách hàng trải nghiệm không gian trực quan hơn trước khi để lại thông tin tư vấn.

2. Dashboard báo cáo hiệu quả quảng cáo
   - Vai trò: Performance Marketing Specialist
   - Demo: rỗng
   - Tools: Microsoft Office, Google Analytics, Ads Data, Dashboard
   - Mô tả: tổng hợp dữ liệu, theo dõi CPC, CTR, CPM, chi phí, lead và tỷ lệ chuyển đổi.

3. Ứng dụng AI trong sáng tạo nội dung quảng cáo
   - Vai trò: AI Marketer
   - Demo: `https://www.tiktok.com/@bogdadata`
   - Tools: GPT, Claude, Agentic AI, Vibe Coding, Kling AI, Veo 3, Canva
   - Mô tả: thử nghiệm xây kênh TikTok bằng Vibe Coding và Agentic AI.

### 2.8. File `utils/data/skills.js`

Kỹ năng hiện có:

- HTML
- CSS
- Javascript
- Python
- Git
- Canva
- Figma
- Microsoft Office
- Markdown

### 2.9. File `utils/data/educations.js`

Học vấn hiện có:

- Chuyên ngành: Công nghệ sinh học, tốt nghiệp loại Khá
- Thời gian: 10/2014 - 10/2018
- Đơn vị: Viện Công nghệ sinh học Lâm Nghiệp Việt Nam

### 2.10. File `app/components/homepage/hero-section/index.jsx`

Hero hiện tại:

- Có ảnh nền `/hero.svg`.
- Tiêu đề: `Xin chào, Tôi là Nguyễn Hoàng Nam, một Chuyên gia Performance Marketing.`
- CTA: `Liên hệ với tôi`.
- Bên phải là khung code giả lập object `coder`, trong đó có skills Meta Ads, Google Ads, TikTok Ads, SEO, Landing Page, Excel, Google Analytics, AI Marketing.

### 2.11. File `app/components/homepage/about/index.jsx`

About hiện tại:

- Tiêu đề phụ: `Tôi là ai?`
- Hiển thị mô tả từ `personalData.description`.
- Hiển thị ảnh profile từ `personalData.profile`.

### 2.12. File `app/components/homepage/experience/index.jsx`

Experience hiện tại:

- Tiêu đề section: `Kinh nghiệm`.
- Có Lottie animation từ `code.json`.
- Render danh sách `experiences` bằng `GlowCard`.

### 2.13. File `app/css/globals.scss`

Nền hiện tại:

- `body` dùng background `#0d1224`.
- Text dùng `--foreground-rgb`.

## 3. Lựa chọn đã được người dùng xác nhận

Người dùng đã chọn:

1. Mục tiêu landing page: kết hợp xin việc, bán dịch vụ Performance Marketing, xây thương hiệu cá nhân.
2. Ưu tiên người xem quan trọng nhất: HR / nhà tuyển dụng.
3. Cảm nhận mong muốn: cân bằng chuyên nghiệp, cao cấp, đáng tin; sáng tạo, trẻ, bắt trend AI; mạnh về số liệu, performance, hiệu quả.
4. Trong 5 giây đầu tiên, người xem cần thấy: Nguyễn Hoàng Nam là ai và case study/dự án tiêu biểu.
5. Không muốn khối thành tích nhanh ngay đầu trang; chỉ cần giới thiệu và case study.
6. Hai case nổi bật đầu trang:
   - Landing Page phối cảnh 360° cho dự án bất động sản.
   - Dashboard báo cáo hiệu quả quảng cáo.
7. Phong cách màu: đen/xanh tím, tech, premium.
8. Hướng thiết kế đã chốt: Hybrid CV + case study.

## 4. Vấn đề của thiết kế hiện tại

Các nhận xét dưới đây dựa trên source code đã đọc, không dựa trên hình ảnh render thực tế trong trình duyệt.

### 4.1. Hero hiện tại thiên về developer portfolio

Hero dùng khung code giả lập `coder`. Cách trình bày này phù hợp hơn với lập trình viên. Nhưng dữ liệu thật của người dùng là Performance Marketing Specialist.

Vì vậy, hero nên chuyển từ cảm giác `developer/coder` sang `marketing strategist / performance marketer`.

### 4.2. Case study chưa xuất hiện trong 5 giây đầu

Theo `app/page.js`, `Projects` nằm sau `Experience` và `Skills`. Người xem phải kéo xuống mới thấy dự án.

Người dùng đã xác nhận muốn thấy hai case ngay đầu trang. Vì vậy cần đưa 2 case nổi bật vào hero hoặc ngay dưới hero.

### 4.3. Nội dung đầu trang chưa phục vụ HR đủ nhanh

Hero hiện tại chỉ nói tên và chức danh. HR cần nhanh chóng hiểu:

- Đây là ai.
- Làm mảng gì.
- Có case nào đáng chú ý.
- Có thể liên hệ thế nào.

Không thêm số liệu nếu source hiện tại không có số liệu cụ thể.

### 4.4. Nền tối hiện tại có thể giữ, nhưng cần nâng cấp thẩm mỹ

Nền `#0d1224` hiện có phù hợp hướng dark tech. Tuy nhiên nên thiết kế lại hệ màu, spacing, typography, card, CTA để có cảm giác premium hơn.

## 5. Mục tiêu thiết kế mới

Landing page mới cần đạt các mục tiêu sau:

1. HR hiểu trong 5 giây:
   - Đây là Nguyễn Hoàng Nam.
   - Vai trò là Chuyên gia Performance Marketing.
   - Có hai case nổi bật: landing page 360° bất động sản và dashboard báo cáo quảng cáo.

2. Website vẫn thể hiện được:
   - Khả năng chạy quảng cáo đa nền tảng.
   - Tư duy phân tích dữ liệu marketing.
   - Khả năng làm landing page.
   - Khả năng ứng dụng AI Marketing.

3. Không thêm claim chưa có bằng chứng:
   - Không thêm doanh thu.
   - Không thêm ROAS.
   - Không thêm số lead.
   - Không thêm ngân sách quảng cáo.
   - Không thêm thương hiệu khách hàng ngoài các công ty/dự án đã có trong data.

4. Thiết kế phải:
   - Đẹp hơn bản hiện tại.
   - Dễ đọc với người không chuyên kỹ thuật.
   - Phù hợp HR.
   - Có cảm giác tech, premium.
   - Responsive trên mobile và desktop.

## 6. Concept thiết kế

Tên concept: `Premium Performance CV`

Từ khóa:

- Dark premium
- Blue-violet technology
- HR-friendly
- Case-study first
- Performance marketing
- Clean, credible, modern

Không dùng concept:

- Developer/coder làm trọng tâm.
- Quá nhiều neon.
- Quá nhiều animation.
- Quá nhiều icon trang trí.
- Quá giống dashboard SaaS khiến mất chất CV cá nhân.

## 7. Hệ màu đề xuất

Dựa trên lựa chọn của người dùng: đen/xanh tím, tech, premium.

### 7.1. Màu nền

- Page background: `#070A12`
- Section background phụ: `#0B1020`
- Card background: `rgba(15, 23, 42, 0.72)`
- Card elevated background: `rgba(17, 24, 39, 0.88)`

### 7.2. Màu chữ

- Text chính: `#F8FAFC`
- Text phụ: `#CBD5E1`
- Text mờ: `#94A3B8`

### 7.3. Màu nhấn

- Primary blue: `#3B82F6`
- Violet: `#8B5CF6`
- Cyan detail: `#22D3EE`

### 7.4. Border và glow

- Border nhẹ: `rgba(148, 163, 184, 0.18)`
- Border nhấn: `rgba(96, 165, 250, 0.36)`
- Glow xanh tím: `rgba(59, 130, 246, 0.18)` và `rgba(139, 92, 246, 0.16)`

### 7.5. Quy tắc dùng màu

- Không dùng quá nhiều màu cùng lúc.
- CTA chính dùng gradient xanh dương sang tím.
- Text quan trọng dùng trắng hoặc xanh nhạt.
- Tag/capsule dùng nền tối, border mờ, chữ xanh/tím/cyan.
- Không dùng hồng làm màu chính vì người dùng đã chọn đen/xanh tím.

## 8. Typography

Source hiện tại dùng `Inter`. Có thể tiếp tục dùng Inter để tránh thay đổi lớn.

Thiết kế đề xuất:

- Font chính: Inter.
- Heading: font weight 700-800.
- Body: font weight 400-500.
- Label/tag: uppercase nhẹ, letter spacing vừa phải.

Kích thước gợi ý:

### Desktop

- Hero eyebrow: 13-14px.
- Hero heading: 56-72px nếu layout cho phép.
- Hero subtitle: 18-20px.
- Section title: 36-48px.
- Card title: 20-24px.
- Body: 15-17px.

### Mobile

- Hero heading: 34-42px.
- Hero subtitle: 16px.
- Section title: 28-34px.
- Card title: 18-20px.
- Body: 14-16px.

## 9. Layout tổng thể

Thứ tự section đề xuất:

1. Hero mới.
2. Featured case studies ngay sau hero hoặc nằm trong hero.
3. About / positioning.
4. Experience timeline.
5. Skills grouped theo ngữ cảnh marketing.
6. Projects đầy đủ.
7. Education.
8. Contact.

Ghi chú: `app/page.js` hiện có thứ tự `Hero`, `About`, `Experience`, `Skills`, `Projects`, `Education`, `Contact`. Có thể thay đổi thứ tự nếu triển khai sau này, nhưng spec này ưu tiên đưa case study lên gần đầu để đúng yêu cầu.

## 10. Hero mới

### 10.1. Vai trò của hero

Hero là phần quan trọng nhất. Trong 5 giây đầu, HR phải hiểu:

- Tên: Nguyễn Hoàng Nam.
- Vai trò: Chuyên gia Performance Marketing.
- Định vị: Digital Marketer có kinh nghiệm từ năm 2019, làm ads đa nền tảng, landing page, phân tích dữ liệu, AI Marketing.
- Hai case nổi bật: Landing Page 360° và Dashboard báo cáo quảng cáo.

### 10.2. Cấu trúc hero desktop

Layout desktop đề xuất: 2 cột.

Cột trái chiếm khoảng 55-60%:

1. Eyebrow nhỏ:
   - `PERFORMANCE MARKETING SPECIALIST`

2. Heading chính:
   - `Nguyễn Hoàng Nam`
   - Dòng phụ: `Tối ưu quảng cáo, landing page và dữ liệu marketing`

3. Mô tả ngắn, dùng dữ liệu thật:
   - `Digital Marketer có kinh nghiệm từ năm 2019 trong Meta Ads, Google Ads, TikTok Ads, SEO, landing page và phân tích dữ liệu marketing.`

4. CTA:
   - Primary: `Liên hệ ngay`
   - Secondary: `Xem case study`

5. Contact mini row:
   - Email: `namcnsh@gmail.com`
   - Phone: `0879309604`
   - Location: `Ecopark, Hưng Yên / Hà Nội`

Cột phải chiếm khoảng 40-45%:

- Profile card premium.
- Ảnh `/profile-nam.png`.
- Chức danh.
- Danh sách focus area:
  - Meta Ads
  - Google Ads
  - TikTok Ads
  - Landing Page
  - Google Analytics
  - AI Marketing

### 10.3. Cấu trúc hero mobile

Mobile nên theo thứ tự:

1. Eyebrow.
2. Tên.
3. Chức danh/định vị.
4. CTA.
5. Ảnh/profile card.
6. Hai case nổi bật.

Tránh để ảnh quá cao làm che mất case study.

### 10.4. Không dùng trong hero

- Không dùng code block `const coder = ...` làm nội dung chính.
- Không thêm số năm dạng `6+ năm` nếu không muốn tính toán từ `2019`; dùng câu có sẵn `kinh nghiệm từ năm 2019`.
- Không thêm thành tích định lượng chưa có trong repo.

## 11. Featured case studies đầu trang

Người dùng đã chọn hai case:

1. Landing Page phối cảnh 360° cho dự án bất động sản.
2. Dashboard báo cáo hiệu quả quảng cáo.

### 11.1. Vị trí

Đặt ngay trong hero phía dưới text hoặc ngay sau hero. Trên desktop có thể đặt dưới hero content full-width. Trên mobile đặt ngay sau phần giới thiệu.

### 11.2. Card case 1

Title:

- `Landing Page phối cảnh 360° cho dự án bất động sản`

Label:

- `Case study nổi bật`

Description dùng đúng data hiện có, có thể rút gọn:

- `Xây dựng landing page phối cảnh 360° phục vụ truyền thông dự án bất động sản, giúp khách hàng trải nghiệm không gian trực quan hơn trước khi để lại thông tin tư vấn.`

Tools:

- VS Code
- Claude
- HTML
- CSS
- Vercel
- 360° Experience

CTA:

- Nếu có demo: `Xem demo`
- Link: `https://360ihh.joyhomes.vn/`

### 11.3. Card case 2

Title:

- `Dashboard báo cáo hiệu quả quảng cáo`

Label:

- `Performance reporting`

Description dùng đúng data hiện có:

- `Tổng hợp dữ liệu, theo dõi chỉ số và hỗ trợ ra quyết định tối ưu quảng cáo dựa trên CPC, CTR, CPM, chi phí, lead và tỷ lệ chuyển đổi.`

Tools:

- Microsoft Office
- Google Analytics
- Ads Data
- Dashboard

CTA:

- Không có demo vì `demo` hiện rỗng trong data.
- Có thể dùng nút không link: `Xem mô tả` hoặc không hiển thị nút.
- Không tạo link giả.

### 11.4. Visual style card

- Card nền tối trong suốt.
- Border xanh tím nhẹ.
- Hover sáng border, nâng shadow nhẹ.
- Title rõ, không quá dài trên mobile.
- Tool tags nhỏ, dễ đọc.
- Case 1 có thể có icon/link external.
- Case 2 không có external link nếu data không có demo.

## 12. About section

About hiện tại dùng mô tả dài từ `personalData.description`. Nội dung này đúng, nhưng có thể trình bày dễ đọc hơn.

### 12.1. Layout đề xuất

- Một cột text rộng vừa phải.
- Chia mô tả thành các đoạn ngắn hơn nếu triển khai sau này.
- Bên cạnh có card `Focus areas` hoặc `Marketing stack`.

### 12.2. Nội dung không thay đổi bản chất

Không thêm thông tin ngoài mô tả hiện có.

Có thể dùng các cụm từ đã có trong data:

- Meta Ads
- Google Ads
- TikTok Ads
- SEO
- landing page
- phân tích dữ liệu marketing
- nghiên cứu chân dung khách hàng
- tối ưu hóa chi phí quảng cáo
- phối hợp cùng team creative
- cải thiện tỷ lệ chuyển đổi

## 13. Experience section

Experience section hiện có đủ dữ liệu. Nên cải thiện cách hiển thị.

### 13.1. Mục tiêu

HR cần quét nhanh được:

- Công ty.
- Vai trò.
- Thời gian.
- Nhiệm vụ chính.

### 13.2. Layout đề xuất

- Timeline dọc.
- Mỗi card có:
  - Thời gian ở trên.
  - Vai trò nổi bật.
  - Công ty.
  - Bullet ngắn.

### 13.3. Giữ dữ liệu gốc

Không thêm số liệu ngoài data.

Có thể giữ nguyên bullet hiện tại hoặc rút gọn câu cho dễ đọc, nhưng không đổi nghĩa.

### 13.4. Visual style

- Card tối.
- Border trái hoặc dot timeline màu xanh tím.
- Hover nhẹ.
- Ít animation để tránh rối.

## 14. Skills section

Dữ liệu `skills.js` hiện đang thiên về tool kỹ thuật cơ bản, chưa phản ánh đầy đủ kỹ năng marketing đã có trong hero/experience. Tuy nhiên nếu chưa sửa data, UI nên hiển thị đúng danh sách hiện có.

Có thể chia visual thành nhóm nếu triển khai dùng dữ liệu hiện có và dữ liệu đã xuất hiện trong các file khác.

### 14.1. Nhóm đề xuất dựa trên dữ liệu đã có

Nhóm `Marketing platforms` từ personal/experience/hero:

- Meta Ads
- Google Ads
- TikTok Ads
- SEO

Nhóm `Analytics & reporting` từ experience/projects:

- Google Analytics
- Excel
- Dashboard
- Ads Data

Nhóm `Creative & landing page` từ experience/projects/skills:

- Landing Page
- HTML
- CSS
- Canva
- Figma

Nhóm `AI & workflow` từ projects/experience:

- Claude
- GPT
- Kling AI
- Veo 3
- Vibe Coding
- Agentic AI

Lưu ý: nếu triển khai cần quyết định có cập nhật data hay chỉ hard-code từ các dữ liệu đã tồn tại. Không thêm tool mới ngoài các tool đã có trong repo.

## 15. Projects section đầy đủ

Sau phần featured case, vẫn giữ Projects section đầy đủ để hiển thị cả 3 dự án.

Thứ tự có thể giữ theo data:

1. Landing Page phối cảnh 360°.
2. Dashboard báo cáo hiệu quả quảng cáo.
3. Ứng dụng AI trong sáng tạo nội dung quảng cáo.

Case AI TikTok không nằm trong 5 giây đầu vì người dùng chọn Landing Page 360° + Dashboard cho phần đầu trang, nhưng vẫn nên giữ ở Projects để thể hiện yếu tố AI Marketing.

## 16. Education section

Giữ đơn giản:

- Chuyên ngành.
- Thời gian.
- Trường/viện.

Không cần làm quá nổi bật vì mục tiêu chính là HR nhìn năng lực marketing và case study.

## 17. Contact section

Contact cần rõ, dễ liên hệ.

Thông tin từ data:

- Email: `namcnsh@gmail.com`
- Phone: `0879309604`
- Location: `Ecopark, Hưng Yên / Hà Nội`
- Facebook
- LinkedIn
- GitHub

CTA đề xuất:

- `Gửi email`
- `Gọi điện`
- `LinkedIn`

Không hiển thị Twitter, StackOverflow, LeetCode nếu data rỗng.

## 18. Navigation

Navbar nên đơn giản, phục vụ HR:

- Giới thiệu
- Case Study
- Kinh nghiệm
- Kỹ năng
- Liên hệ

Không nên quá nhiều mục.

Nếu section id hiện tại khác, cần đồng bộ sau khi triển khai.

## 19. Responsive behavior

### 19.1. Desktop từ 1024px trở lên

- Hero 2 cột.
- Featured case 2 cột.
- Experience card rộng vừa, dễ đọc.
- Main content giữ max-width để tránh text quá dài.

### 19.2. Tablet 768px-1023px

- Hero có thể 1 cột hoặc 2 cột tùy không gian.
- Case card 2 cột nếu đủ rộng, 1 cột nếu hẹp.

### 19.3. Mobile 375px-767px

- Tất cả section 1 cột.
- CTA xếp dọc hoặc full-width.
- Text hero không quá dài.
- Case card hiển thị ngay sau intro.
- Không để card/code/animation gây tràn ngang.

## 20. Motion và interaction

Motion nên vừa phải vì đây là CV cho HR.

Cho phép:

- Hover card nhẹ.
- Button gradient hover.
- Section reveal nhẹ nếu đã có pattern trong repo.
- Glow background tĩnh hoặc animation rất nhẹ.

Tránh:

- Motion quá nhiều.
- Marquee quá nhanh.
- Parallax mạnh.
- Animation làm chậm mobile.
- Hover làm layout nhảy.

Cần tôn trọng `prefers-reduced-motion` nếu triển khai animation mới.

## 21. Accessibility

Yêu cầu:

- Text đủ tương phản trên nền tối.
- Button/link có focus state rõ.
- Ảnh profile có alt là tên người dùng.
- Link external dùng label dễ hiểu.
- Không dùng màu là cách duy nhất để truyền đạt ý nghĩa.
- Không dùng emoji làm icon cấu trúc.

## 22. SEO

Metadata hiện tại đã đúng hướng:

- Title có tên và chức danh.
- Description có CV landing page, Performance Marketing Specialist, quảng cáo, dữ liệu, landing page, AI Marketing.

Nếu sửa sau này, chỉ nên tinh chỉnh dựa trên dữ liệu hiện có, không thêm claim chưa có.

## 23. Copywriting đề xuất dựa trên dữ liệu thật

### 23.1. Hero heading

Phương án đề xuất:

`Nguyễn Hoàng Nam`

`Performance Marketing Specialist`

Subtitle:

`Tối ưu quảng cáo, landing page và dữ liệu marketing cho các chiến dịch đa nền tảng.`

Mô tả ngắn:

`Digital Marketer có kinh nghiệm từ năm 2019 trong Meta Ads, Google Ads, TikTok Ads, SEO, landing page và phân tích dữ liệu marketing.`

### 23.2. CTA

- `Liên hệ ngay`
- `Xem case study`

### 23.3. Featured section title

`Case study nổi bật`

Subtitle:

`Hai dự án thể hiện năng lực kết hợp giữa quảng cáo, landing page và dữ liệu marketing.`

Câu này dựa trên hai project đã chọn và mô tả hiện có: landing page 360°, dashboard quảng cáo.

## 24. Ràng buộc khi triển khai

1. Không thêm thư viện mới nếu không cần.
2. Ưu tiên dùng stack hiện có: Next.js, React, Tailwind/SCSS, react-icons nếu cần.
3. Không sửa dữ liệu cá nhân nếu người dùng chưa yêu cầu.
4. Không tạo link giả cho dashboard vì `demo` đang rỗng.
5. Không dùng số liệu thành tích chưa có trong source.
6. Không xóa contact thật.
7. Không làm mất responsive.
8. Không commit/push/deploy trước khi code đã được kiểm tra bằng lệnh phù hợp.
9. Sau khi code cần chạy kiểm tra:
   - `npm run lint`
   - `npm run build`
10. Nếu một lệnh kiểm tra lỗi, phải dừng, đọc lỗi, sửa lỗi, chạy lại. Không được bỏ qua lỗi.
11. Nếu thiếu quyền GitHub, thiếu quyền Vercel, thiếu biến môi trường, hoặc CLI chưa đăng nhập, phải dừng và hỏi người dùng. Không được đoán token, không được tạo thông tin đăng nhập giả.

## 25. Quy trình GitHub và Vercel sau khi code

Người dùng đã xác nhận biết đến GitHub CLI và Vercel CLI. Vì vậy quy trình bàn giao sau code cần được đưa vào spec.

### 25.1. Điều kiện thực tế cần kiểm tra

Trước khi commit/push/deploy cần kiểm tra:

1. Workspace local có phải git repo thật không.
2. Remote GitHub có trỏ tới `namcnsh/nguyen-hoang-nam-cv` không.
3. GitHub CLI có sẵn không, bằng lệnh `gh --version`.
4. GitHub CLI đã login chưa, bằng lệnh `gh auth status`.
5. Vercel CLI có sẵn không, bằng lệnh `vercel --version`.
6. Vercel CLI đã login chưa, bằng lệnh `vercel whoami`.
7. Project Vercel đã liên kết với repo chưa, bằng kiểm tra cấu hình local hoặc hỏi người dùng nếu không xác định được.

### 25.2. Quy trình sau khi code

Thứ tự bắt buộc:

1. Kiểm tra thay đổi bằng `git status` và `git diff`.
2. Chạy `npm run lint`.
3. Chạy `npm run build`.
4. Nếu cả hai lệnh pass, tạo commit với message ngắn, rõ nghĩa.
5. Push lên GitHub.
6. Deploy sang Vercel.
7. Nếu repo đã nối Vercel auto-deploy, sau `git push` cần kiểm tra deployment thay vì chạy deploy thủ công nếu cấu hình thực tế cho thấy auto-deploy đang dùng.
8. Nếu cần deploy thủ công bằng Vercel CLI, dùng `vercel --prod` sau khi đã xác nhận CLI login và project link hợp lệ.
9. Báo lại cho người dùng:
   - commit hash nếu có,
   - branch đã push,
   - URL GitHub nếu xác định được,
   - URL Vercel/deployment nếu CLI trả về.

### 25.3. Không được hứa chắc deploy thành công trước khi kiểm tra

Spec không được cam kết rằng deploy chắc chắn thành công, vì kết quả phụ thuộc vào các yếu tố thực tế sau:

- Quyền GitHub của môi trường đang chạy.
- Trạng thái đăng nhập GitHub CLI.
- Quyền Vercel của môi trường đang chạy.
- Trạng thái đăng nhập Vercel CLI.
- Biến môi trường trên Vercel.
- Cấu hình build của Vercel.
- Việc repo đã link với Vercel hay chưa.

Cam kết đúng là: sau khi code xong sẽ kiểm tra, commit, push và deploy nếu đủ quyền/cấu hình; nếu thiếu điều kiện thì dừng lại và báo chính xác thiếu gì.

## 26. Đề xuất thứ tự triển khai sau khi spec được duyệt

1. Clone hoặc đồng bộ source repo vào workspace local nếu chưa có.
2. Kiểm tra cấu trúc component thực tế.
3. Kiểm tra GitHub CLI và Vercel CLI ở mức chỉ đọc/trạng thái.
4. Thiết kế lại hero component.
5. Thêm hoặc sửa featured case study block.
6. Tinh chỉnh theme màu nền, card, CTA.
7. Tinh chỉnh About/Experience/Projects để đồng bộ style.
8. Kiểm tra mobile.
9. Chạy lint/build.
10. Kiểm tra `git status` và `git diff`.
11. Commit.
12. Push lên GitHub.
13. Deploy hoặc kiểm tra deploy Vercel theo cấu hình thực tế.
14. Báo cáo các thay đổi và kết quả kiểm tra.

## 27. Tiêu chí hoàn thành

Thiết kế được xem là đạt khi:

1. 5 giây đầu thấy rõ tên Nguyễn Hoàng Nam, vai trò Performance Marketing Specialist và hai case nổi bật.
2. Giao diện có tone đen/xanh tím, tech, premium.
3. HR đọc nhanh được thông tin chính.
4. Không có claim hoặc link không có trong repo.
5. Mobile không tràn layout.
6. `npm run lint` pass.
7. `npm run build` pass.
8. Commit được tạo nếu workspace là git repo và người dùng đã yêu cầu commit.
9. Push lên GitHub thành công nếu có quyền GitHub hợp lệ.
10. Deploy Vercel thành công nếu có quyền/cấu hình Vercel hợp lệ; nếu không, báo rõ điều kiện còn thiếu.
