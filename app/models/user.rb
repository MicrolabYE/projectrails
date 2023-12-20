class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  # Database Authenticatable: предоставляет возможность входа в систему на основе зашифрованного и хранимого в базе данных пароля
  # Registerable: управляет регистрацией пользователей, позволяет редактировать и удалять аккаунты
  # Recoverable: позволяет восстанавливать забытый пароль. Отправляет инструкции по восстановлению на почту
  # Rememberable: позволяет запоминать пользователей на основе cookies. Управляет созданием и удалением токенов
  # Validatable: предоставляет инструменты валидации e-mail и пароля.
end
