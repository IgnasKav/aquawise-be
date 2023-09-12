resource "aws_db_instance" "default" {
  identifier             = "${var.brand}-db"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  db_name                = "${var.brand}_db"
  username               = "${var.pg_username}"
  password               = "${var.pg_password}"
  db_subnet_group_name   = "${aws_db_subnet_group.subnet_group.name}"
  vpc_security_group_ids = ["${aws_security_group.aquawise_security_group.id}"]
  skip_final_snapshot  = true
  publicly_accessible  = true
}