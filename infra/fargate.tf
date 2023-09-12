resource "aws_ecs_task_definition" "aquawise_be_task" {
    family = "aquawise_be_family"

    // Fargate is a type of ECS that requires awsvpc network_mode
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"

    // Valid sizes are shown here: https://aws.amazon.com/fargate/pricing/
    memory = "512"
    cpu = "256"

    // Fargate requires task definitions to have an execution role ARN to support ECR images
    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

    container_definitions = jsonencode([
        {
          name      = "aquawise_be_container"
          image     = "${aws_ecr_repository.aquawise_ecr.repository_url}"
          cpu       = 256
          memory    = 512
          essential = true
          portMappings = [
            {
              containerPort = 3000
              hostPort      = 3000
            }
          ]
          environment = [
            {
              name  = "PGUSER"
              value = "${aws_db_instance.default.username}"
            },
            {
              name  = "PGPASSWORD"
              value = "${aws_db_instance.default.password}"
            },
            {
              name  = "PGHOST"
              value = "${aws_db_instance.default.address}"
            },
            {
              name  = "PGDATABASE"
              value = "${aws_db_instance.default.db_name}"
            },
          ]
          logConfiguration = {
              logDriver = "awslogs"
              options = {
               "awslogs-group" = "firelens-container"
               "awslogs-region"        = "${var.aws_region}"
               "awslogs-create-group": "true"
               "awslogs-stream-prefix" = "ecs"
              }
          }
        }
    ])
}

resource "aws_ecs_cluster" "aquawise_cluster" {
  name = "aquawise_cluster"
}

resource "aws_ecs_service" "backend_service" {
    name = "backend_service"

    cluster = "${aws_ecs_cluster.aquawise_cluster.id}"
    task_definition = "${aws_ecs_task_definition.aquawise_be_task.arn}"

    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
        subnets = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
        security_groups = ["${aws_security_group.aquawise_security_group.id}"]
        assign_public_ip = true
    }
}