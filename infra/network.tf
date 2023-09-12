resource "aws_vpc" "aquawise_vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
}

resource "aws_subnet" "public_a" {
    vpc_id = "${aws_vpc.aquawise_vpc.id}"
    cidr_block = "10.0.1.0/24"
    availability_zone = "${var.aws_region}a"
}

resource "aws_subnet" "public_b" {
    vpc_id = "${aws_vpc.aquawise_vpc.id}"
    cidr_block = "10.0.2.0/24"
    availability_zone = "${var.aws_region}b"
}

resource "aws_db_subnet_group" "subnet_group" {
  name       = "${var.brand}_db_subnet_group"
  subnet_ids = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]

  tags = {
    Name = "${var.brand}_subnet_group"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
    vpc_id = "${aws_vpc.aquawise_vpc.id}"
}

resource "aws_route" "internet_access" {
    route_table_id = "${aws_vpc.aquawise_vpc.main_route_table_id}"
    destination_cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.internet_gateway.id}"
}

resource "aws_security_group" "aquawise_security_group" {
    name = "aquawise_security_group"
    description = "Allow TLS inbound traffic on port 80 (http)"
    vpc_id = "${aws_vpc.aquawise_vpc.id}"

    ingress {
        from_port = 80
        to_port = 6000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}