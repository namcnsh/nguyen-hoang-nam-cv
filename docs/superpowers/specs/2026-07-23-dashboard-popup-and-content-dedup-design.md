# Spec cập nhật landing page CV Nguyễn Hoàng Nam: giảm trùng lặp và dashboard popup

Ngày: 2026-07-23

## 1. Phạm vi

Tài liệu này bổ sung cho spec redesign trước đó:

- `docs/superpowers/specs/2026-07-23-nguyen-hoang-nam-cv-landing-page-redesign.md`

Mục tiêu cập nhật:

1. Giảm nội dung trùng lặp trên landing page.
2. Chỉ hiển thị ảnh chân dung một lần.
3. Bổ sung kỹ năng `Vibe Coding`.
4. Đổi tên case dashboard từ `Dashboard báo cáo hiệu quả quảng cáo` thành `Dashboard phân tích hiệu quả quảng cáo`.
5. Thêm nút `Xem demo` chỉ ở case #2 nổi bật đầu trang.
6. Nút đó mở popup dashboard phân tích số liệu quảng cáo đẹp, có số liệu demo được ghi rõ là minh họa.

## 2. Cơ sở thực tế đã kiểm tra

Các file hiện tại đã đọc trong repo local sau deploy:

- `app/components/homepage/hero-section/index.jsx`
- `app/components/homepage/about/index.jsx`
- `app/components/homepage/featured-case-studies/index.jsx`
- `utils/data/projects-data.js`
- `utils/data/skills.js`

## 3. Vấn đề hiện tại

### 3.1. Nội dung bị trùng lặp

Trong `app/components/homepage/hero-section/index.jsx`, `personalData.description` đang xuất hiện ở:

1. Phần mô tả chính của Hero.
2. Card ảnh bên phải Hero.

Trong `app/components/homepage/about/index.jsx`, `personalData.description` lại xuất hiện thêm một lần nữa.

Điều này gây lặp câu dài bắt đầu bằng ý: `Tôi là Nguyễn Hoàng Nam, một Digital Marketer...`

Người dùng đã chọn: chỉ giữ nội dung này trong Hero.

### 3.2. Ảnh chân dung xuất hiện nhiều hơn một lần

Hiện tại ảnh chân dung dùng `personalData.profile` xuất hiện ở:

1. Hero card.
2. About section.

Người dùng yêu cầu: ảnh chân dung chỉ cần xuất hiện một lần.

Thiết kế sẽ giữ ảnh ở Hero và bỏ ảnh ở About.

### 3.3. Kỹ năng chưa có Vibe Coding

File `utils/data/skills.js` hiện có:

- HTML
- CSS
- Javascript
- Python
- Git
- Canva
- Figma
- Microsoft Office
- Markdown

Người dùng yêu cầu bổ sung `Vibe Coding`.

`Vibe Coding` đã có trong source hiện tại ở `utils/data/projects-data.js`, project #3 tools gồm `Vibe Coding`. Vì vậy việc thêm vào skills là có cơ sở trong repo.

### 3.4. Tên dashboard chưa đúng mong muốn mới

Trong `utils/data/projects-data.js`, project #2 hiện là:

`Dashboard báo cáo hiệu quả quảng cáo`

Người dùng yêu cầu đổi thành:

`Dashboard phân tích hiệu quả quảng cáo`

### 3.5. Project dashboard chưa có demo

Trong `utils/data/projects-data.js`, project #2 có:

`demo: ''`

Trước đó không được tạo link giả. Với yêu cầu mới, người dùng không yêu cầu URL thật mà yêu cầu popup nội bộ.

Vì vậy không cần thêm URL vào `demo`. Nút popup chỉ nên tồn tại trong component featured case studies, không biến `demo` thành link giả.

## 4. Quyết định thiết kế đã được người dùng duyệt

Người dùng đã duyệt các quyết định sau:

1. Câu dài giới thiệu bản thân chỉ giữ ở Hero.
2. Ảnh chân dung chỉ xuất hiện một lần.
3. Thêm `Vibe Coding` vào kỹ năng.
4. Case #2 đổi tên thành `Dashboard phân tích hiệu quả quảng cáo`.
5. Dashboard popup kết hợp:
   - dashboard giả lập đẹp,
   - giải thích các chỉ số CPC, CTR, CPM, Lead, Conversion,
   - case study mini gồm mục tiêu, số liệu demo, nhận xét, đề xuất tối ưu.
6. Nút `Xem demo` cho dashboard chỉ đặt ở case #2 nổi bật đầu trang, không đặt ở phần Dự án đầy đủ bên dưới.
7. Số liệu demo được phép tự cân đối, nhưng phải ghi rõ là số liệu demo/minh họa để không gây hiểu nhầm.

## 5. Thiết kế nội dung mới

### 5.1. Hero

Hero tiếp tục là nơi duy nhất chứa mô tả dài từ `personalData.description`.

Cần bỏ phần lặp lại mô tả dài trong card ảnh Hero.

Card ảnh Hero chỉ nên giữ:

- ảnh chân dung,
- tên `Nguyễn Hoàng Nam`,
- chức danh `Chuyên gia Performance Marketing`,
- một dòng ngắn không lặp lại mô tả dài, ví dụ dùng các focus tag đã lọc từ `personalData.description`.

Không thêm claim mới.

### 5.2. About

About không hiển thị ảnh chân dung nữa.

About không dùng lại `personalData.description` nguyên văn.

About nên chuyển thành khối ngắn, dễ đọc, dựa trên các ý đã có trong source:

- nghiên cứu chân dung khách hàng,
- xây dựng thông điệp nội dung quảng cáo,
- tối ưu chi phí quảng cáo,
- phân tích chỉ số hiệu quả,
- phối hợp với team creative,
- cải thiện tỷ lệ chuyển đổi.

Các ý trên đều nằm trong `personalData.description` hiện tại.

Không thêm số liệu, doanh thu, ROAS, ngân sách, số lead, hoặc khách hàng mới.

### 5.3. Skills

Thêm `Vibe Coding` vào `utils/data/skills.js`.

Nếu `skillsImage('Vibe Coding')` không có icon, UI hiện tại đã có fallback chữ cái. Do đó không cần thêm asset icon mới.

### 5.4. Featured case #2

Trong `utils/data/projects-data.js`, sửa `name` của project id 2 thành:

`Dashboard phân tích hiệu quả quảng cáo`

Featured case studies render 2 case như hiện tại.

Riêng project id 2:

- hiển thị nút `Xem demo`,
- nút không mở link ngoài,
- nút mở popup dashboard nội bộ.

Project id 1 giữ hành vi hiện tại:

- nếu có `demo`, click `Xem demo` mở `https://360ihh.joyhomes.vn/`.

### 5.5. Projects section đầy đủ

Ở phần Projects bên dưới:

- project #2 không hiển thị nút demo nếu `demo` vẫn rỗng,
- không thêm popup ở Projects section,
- chỉ đổi tên theo data mới.

## 6. Thiết kế popup dashboard

### 6.1. Mục tiêu popup

Popup giúp HR hoặc người xem hiểu Nguyễn Hoàng Nam có tư duy phân tích quảng cáo.

Popup không khẳng định đây là số liệu thật từ chiến dịch thật.

Phải có câu hiển thị rõ:

`Số liệu demo dùng để minh họa cách phân tích hiệu quả quảng cáo.`

### 6.2. Nội dung popup

Popup gồm 4 phần:

1. Header
   - Title: `Dashboard phân tích hiệu quả quảng cáo`
   - Subtitle: `Minh họa cách theo dõi CPC, CTR, CPM, Lead và tỷ lệ chuyển đổi.`
   - Badge: `Số liệu demo`

2. KPI cards
   - CPM
   - CPC
   - CTR
   - Lead
   - Conversion Rate
   - Cost/Lead

3. Kênh quảng cáo
   - Meta Ads
   - Google Ads
   - TikTok Ads

4. Case study mini
   - Mục tiêu
   - Số liệu demo
   - Nhận xét
   - Đề xuất tối ưu

### 6.3. Số liệu demo đề xuất

Vì người dùng cho phép tự cân đối số liệu demo, có thể dùng dữ liệu giả lập sau:

KPI tổng quan:

- CPM: `52.000đ`
- CPC: `4.800đ`
- CTR: `1,86%`
- Lead: `128`
- Conversion Rate: `7,4%`
- Cost/Lead: `96.000đ`

Theo kênh:

1. Meta Ads
   - Spend: `7.800.000đ`
   - Leads: `82`
   - CTR: `2,1%`
   - Cost/Lead: `95.000đ`

2. Google Ads
   - Spend: `3.600.000đ`
   - Leads: `31`
   - CTR: `4,8%`
   - Cost/Lead: `116.000đ`

3. TikTok Ads
   - Spend: `900.000đ`
   - Leads: `15`
   - CTR: `1,4%`
   - Cost/Lead: `60.000đ`

Nhận xét demo:

- Meta Ads tạo nhiều lead nhất.
- Google Ads có CTR cao, phù hợp nhóm có nhu cầu chủ động.
- TikTok Ads có chi phí/lead thấp trong dữ liệu demo nhưng cần kiểm tra chất lượng lead.

Đề xuất demo:

- Giữ ngân sách cho Meta Ads nếu chất lượng lead ổn.
- Tối ưu từ khóa và landing page cho Google Ads.
- Test thêm creative ngắn cho TikTok Ads trước khi tăng ngân sách.

Tất cả số liệu và nhận xét trong popup phải đi kèm ngữ cảnh demo/minh họa.

## 7. Thiết kế UI popup

Popup nên cùng tone với landing page hiện tại:

- nền tối,
- border trắng mờ,
- nhấn xanh tím,
- card bo góc,
- ít motion,
- dễ đọc trên mobile.

### 7.1. Desktop

Popup chiếm tối đa khoảng 900-1000px chiều rộng.

Bố cục:

- KPI grid 3 cột hoặc 6 cards tùy không gian.
- Channel cards 3 cột.
- Insight section 2 cột hoặc 1 cột rộng.

### 7.2. Mobile

Popup full-width gần toàn màn hình, có padding.

Bố cục:

- KPI cards 2 cột hoặc 1 cột nếu rất hẹp.
- Channel cards 1 cột.
- Nội dung có scroll nội bộ nếu cao.

### 7.3. Tương tác

- Click `Xem demo` ở case #2 mở popup.
- Click nút đóng hoặc nền mờ đóng popup.
- Phím `Escape` đóng popup.
- Popup có `role="dialog"` và `aria-modal="true"`.
- Nút đóng có `aria-label="Đóng dashboard demo"`.

## 8. Ràng buộc kỹ thuật

1. Không thêm thư viện mới nếu không cần.
2. Dùng React state để mở/đóng popup.
3. Dùng CSS/Tailwind class hiện có.
4. Không thêm link giả vào `project.demo` của dashboard.
5. Không dùng số liệu demo ở nơi khác ngoài popup.
6. Không làm ảnh chân dung xuất hiện lần thứ hai.
7. Không xóa thông tin contact thật.
8. Sau code phải chạy:
   - `npm run lint`
   - `npm run build`
9. Nếu pass mới commit/push/deploy.

## 9. Tiêu chí hoàn thành

Hoàn thành khi:

1. `personalData.description` không còn lặp lại ở About và card ảnh Hero.
2. Ảnh chân dung chỉ còn xuất hiện một lần trên landing page.
3. `Vibe Coding` xuất hiện trong phần kỹ năng.
4. Case #2 hiển thị tên `Dashboard phân tích hiệu quả quảng cáo`.
5. Nút `Xem demo` dashboard chỉ xuất hiện ở case #2 nổi bật đầu trang.
6. Click nút mở popup dashboard.
7. Popup ghi rõ số liệu là demo/minh họa.
8. Popup hiển thị KPI, kênh quảng cáo, nhận xét, đề xuất tối ưu.
9. Project #2 ở Projects section đầy đủ không có link demo giả.
10. `npm run lint` pass.
11. `npm run build` pass.
12. Commit, push GitHub và deploy Vercel chỉ thực hiện sau khi kiểm tra pass.
