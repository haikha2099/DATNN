
drop table if exists `account`;
create table `account`(
	id int,
    username varchar(20),
    `password` varchar(20),
    customername varchar(20),
    phone varchar(20),
    address varchar(500),
    email varchar(100),
    dateadd datetime,
    dateupdate datetime,
    
    primary key (id)
);

drop table if exists `categories`;
create table categories(
	cg_id int auto_increment,
    cg_name varchar(100),
    
    primary key (cg_id)
);

drop table if exists `product`;
create table product(
	pro_id int auto_increment,
    pro_name varchar(50),
    pro_describe varchar(5000),
    price long,
    image_url varchar(100),
    quantity int,
    pro_detail varchar(5000),
    size varchar(100),
    dateadd date,
    cg_id int,
    
    primary key (pro_id),
    foreign key (cg_id) references `categories`(cg_id)
) ;
drop table if exists `orders`;
create table orders(
	id int,
    order_detail  varchar(50),
    dateadd datetime,
    status bool,
    user_id  int,
    
    primary key (id)
);

drop table if exists `evaluate`;
create table evaluate(
	id int,
    `point` int,
    content varchar(100),
    product_id int,
    user_id int,
    
    primary key (id),
    foreign key (product_id) references product(pro_id) 
);


###############
INSERT INTO product
VALUES 
('1', 'Bộ bàn ăn gỗ đào','Bộ bàn ăn gỗ đào 6 ghế, bàn mặt kính đơn màu','6.300.000','F:\\DATN\\data\\ban_an_1','10','Bộ bàn ăn 6 ghế gỗ đào họa tiết đơn giản với những đường vân gỗ được mài giũa tỉ mỉ, sơn bóng. Bàn ăn được làm từ gỗ đào, gắn với mặt kính dày chống va đập, dễ dàng làm sạch khi dính bẩn. Bộ bàn ghế với họa tiết đơn giản nhưng tạo lên nét cổ điển từ những vân gỗ đẹp sáng bóng sẽ là lựa chọn tuyệt vời cho nhà ăn của bạn.','Bàn:180x90x75 cm, Ghế: 42x45x80cm','2023-04-10','1'),
('2', 'Bộ bàn ăn tròn gỗ đào','Bộ bàn ăn gỗ đào 6 ghế, bàn mặt tròn đính kính đơn màu','6.500.000','F:\\DATN\\data\\ban_an_2','10','Bộ bàn ăn 6 ghế gỗ đào họa tiết đơn giản với những đường vân gỗ được mài giũa tỉ mỉ, sơn bóng. Bàn ăn được làm từ gỗ đào, gắn với mặt kính dày chống va đập, dễ dàng làm sạch khi dính bẩn. Bộ bàn ghế với họa tiết đơn giản nhưng tạo lên nét cổ điển từ những vân gỗ đẹp sáng bóng sẽ là lựa chọn tuyệt vời cho nhà ăn của bạn.','Bàn:Ø110x76 cm, Ghế: 42x45x80cm','2023-04-10','1'),
('3', 'Bộ bàn ăn gỗ mít','Bộ bàn ăn gỗ mít 6 ghế','6.000.000','F:\\DATN\\data\\ban_an_3','10','Bộ bàn ăn 6 ghế gỗ mít với những họa tiết hiện đại tạo lên sự mới mẻ được mài giũa tỉ mỉ, sơn bóng. Bàn ăn được làm từ gỗ mít với thiết kế độc đáo, hiện đại xen lẫn với những chi tiết hoa văn cổ điển tạo lên điểm nhấn nổi bật cho không gian phòng ăn nhà bạn.','Bàn:180x90x75 cm, Ghế: 42x45x80cm','2023-04-10','1'),
('4', 'Bộ bàn ăn ovan gỗ mít','Bộ bàn ăn gỗ đào 6 ghế, bàn mặt ovan đơn màu','6.000.000','F:\\DATN\\data\\ban_an_4','10','Bộ bàn ăn 6 ghế gỗ mít với những họa tiết hiện đại tạo lên sự mới mẻ được mài giũa tỉ mỉ, sơn bóng. Bàn ăn được làm từ gỗ mít với thiết kế độc đáo, hiện đại xen lẫn với những chi tiết hoa văn cổ điển tạo lên điểm nhấn nổi bật cho không gian phòng ăn nhà bạn. Mặt bàn ovan sẽ tối ưu không gian bàn ăn giúp các thành viên trong gia đình gần gũi hơn.','Bàn:180x90x75 cm, Ghế: 42x45x80cm','2023-04-10','2'),
('5', 'Bộ bàn ghế phòng khách gỗ sồi','Bộ bàn ghế phòng khách bằng gỗ sồi phong cách hiện đại','10.500.000','F:\\DATN\\data\\ban_ghe_1','10','Bộ bàn ghế phòng khách với thiết kế trơn nhẵn hiện đại, vẻ vuông vắn với những hoa văn trạm  khắc tỉ mỉ tạo nên vẻ đẹp sang trọng.Bộ bàn ghế đầy đủ gồm: 1 ghế tựa dài, 2 ghế tựa đơn, 2 ghế đơn không tựa, 1 bàn lớn và 1 bàn nhỏ ghép kính mang đến một không gian rộng lớn giúp bạn đón khách một cách tốt nhất có thể.','chi tiết','2023-04-10','2'),
('6', 'Bộ bàn ghế phòng khách gỗ xoan','Bộ bàn ghế phòng khách gỗ xoan phong cách hoàng gia','9.500.000','F:\\DATN\\data\\ban_ghe_2','10','Bộ bàn ghế phòng khách với thiết kế hoàng gia mang lại sự trang trọng, những hoa văn trạm  khắc tỉ mỉ tạo nên vẻ nổi bật của bộ bàn ghế.Bộ bàn ghế đầy đủ gồm: 1 ghế tựa dài, 2 ghế tựa đơn, 1 bàn lớn mang đến một không gian vừa đủ giúp bạn tối ưu diện tích một cách tốt nhất có thể.','chi tiết','2023-04-10','2'),
('7', 'Bộ bàn ghế phòng khách gỗ sồi','Bộ bàn ghế phòng khách gỗ sồi như ý thẻ','11.500.000','F:\\DATN\\data\\ban_ghe_3','10','Bộ bàn ghế phòng khách với thiết kế như ý thẻ cổ điển mang phong cách hoàng tộc hoài cổ, hoa văn trạm  khắc tỉ mỉ tạo nên vẻ đẹp sang trọng.Bộ bàn ghế đầy đủ gồm: 1 ghế tựa dài, 2 ghế tựa đơn, 1 ghế đơn không tựa, 1 bàn lớn và 1 bàn nhỡ ghép kính mang đến một không gian rộng lớn giúp bạn đón khách một cách tốt nhất có thể.','chi tiết','2023-04-10','2'),
('8', 'Bộ bàn ghế phòng khách gỗ xoan','Bộ bàn ghế phòng khách gỗ xoan phong cách hiện đại','8.500.000','F:\\DATN\\data\\ban_ghe_4','10','Bộ bàn ghế phòng khách với thiết kế trơn nhẵn hiện đại, vẻ vuông vắn với những hoa văn trạm  khắc tỉ mỉ tạo nên vẻ đẹp sang trọng.Bộ bàn ghế đầy đủ gồm: 1 ghế tựa dài, 2 ghế tựa đơn, 1 bàn lớn và 1 bàn nhỏ ghép kính giúp bạn tối ưu diện tích một cách tốt nhất có thể.','chi tiết','2023-04-10','2'),
('9', 'Bộ bàn ghế phòng khách gỗ đào','Bộ bàn ghế phòng khách bằng gỗ sồi phong cách hiện đại','11.000.000','F:\\DATN\\data\\ban_ghe_5','10','Bộ bàn ghế phòng khách với thiết kế trơn nhẵn hiện đại, vẻ vuông vắn với những hoa văn trạm  khắc tỉ mỉ tạo nên vẻ đẹp sang trọng.Bộ bàn ghế đầy đủ gồm: 1 ghế tựa dài, 1 ghế tựa ngắn, 2 ghế đơn không tựa, 1 bàn nhỡ mang đến một không gian hiện đại, mới mẻ giúp bạn đón khách một cách tốt nhất có thể.','chi tiết','2023-04-10','2'),
('10', 'Bộ bàn ghế phòng khách gỗ mít','Bộ bàn ghế phòng khách bằng gỗ sồi phong cách hiện đại','9.500.000','F:\\DATN\\data\\ban_ghe_6','10','Bộ bàn ghế phòng khách với thiết kế trơn nhẵn hiện đại, vẻ vuông vắn với những hoa văn trạm  khắc tỉ mỉ tạo nên vẻ đẹp sang trọng.Bộ bàn ghế đầy đủ gồm: 1 ghế tựa dài, 2 ghế tựa đơn, 2 ghế đơn không tựa, 1 bàn lớn và 1 bàn nhỏ ghép kính mang đến một không gian rộng lớn giúp bạn đón khách một cách tốt nhất có thể.','Bàn:Ø110x76 cm, Ghế: 42x45x80cm','2023-04-10','2');

##############
INSERT into categories
value
('1','Bộ bàn ăn'),
('2','Bàn ghế phòng khách'),
('3','Bàn trang điểm'),
('4','Giường'),
('5','Giá sách'),
('6','Kệ ti vi'),
('7','Tủ quần áo'),
('8','Sạp thờ');

##############

select pro_name,cg_name from product
join categories
on product.cg_id = categories.cg_id;