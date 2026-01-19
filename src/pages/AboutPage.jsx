import './AboutPage.css';

function AboutPage() {
    return (
        <div className="about-page">
            <div className="about-background"></div>
            
            <div className="about-content">
                <header className="about-header">
                    <h1 className="about-title">365 Ngày Với Mác-Lênin</h1>
                    <p className="about-subtitle">Dự Án Học Tập Triết Học Mác-Lênin</p>
                </header>

                <div className="about-sections">
                    {/* Project Goals */}
                    <section className="about-section">
                        <h2>🎯 Mục Tiêu Dự Án</h2>
                        <p>
                            Tạo ra một nền tảng học tập tương tác giúp sinh viên tiếp cận triết học 
                            Mác-Lênin một cách dễ dàng và thú vị hơn. Mỗi ngày trong năm đều có một 
                            câu nói, bài học, hoặc hoạt động giúp người dùng hiểu sâu hơn về tư tưởng cách mạng.
                        </p>
                    </section>

                    {/* Target Audience */}
                    <section className="about-section">
                        <h2>👥 Đối Tượng Sử Dụng</h2>
                        <ul>
                            <li>Sinh viên đang học môn Triết Học Mác-Lênin</li>
                            <li>Người quan tâm đến tư tưởng cách mạng</li>
                            <li>Những ai muốn tìm hiểu về lịch sử và triết học</li>
                        </ul>
                    </section>

                    {/* Why 365 Days */}
                    <section className="about-section">
                        <h2>📅 Vì Sao 365 Ngày?</h2>
                        <p>
                            Học tập là một quá trình liên tục, không phải một sự kiện. Bằng cách chia nhỏ 
                            kiến thức thành 365 phần, mỗi ngày một bài học nhỏ, chúng tôi giúp người học:
                        </p>
                        <ul>
                            <li>Xây dựng thói quen học tập hàng ngày</li>
                            <li>Không bị quá tải với quá nhiều thông tin cùng lúc</li>
                            <li>Có thời gian suy ngẫm và áp dụng kiến thức vào cuộc sống</li>
                        </ul>
                    </section>

                    {/* Technology Stack */}
                    <section className="about-section">
                        <h2>⚙️ Công Nghệ Sử Dụng</h2>
                        <div className="tech-grid">
                            <div className="tech-item">
                                <span className="tech-icon">⚛️</span>
                                <strong>React 19</strong>
                                <p>Framework JavaScript hiện đại</p>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">⚡</span>
                                <strong>Vite</strong>
                                <p>Build tool nhanh và tối ưu</p>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🌙</span>
                                <strong>lunar-javascript</strong>
                                <p>Thư viện chuyển đổi âm lịch</p>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">💾</span>
                                <strong>localStorage</strong>
                                <p>Lưu trữ dữ liệu người dùng</p>
                            </div>
                        </div>
                    </section>

                    {/* Team Members */}
                    <section className="about-section team-section">
                        <h2>👨‍💻 Nhóm 11 - Thành Viên</h2>
                        <div className="team-grid">
                            <div className="team-member">
                                <div className="member-avatar">👨‍💻</div>
                                <h3>Phạm Duy Hưng</h3>
                                <p className="member-role">Team Leader & Developer</p>
                                <p className="member-contribution">
                                    Quản lý dự án, phát triển tính năng chính,
                                    và tối ưu hóa hiệu suất ứng dụng
                                </p>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">🎨</div>
                                <h3>Phạm Thế Sơn</h3>
                                <p className="member-role">UI/UX Designer & Developer</p>
                                <p className="member-contribution">
                                    Thiết kế giao diện người dùng,
                                    phát triển components và animations
                                </p>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">📚</div>
                                <h3>Ngô Trí Bình</h3>
                                <p className="member-role">Content & Testing</p>
                                <p className="member-contribution">
                                    Sưu tầm nội dung triết học,
                                    biên soạn câu hỏi và kiểm thử ứng dụng
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="about-section">
                        <h2>✨ Tính Năng Chính</h2>
                        <div className="features-grid">
                            <div className="feature-item">
                                <span className="feature-icon">📖</span>
                                <h3>Bài Học Hàng Tháng</h3>
                                <p>12 chủ đề triết học theo từng tháng</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">💬</span>
                                <h3>Câu Nói Theo Ngày</h3>
                                <p>365 câu nói của các nhà tư tưởng</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">⭐</span>
                                <h3>Câu Tâm Đắc</h3>
                                <p>Lưu lại những câu nói ý nghĩa</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📝</span>
                                <h3>Suy Ngẫm Hàng Ngày</h3>
                                <p>Ghi lại suy nghĩ về bài học</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🎮</span>
                                <h3>Trò Chơi Triết Học</h3>
                                <p>"Ai Là Triệu Phú" phiên bản Mác-Lênin</p>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🌙</span>
                                <h3>Âm Lịch</h3>
                                <p>Hiển thị ngày âm lịch Việt Nam</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
