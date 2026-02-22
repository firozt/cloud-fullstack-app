resource "aws_instance" "ec2-instance" {
  ami           = "ami-0ba0c1a358147d1a8"

  instance_type = "t3.micro"
  key_name = "key"
  vpc_security_group_ids = [
    "sg-089b0a85beb2d7e7a"
  ]


  user_data = <<-EOF
              #!/bin/bash
              set -e

              dnf update -y
              dnf install -y docker
              systemctl enable docker
              systemctl start docker

              usermod -aG docker ec2-user
              EOF

  tags = {
    Name = "web-server"
  }
}
